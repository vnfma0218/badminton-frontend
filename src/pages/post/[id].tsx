import ConfirmModal from '@/components/Modal/ConfirmModal';
import usePrivateAxios from '@/hooks/usePrivateAxios';
import {
  deletePostItem,
  getPostItem,
  getPostItemResp,
  postComment,
  updatePostItem,
} from '@/lib/api/post';
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

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isCommentMode, setIsCommentMode] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();
  const [commentList, setCommentList] = useState<getPostItemResp['comments']>([]);
  const [comment, setComment] = useState<string>('');

  const modalRef = useRef<HTMLLabelElement>(null);

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

  const onSubmit = async (data: PostInputs) => {
    if (!isEditMode) {
      modalRef.current?.click();
    }
    if (isEditMode) {
      //수정 하기 제출
      const { content, title } = data;
      try {
        const res = await updatePostItem(privateAxios, { postId, content, title });
        if (res.resultCode === '0000') {
          dispatch(updateAlertState({ message: '수정했어요' }));
          setIsEditMode(false);
          fetchPostItem();
        }
      } catch (error) {}
    }
  };

  const onClickConfirmDelBtn = async () => {
    try {
      await deletePostItem(privateAxios, postId);
      router.replace('/post/all');
    } catch (err) {}
  };

  const onCommentFocus = () => {
    setIsCommentMode(true);
  };

  const onSubmitComment = async () => {
    if (!comment) {
      dispatch(
        updateAlertState({
          message: '댓글을 입력해주세요',
        }),
      );
    }
    const res = await postComment(privateAxios, postId, comment);
    if (res.resultCode === '0000') {
      fetchPostItem();
      setComment('');
      dispatch(
        updateAlertState({
          message: '댓글을 등록했어요',
        }),
      );
    }
  };
  console.log(commentList);
  return (
    <>
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
            <button className='btn btn-primary px-9' onClick={handleSubmit(onSubmit)}>
              {isEditMode ? '제출' : '삭제'}
            </button>
          </div>
        )}
      </section>
      <section className='mt-64'>
        {/* 댓글 추가 입력창 */}
        <div className=''>
          <div className='flex'>
            <div className='w-16 h-14 border border-primary rounded-full flex items-center justify-center'>
              <p className='text-base linehei'>{nickname}</p>
            </div>
            <input
              type='text'
              className='border-b-2 border-slate-400 focus:outline-0  w-full focus:border-slate-700 ml-3'
              placeholder='댓글 추가...'
              value={comment}
              onFocus={onCommentFocus}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          {isCommentMode && (
            <div className='text-end mt-2'>
              <button
                className='btn btn-sm rounded-none mr-6 border-none bg-transparent px-6'
                onClick={() => setIsCommentMode(false)}
              >
                취소
              </button>
              <button
                onClick={onSubmitComment}
                className={`btn btn-sm rounded-none ${
                  comment === '' ? 'bg-slate-100' : 'bg-blue-400'
                } border-none px-6`}
              >
                댓글
              </button>
            </div>
          )}
        </div>
        {/* 댓글 목록 */}
        <h3 className='mt-12'>comments</h3>
        <div className='mt-3 px-7 py-4'>
          <div className='flex justify-between border items-center '>
            <div>
              <span className='mr-3'>전체 댓글</span>
              <span>등록순</span>
            </div>
            <div>
              <button className='btn btn-sm mr-3'>본문 보기</button>
              <button className='btn btn-sm'>댓글 닫기</button>
            </div>
          </div>
          <ul className='mt-7'>
            {commentList.length > 0 &&
              commentList?.map((c) => (
                <div
                  key={`${c.id}-${c.created_at}`}
                  className='mb-3 w-full flex py-2 justify-between items-center'
                >
                  <div className='w-4/5 flex items-center'>
                    <div className='w-14 h-14 p-1 border border-primary rounded-full flex items-center justify-center mr-5'>
                      <p className='text-sm'>{c.user?.name}</p>
                    </div>
                    <p>{c.content}</p>
                  </div>
                  {c.isMine && (
                    <div className='dropdown'>
                      <label tabIndex={0} className='cursor-pointer flex flex-col gap-y-0.5 w-10'>
                        <span className='w-1 h-1 bg-gray-900 border inline-block rounded-full'></span>
                        <span className='w-1 h-1 bg-gray-900 border inline-block rounded-full'></span>
                        <span className='w-1 h-1 bg-gray-900 border inline-block rounded-full'></span>
                      </label>
                      <ul
                        tabIndex={0}
                        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36'
                      >
                        <li>
                          <a>수정</a>
                        </li>
                        <li>
                          <a>삭제</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </ul>
        </div>
      </section>
      <label htmlFor='my-modal' className='btn modal-button hidden' ref={modalRef}></label>
      <ConfirmModal description='진행하시겠습니까?' title='해당 글을 삭제합니다'>
        <button className='btn' onClick={onClickConfirmDelBtn}>
          확인
        </button>
      </ConfirmModal>
    </>
  );
};
export default PostDetailPage;
