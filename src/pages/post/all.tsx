import { useEffect, useState } from 'react'
import AlertModal, { AlertType } from 'src/components/Modal/Alert'
import usePrivateAxios from 'src/hooks/usePrivateAxios'
import { publicAxios } from 'src/lib/axios'
import { Post } from 'src/lib/types'

const PostListPage = () => {
  const [modal, setModal] = useState<{ show: boolean; msg: string; type: AlertType | undefined }>({
    show: false,
    msg: '',
    type: undefined,
  })
  const privateAxios = usePrivateAxios()
  const [postList, setPostList] = useState<Post[]>([])

  useEffect(() => {
    const getAllPost = async () => {
      const {
        data: { postList },
      } = await publicAxios.get(`/post/all`)

      setPostList(postList)
    }

    getAllPost()
    if (modal.show) {
      setTimeout(() => {
        setModal({ show: false, msg: '', type: undefined })
      }, 2000)
    }
  }, [modal.show])
  console.log(modal.show)
  const onDeletePost = async (postId: string) => {
    try {
      const { data } = await privateAxios.delete(`/post/delete/${postId}`)

      if (data.resultCode === '0000') {
        setPostList((prev) => prev.filter((p) => p.id !== postId))
        setModal({ show: true, msg: '삭제했어요', type: 'success' })
      } else if (data.resultCode === '401') {
        setModal({ show: true, msg: '권한이 없어요', type: 'error' })
      }
    } catch (error) {
      setModal({ show: true, msg: '로그인 해주세요', type: 'error' })
    }
  }

  return (
    <section className='post-section'>
      <ul className='post-list'>
        {postList.map((post, idx) => {
          return (
            <li className='post' key={`${post.content}-${idx}`}>
              <div className='writer'>{`글쓴이 ${post.user.email.split('@')[0]}`}</div>
              <div className='content'>{post.content}</div>
              {post.myPostYn && (
                <div className='btns'>
                  <button className='del-btn' onClick={() => onDeletePost(post.id)}>
                    삭제
                  </button>
                  <button className='modify-btn'>수정</button>
                </div>
              )}
            </li>
          )
        })}
        {postList.length < 1 && <h1>글 목록이 없어요</h1>}
      </ul>
      {modal.show && <AlertModal message={modal.msg} type={modal.type} duration={2000} />}
    </section>
  )
}

export default PostListPage
