import { useEffect, useState } from 'react';
import classnames from 'classnames';
import usePrivateAxios from 'src/hooks/usePrivateAxios';
import ReactPaginate from 'react-paginate';
import { Post } from 'src/lib/types';
import styles from '@/styles/Pagination.module.css';
import { getAllPost } from '@/lib/api/post';
import Router from 'next/router';

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

  const onClickPostItem = (id: string) => {
    Router.push(`/post/${id}`);
  };

  if (loading) return <div>loading...</div>;
  return (
    <>
      {!loading && (
        <div className={classnames('issuesPagination overflow-x-auto mt-20', styles.pagination)}>
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
                  <tr
                    className='hover cursor-pointer'
                    key={post.id}
                    onClick={() => onClickPostItem(post.id)}
                  >
                    <th>{idx + 1}</th>
                    <td>{post.title}</td>

                    <td>
                      {post.comments.length > 0 ? (
                        <div className='indicator relative'>
                          <span className='indicator-item badge indicator-top indicator-end badge-secondary absolute -right-2'>
                            {post.comments.length}
                          </span>
                          <span className=''> {`${post.content.slice(0, 50)}...`}</span>
                        </div>
                      ) : (
                        <>{`${post.content.slice(0, 50)}...`}</>
                      )}
                    </td>
                    <td>{post.user.name}</td>
                  </tr>
                );
              })}
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
