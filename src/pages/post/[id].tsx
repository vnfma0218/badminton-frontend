import ConfirmModal from '@/components/Modal/ConfirmModal';
import usePrivateAxios from '@/hooks/usePrivateAxios';
import { deletePostItem, getPostItem, updatePostItem } from '@/lib/api/post';
import { Post } from '@/lib/types';
import { useAppDispatch } from '@/store/hooks';
import { updateAlertState } from '@/store/slices/AlertSlice';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostInputs } from './new';

type CommentInput = {
  comment: string;
};

const PostDetailPage = () => {
  const { register, handleSubmit } = useForm<PostInputs>();
  const {
    register: commentRegister,
    handleSubmit: commentSubmit,
    watch,
    getValues,
  } = useForm<CommentInput>();

  const dispatch = useAppDispatch();
  const privateAxios = usePrivateAxios();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isCommentMode, setIsCommentMode] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();
  const router = useRouter();
  const postId = router.query.id as string;

  const modalRef = useRef<HTMLLabelElement>(null);

  const fetchPostItem = async () => {
    try {
      const post = await getPostItem(postId);
      setPost(post);
    } catch (error) {}
  };
  useEffect(() => {
    if (!postId) return;
    fetchPostItem();
  }, [postId]);

  const onClickEditBtn = () => {
    setIsEditMode((prev) => !prev);
  };

  const onClickDelBtn = async (data: PostInputs) => {
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
            <button className='btn btn-primary px-9' onClick={handleSubmit(onClickDelBtn)}>
              {isEditMode ? '제출' : '삭제'}
            </button>
          </div>
        )}
      </section>
      <section className='mt-64'>
        {/* 댓글 추가 입력창 */}
        <div className=''>
          <div className='flex'>
            <div className='mr-3 mb-1'>
              <span className='text-xl'>myname</span>
            </div>
            <input
              type='text'
              className='border-b-2 border-slate-400 focus:outline-0 w-full focus:border-slate-700'
              placeholder='댓글 추가...'
              {...commentRegister('comment', {
                required: true,
              })}
              onFocus={onCommentFocus}
            />
          </div>
          {isCommentMode && (
            <div className='text-end mt-2'>
              <button
                className='btn btn-sm rounded-none mr-6 border-none bg-transparent'
                onClick={() => setIsCommentMode(false)}
              >
                취소
              </button>
              <button
                className={`btn btn-sm rounded-none ${
                  getValues('comment') === '' ? 'bg-slate-100' : 'bg-blue-400'
                } border-none px-6`}
              >
                댓글
              </button>
            </div>
          )}
        </div>
        {/* 댓글 목록 */}
        <h3 className='mt-12'>comments</h3>
        <div className='border px-7 py-4 h-80'>
          <div className='flex justify-between '>
            <div>
              <span>전체 댓글</span>
              <span>등록순</span>
            </div>
            <div>
              <button className='btn btn-sm mr-3'>본문 보기</button>
              <button className='btn btn-sm'>댓글 닫기</button>
            </div>
          </div>
          <ul className='mt-7'>
            <div className='border-b-slate-50 mb-3 border-b-2 w-full flex py-2'>
              <span className='w-1/5 mr-20'>username</span>
              <span className='w-4/5'>
                comment contentcontentcontentcontentcontentontentcontentcon
              </span>
            </div>
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
