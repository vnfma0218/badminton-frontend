import axios from 'axios'
import { useEffect, useState } from 'react'
import classnames from 'classnames'
import usePrivateAxios from 'src/hooks/usePrivateAxios'
import { publicAxios } from 'src/lib/axios'
import ReactPaginate from 'react-paginate'
import { Post } from 'src/lib/types'
import styles from '@/styles/Pagination.module.css'

const PostListPage = () => {
  const privateAxios = usePrivateAxios()
  const [postList, setPostList] = useState<Post[]>([])
  const [totalCnt, setTotalCnt] = useState<number>()

  useEffect(() => {
    // const getAllPost = async () => {
    //   const {
    //     data: { postList },
    //   } = await publicAxios.get(`/post/all`)
    //   setPostList(postList)
    // }
    // getAllPost()
    // https://dummyjson.com/docs/products
    const get = async () => {
      axios.get('https://dummyjson.com/products/?limit=10&skip=10').then((res) => {
        console.log(res.data)
        setPostList(res.data.products)
        setTotalCnt(res.data.total)
      })
    }
    get()
  }, [])
  const onDeletePost = async (postId: string) => {
    try {
      const { data } = await privateAxios.delete(`/post/delete/${postId}`)

      if (data.resultCode === '0000') {
        setPostList((prev) => prev.filter((p) => p.id !== postId))
      } else if (data.resultCode === '401') {
      }
    } catch (error) {}
  }
  console.log(totalCnt)
  return (
    // <section className='post-section'>
    //   <ul className='post-list'>
    //     {/* {postList.map((post, idx) => {
    //       return (
    //         <li className='post' key={`${post.content}-${idx}`}>
    //           <div className='writer'>{`글쓴이 ${post.user.email.split('@')[0]}`}</div>
    //           <div className='content'>{post.content}</div>
    //           {post.myPostYn && (
    //             <div className='btns'>
    //               <button className='del-btn' onClick={() => onDeletePost(post.id)}>
    //                 삭제
    //               </button>
    //               <button className='modify-btn'>수정</button>
    //             </div>
    //           )}
    //         </li>
    //       )
    //     })} */}

    //     {postList.length < 1 && <h1>글 목록이 없어요</h1>}
    //   </ul>
    //   {/* {modal.show && <AlertModal message={modal.msg} type={modal.type} duration={2000} />} */}
    // </section>
    <div
      className={classnames(
        'issuesPagination overflow-x-auto max-w-2xl m-auto mt-20',
        styles.pagination,
      )}
    >
      <table className='table table-compact w-full'>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>category</th>
            <th>price</th>
            <th>rating</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post: any, idx) => {
            return (
              <tr className='hover' key={post.id}>
                <th>{post.id}</th>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.price}</td>
                <td>{post.rating}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {totalCnt && (
        <div className='mt-10'>
          <ReactPaginate pageCount={Math.ceil(totalCnt / 10)} className='justify-center' />
        </div>
      )}
    </div>
  )
}

export default PostListPage
