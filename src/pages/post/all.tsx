import { useEffect, useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import usePrivateAxios from 'src/hooks/usePrivateAxios';
import { publicAxios } from 'src/lib/axios';
import ReactPaginate from 'react-paginate';
import { Post } from 'src/lib/types';
import styles from '@/styles/Pagination.module.css';
import { getAllPost } from '@/lib/api/post';

const PostListPage = () => {
  const privateAxios = usePrivateAxios();
  const [postList, setPostList] = useState<Post[]>([]);
  const [totalCnt, setTotalCnt] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const { postList } = await getAllPost();
      setPostList(postList);
    };

    fetchPosts();

    // https://dummyjson.com/docs/products

    // const get = async () => {
    //   setLoading(true)
    //   const skip = (pageNo - 1) * 10
    //   axios
    //     .get(`https://dummyjson.com/products/?limit=10&skip=${skip}`)
    //     .then((res) => {
    //       setPostList(res.data.products)
    //       setTotalCnt(res.data.total)
    //     })
    //     .catch((err) => console.log(err))

    //   setLoading(false)
    // }
  }, [pageNo]);
  const onDeletePost = async (postId: string) => {
    try {
      const { data } = await privateAxios.delete(`/post/delete/${postId}`);

      if (data.resultCode === '0000') {
        setPostList((prev) => prev.filter((p) => p.id !== postId));
      } else if (data.resultCode === '401') {
      }
    } catch (error) {}
  };

  const handlePageClick = (event: any) => {
    setPageNo(event.selected + 1);
  };

  if (loading) return <div>loading...</div>;
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
    <>
      {!loading && (
        <div
          className={classnames(
            'issuesPagination overflow-x-auto max-w-2xl m-auto mt-20',
            styles.pagination,
          )}
        >
          <table className='table table-compact w-full'>
            <thead>
              <tr>
                <th>id</th>
                <th>Title</th>
                <th>Content</th>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((post, idx) => {
                return (
                  <tr className='hover cursor-pointer' key={post.id}>
                    <th>{idx + 1}</th>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>{post.user.name}</td>
                  </tr>
                );
              })}
              {/* {postList.map((post: any, idx) => {
                return (
                  <tr className='hover cursor-pointer' key={post.id}>
                    <th>{post.id}</th>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>{post.price}</td>
                    <td>{post.rating}</td>
                  </tr>
                )
              })} */}
            </tbody>
          </table>

          {totalCnt && (
            <div className='mt-10'>
              <ReactPaginate
                className='justify-center'
                pageCount={Math.ceil(totalCnt / 10)}
                onPageChange={handlePageClick}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostListPage;
