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
  const { register, handleSubmit } = useForm<PostInputs>();
  const { nickname } = useAppSelector(authState);

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
      console.log(res.post);
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

  const onPostSubmit = async (data: PostInputs) => {
    if (!isEditMode) {
      // ?????? ?????? ??????
      setModalOpen(true);
    }
    if (isEditMode) {
      //?????? ?????? ??????
      const { content, title } = data;
      try {
        const res = await updatePostItem(privateAxios, { postId, content, title });
        if (res.resultCode === '0000') {
          dispatch(updateAlertState({ message: '???????????????' }));
          setIsEditMode(false);
          fetchPostItem();
        }
      } catch (error) {}
    }
  };

  const onClickConfirmDelBtn = async () => {
    try {
      const res = await deletePostItem(privateAxios, postId);
      if (res.resultCode === '0000') {
        dispatch(updateAlertState({ message: '???????????????' }));
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
          message: '????????? ??????????????????',
        }),
      );
    }
    const res = await postComment(privateAxios, postId, addComment);
    if (res.resultCode === '0000') {
      fetchPostItem();
      setAddComment('');
      dispatch(
        updateAlertState({
          message: '????????? ???????????????',
        }),
      );
    }
  };

  const onSubmitEditComment = async () => {
    if (!updateComment) {
      return dispatch(
        updateAlertState({
          message: '????????? ??????????????????',
        }),
      );
    }
    const res = await updateCommnetById(privateAxios, isCommentEditMode.id, updateComment);
    if (res.resultCode === '0000') {
      fetchPostItem();
      setIsCommentEditMode({ isEditing: false, id: '' });
      dispatch(
        updateAlertState({
          message: '???????????????',
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
          message: '????????? ???????????????',
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
                placeholder={'??????'}
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
                placeholder='????????? ??????????????????'
              ></textarea>
            )}
          </div>
          {post?.myPostYn && (
            <div className='action-btns absolute right-0 mt-16'>
              <button className={`btn btn-primary px-9 mr-4`} onClick={onClickEditBtn}>
                {isEditMode ? '??????' : '??????'}
              </button>
              <button className='btn btn-primary px-9' onClick={handleSubmit(onPostSubmit)}>
                {isEditMode ? '??????' : '??????'}
              </button>
            </div>
          )}
        </section>
        <section className='mt-64'>
          {/* ?????? ????????? */}
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
                      ??????
                    </button>
                    <button
                      onClick={onSubmitComment}
                      className={`btn btn-sm rounded-none ${
                        addComment === '' ? 'bg-slate-100' : 'bg-blue-400'
                      } border-none px-6`}
                    >
                      ??????
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          <h3 className='mt-12'>comments</h3>
          <div className='mt-3 px-7 py-4'>
            {/* ?????? ?????? */}
            <div className='flex justify-between border-b pb-2 items-center '>
              <div>
                <span className='mr-3'>?????? ??????</span>
                <span>?????????</span>
              </div>
              <div>
                <button className='btn btn-sm mr-3'>?????? ??????</button>
                <button className='btn btn-sm'>?????? ??????</button>
              </div>
            </div>
            {/* ?????? ?????? */}
            <ul className='mt-7'>
              {commentList?.length === 0 && (
                <p className='h-72 text-2xl mt-20 text-center'>????????? ????????? ?????????...</p>
              )}
              {post &&
                post?.comments?.length > 0 &&
                post.comments?.map((c) => {
                  const isEditComment =
                    isCommentEditMode.isEditing && isCommentEditMode.id === c.id;
                  return (
                    <>
                      <div
                        key={`${c.id}-${c.created_at}`}
                        className='w-full flex py-2 justify-between items-center'
                      >
                        <div className='w-full flex items-center'>
                          <div className='w-14 h-14 p-1 border border-primary rounded-full flex items-center justify-center mr-5'>
                            <p className='text-sm'>{c.user?.name}</p>
                          </div>
                          {/* ?????? ?????? input */}
                          {isEditComment ? (
                            <input
                              type='text'
                              className='border-b-2 border-slate-400 focus:outline-0  w-full focus:border-slate-700 ml-3'
                              placeholder='?????? ??????...'
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

                        {/* ?????? ?????? ?????? ????????? ?????? */}
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
                                  <a>??????</a>
                                </div>
                              </li>
                              <li onClick={() => onDeleteComment(c.id)}>
                                <div>
                                  <span className='material-icons'>delete</span>
                                  <a>??????</a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      {/* ?????? ???????????? ?????? */}
                      {isEditComment && (
                        <div className='text-end'>
                          <button
                            className='btn btn-sm rounded-none mr-6 border-none bg-transparent px-6'
                            onClick={() => {
                              setIsCommentEditMode({ isEditing: false, id: '' });
                              setUpdateComment('');
                            }}
                          >
                            ??????
                          </button>
                          <button
                            onClick={onSubmitEditComment}
                            className={`btn btn-sm rounded-none ${
                              updateComment === '' ? 'bg-slate-100' : 'bg-blue-400'
                            } border-none px-6`}
                          >
                            ??????
                          </button>
                        </div>
                      )}
                    </>
                  );
                })}
            </ul>
          </div>
        </section>

        {modalOpen && (
          <ConfirmModal
            title='?????? ???????????????????'
            description='?????? ????????? ?????? ?????? ?????? ???????????????.'
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
