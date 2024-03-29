import ConfirmModal from '@/components/Modal/ConfirmModal';
import CommentInput from '@/components/Post/Comment/CommentInput';
import usePrivateAxios from '@/hooks/usePrivateAxios';
import { deleteCommentById, postComment, updateCommnetById } from '@/lib/api/comment';
import { deletePostItem, getPostItem, getPostItemResp, updatePostItem } from '@/lib/api/post';
import { Post } from '@/lib/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateAlertState } from '@/store/slices/AlertSlice';
import { authState } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostInputs } from './new';

const PostDetailPage = () => {
  const { register, handleSubmit, getValues } = useForm<PostInputs>();
  const { nickname } = useAppSelector(authState);
  const editModalRef = useRef(null);

  const dispatch = useAppDispatch();
  const privateAxios = usePrivateAxios();

  const router = useRouter();
  const postId = router.query.id as string;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isCommentMode, setIsCommentMode] = useState<boolean>(false);
  const [isCommentEditMode, setIsCommentEditMode] = useState<{ isEditing: boolean; id: string }>({
    isEditing: false,
    id: '',
  });
  const [post, setPost] = useState<Post>();
  const [commentList, setCommentList] = useState<getPostItemResp['comments']>([]);
  const [addComment, setAddComment] = useState<string>('');
  const [updateComment, setUpdateComment] = useState<string>('');

  const fetchPostItem = async () => {
    try {
      const res = await getPostItem(postId);
      setPost(res.post);
      setCommentList(res.comments);
    } catch (error) {}
  };

  useEffect(() => {
    if (!postId) return;
    fetchPostItem();
  }, [postId]);

  const onClickEditBtn = () => {
    setIsEditMode((prev) => !prev);
  };

  const onPostSubmit = async () => {
    if (!isEditMode) {
      // 삭제 확인 모달
      setModalOpen(true);
    }
    if (isEditMode) {
      //수정 하기 제출
      (editModalRef.current as any)!.click();
    }
  };

  const onSavePost = async () => {
    const { content, title } = getValues();
    try {
      const res = await updatePostItem(privateAxios, { postId, content, title });
      if (res.resultCode === '0000') {
        dispatch(updateAlertState({ message: '수정했어요' }));
        setIsEditMode(false);
        fetchPostItem();
      }
    } catch (error) {}
  };

  const onClickConfirmDelBtn = async () => {
    try {
      const res = await deletePostItem(privateAxios, postId);
      if (res.resultCode === '0000') {
        dispatch(updateAlertState({ message: '삭제했어요' }));
        router.replace('/post/all');
      }
    } catch (err) {}
  };

  const onCommentFocus = () => {
    setIsCommentMode(true);
  };

  const onSubmitComment = async () => {
    if (!addComment) {
      return dispatch(
        updateAlertState({
          message: '댓글을 입력해주세요',
        }),
      );
    }
    const res = await postComment(privateAxios, postId, addComment);
    if (res.resultCode === '0000') {
      fetchPostItem();
      setAddComment('');
      dispatch(
        updateAlertState({
          message: '댓글을 등록했어요',
        }),
      );
    }
  };

  const onSubmitEditComment = async () => {
    if (!updateComment) {
      return dispatch(
        updateAlertState({
          message: '댓글을 입력해주세요',
        }),
      );
    }
    const res = await updateCommnetById(privateAxios, isCommentEditMode.id, updateComment);
    if (res.resultCode === '0000') {
      fetchPostItem();
      setIsCommentEditMode({ isEditing: false, id: '' });
      dispatch(
        updateAlertState({
          message: '수정했어요',
        }),
      );
    }
  };

  const onDeleteComment = async (cId: string) => {
    const res = await deleteCommentById(privateAxios, cId, postId);
    if (res.resultCode === '0000') {
      fetchPostItem();
      dispatch(
        updateAlertState({
          message: '댓글을 삭제했어요',
        }),
      );
    }
  };

  const onCommentEditMode = (cId: string, content: string) => {
    setIsCommentEditMode({ isEditing: true, id: cId });
    setUpdateComment(content);
  };

  return (
    <>
      <div className='max-w-4xl m-auto'>
        <section className='mt-24 relative'>
          <div className='post-content'>
            <p>title</p>
            {!isEditMode && <h3 className='text-3xl mb-20'>{post?.title}</h3>}
            {isEditMode && (
              <input
                {...register('title', {
                  required: true,
                  minLength: 5,
                })}
                type='text'
                name='title'
                defaultValue={post?.title}
                placeholder={'제목'}
                className='input input-primary'
              />
            )}

            <p className='mb-5'>Content</p>
            {!isEditMode && <h3 className='text-xl'>{post?.content}</h3>}
            {isEditMode && (
              <textarea
                {...register('content', {
                  required: true,
                  minLength: 10,
                })}
                className='textarea textarea-primary w-full mb-6 h-40'
                name='content'
                defaultValue={post?.content}
                placeholder='포스트 작성해주세요'
              ></textarea>
            )}
          </div>
          {post?.myPostYn && (
            <div className='action-btns absolute right-0 mt-16'>
              <button className={`btn btn-primary px-9 mr-4`} onClick={onClickEditBtn}>
                {isEditMode ? '취소' : '수정'}
              </button>
              <button className='btn btn-primary px-9' onClick={handleSubmit(onPostSubmit)}>
                {isEditMode ? '제출' : '삭제'}
              </button>
              <label htmlFor='my-modal' className='hidden' ref={editModalRef}></label>
            </div>
          )}
        </section>
        <section className='mt-64'>
          {/* 댓글 입력창 */}
          {nickname && (
            <>
              <CommentInput
                nickname={nickname}
                setAddComment={setAddComment}
                addComment={addComment}
                onCommentFocus={onCommentFocus}
              />
              <div>
                {isCommentMode && (
                  <div className='text-end mt-2'>
                    <button
                      className='btn btn-sm rounded-none mr-6 border-none bg-transparent px-6'
                      onClick={() => {
                        setIsCommentMode(false);
                        setAddComment('');
                      }}
                    >
                      취소
                    </button>
                    <button
                      onClick={onSubmitComment}
                      className={`btn btn-sm rounded-none ${
                        addComment === '' ? 'bg-slate-100' : 'bg-blue-400'
                      } border-none px-6`}
                    >
                      댓글
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          <h3 className='mt-12'>comments</h3>
          <div className='mt-3 px-7 py-4'>
            {/* 댓글 필터 */}
            <div className='flex justify-between border-b pb-2 items-center '>
              <div>
                <span className='mr-3'>전체 댓글</span>
                <span>등록순</span>
              </div>
              <div>
                <button className='btn btn-sm mr-3'>본문 보기</button>
                <button className='btn btn-sm'>댓글 닫기</button>
              </div>
            </div>
            {/* 댓글 목록 */}
            <ul className='mt-7'>
              {commentList?.length === 0 && (
                <p className='h-72 text-2xl mt-20 text-center'>등록된 댓글이 없어요...</p>
              )}
              {post &&
                post?.comments?.length > 0 &&
                post.comments?.map((c, index) => {
                  console.log(c.id);
                  const isEditComment =
                    isCommentEditMode.isEditing && isCommentEditMode.id === c.id;
                  return (
                    <>
                      <div
                        key={`${c.id}-${index}`}
                        className='w-full flex py-2 justify-between items-center'
                      >
                        <div className='w-full flex items-center'>
                          <div className='w-14 h-14 p-1 border border-primary rounded-full flex items-center justify-center mr-5'>
                            <p className='text-sm'>{c.user?.name}</p>
                          </div>
                          {/* 댓글 수정 input */}
                          {isEditComment ? (
                            <input
                              type='text'
                              className='border-b-2 border-slate-400 focus:outline-0  w-full focus:border-slate-700 ml-3'
                              placeholder='댓글 수정...'
                              value={updateComment}
                              onFocus={onCommentFocus}
                              onChange={(e) => {
                                setUpdateComment(e.target.value);
                              }}
                            />
                          ) : (
                            <p>{c.content}</p>
                          )}
                        </div>

                        {/* 댓글 수정 삭제 더보기 버튼 */}
                        {c.isMine && !isEditComment && (
                          <div className='dropdown p-5 cursor-pointer'>
                            <button tabIndex={0} className='flex flex-col gap-y-0.5 p-5'>
                              <span className='w-1 h-1 bg-gray-900 border inline-block rounded-full'></span>
                              <span className='w-1 h-1 bg-gray-900 border inline-block rounded-full'></span>
                              <span className='w-1 h-1 bg-gray-900 border inline-block rounded-full'></span>
                            </button>
                            <ul
                              tabIndex={0}
                              className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36'
                            >
                              <li onClick={() => onCommentEditMode(c.id, c.content)}>
                                <div>
                                  <span className='material-icons'>edit</span>
                                  <a>수정</a>
                                </div>
                              </li>
                              <li onClick={() => onDeleteComment(c.id)}>
                                <div>
                                  <span className='material-icons'>delete</span>
                                  <a>삭제</a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      {/* 댓글 수정모드 버튼 */}
                      {isEditComment && (
                        <div className='text-end'>
                          <button
                            className='btn btn-sm rounded-none mr-6 border-none bg-transparent px-6'
                            onClick={() => {
                              setIsCommentEditMode({ isEditing: false, id: '' });
                              setUpdateComment('');
                            }}
                          >
                            취소
                          </button>
                          <button
                            onClick={onSubmitEditComment}
                            className={`btn btn-sm rounded-none ${
                              updateComment === '' ? 'bg-slate-100' : 'bg-blue-400'
                            } border-none px-6`}
                          >
                            수정
                          </button>
                        </div>
                      )}
                    </>
                  );
                })}
            </ul>
          </div>
        </section>

        {/* Put this part before </body> tag */}
        <input type='checkbox' id='my-modal' className='modal-toggle' />
        <div className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>수정하시겠습니까?</h3>

            <div className='modal-action'>
              <label htmlFor='my-modal' className='btn'>
                취소
              </label>
              <label htmlFor='my-modal' className='btn' onClick={onSavePost}>
                확인
              </label>
            </div>
          </div>
        </div>

        {modalOpen && (
          <ConfirmModal
            title='삭제 하시겠습니까?'
            description='글에 포함된 모든 댓글 또한 삭제됩니다.'
            onCancel={() => {
              setModalOpen(false);
            }}
            onConfirm={onClickConfirmDelBtn}
          />
        )}
      </div>
    </>
  );
};
export default PostDetailPage;
