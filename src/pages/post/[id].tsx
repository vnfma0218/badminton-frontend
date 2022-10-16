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

const PostDetailPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostInputs>();

  const dispatch = useAppDispatch();
  const privateAxios = usePrivateAxios();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
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
    console.log('삭제');
    console.log(isEditMode);
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

  return (
    <>
      <section className='mt-24 relative'>
        <div className='post-content'>
          <p>title</p>
          {!isEditMode && <h3 className='text-5xl mb-36'>{post?.title}</h3>}
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
          {!isEditMode && <h3 className='text-3xl border p-6'>{post?.content}</h3>}
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
        <div className='action-btns absolute right-0 mt-5'>
          <button className={`btn btn-primary px-9 mr-4`} onClick={onClickEditBtn}>
            {isEditMode ? '취소' : '수정'}
          </button>
          <button className='btn btn-primary px-9' onClick={handleSubmit(onClickDelBtn)}>
            {isEditMode ? '제출' : '삭제'}
          </button>
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
