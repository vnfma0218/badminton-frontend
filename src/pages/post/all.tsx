import { useEffect, useState } from 'react';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';
import { Post } from 'src/lib/types';
import styles from '@/styles/Pagination.module.css';
import { getAllPost } from '@/lib/api/post';
import Router from 'next/router';
import useSWR from 'swr';

const limit = 6;
const PostListPage = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [totalCnt, setTotalCnt] = useState<number>();
  // const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);

  const { data, isValidating: loading } = useSWR(['/post/all', pageNo], () =>
    getAllPost(pageNo, limit),
  );

  useEffect(() => {
    if (data?.resultCode === '0000' && data.dataList) {
      setPostList(data.dataList.postList);
      setTotalCnt(Math.ceil(data.dataList.totalCnt / limit));
    }
  }, [data]);

  const handlePageClick = (event: any) => {
    console.log('event.selected', event.selected);
    setPageNo(event.selected + 1);
  };

  const onClickPostItem = (id: string) => {
    Router.push(`/post/${id}`);
  };

  return (
    <>
      <div
        className={classnames(
          'issuesPagination overflow-x-auto scroll mt-20 h-screen scrollbar-hide overflow-y-hidden',
          styles.pagination,
        )}
      >
        <div>
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
                    className='hover cursor-pointer h-14'
                    key={post.id}
                    onClick={() => onClickPostItem(post.id)}
                  >
                    <th>{idx + 1}</th>
                    <td>{post.title}</td>

                    <td className=''>
                      {post.comments.length > 0 ? (
                        <div className='indicator relative'>
                          <span className='indicator-item badge indicator-top indicator-end badge-secondary absolute -right-2'>
                            {/* <span className='material-icons mr-1'>comment</span> */}
                            {post.comments.length}
                          </span>
                          <span> {`${post.content.slice(0, 50)}...`}</span>
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
        </div>
        <div className='mt-10 absolute bottom-28 ml-auto mr-auto left-0 right-0 text-center'>
          <ReactPaginate pageCount={totalCnt ?? 0} onPageChange={handlePageClick} />
        </div>
      </div>
    </>
  );
};

export default PostListPage;
