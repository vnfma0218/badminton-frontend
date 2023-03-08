import { FormEvent, useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '@/styles/Pagination.module.css';
import classNames from 'classnames';
import { getClubListByName } from '@/lib/api/club';
import { Club } from '@/lib/types';
import { useAppDispatch } from '@/store/hooks';
import { PageInfo } from '@/lib/api/common';
interface SearchClubListModalProps {
  onCancelSearchModal: () => void;
  onClickClub: (name: string, lat: number, lng: number) => void;
}
const PAGE_SIZE = 5;
const SearchClubListModal = ({ onCancelSearchModal, onClickClub }: SearchClubListModalProps) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [clubName, setClubName] = useState('');
  const [clubList, setClubList] = useState<Club[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: 1,
    endPage: 0,
    startPage: 1,
    totalCount: 0,
  });

  useEffect(() => {
    return () => {
      console.log('destroy');
    };
  }, [pageInfo.currentPage]);

  const onSubmitClubList = async (e?: FormEvent) => {
    e && e.preventDefault();
    if (!clubName) {
      return setErrorMsg('클럽명을 입력해주세요');
    }

    setHasSubmitted(true);
    const res = await getClubListByName({
      name: clubName,
      size: PAGE_SIZE,
      page: pageInfo.currentPage,
    });
    if (res.resultCode === '0000') {
      setClubList(res.dataList);
      setPageInfo(res.pageInfo);
    }
  };

  const clickClub = (name: string, lat: number, lng: number) => {
    onClickClub(name, lat, lng);
    (modalRef.current as any).click();
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPageInfo((prev) => ({ ...prev, currentPage: selected + 1 }));
  };

  return (
    <div className={classNames('issuesPagination', styles.pagination)}>
      <input type='checkbox' id='search-club-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box w-11/12 h-full'>
          <form className='flex items-center justify-between mb-4' onSubmit={onSubmitClubList}>
            {/* <h3 className='font-bold mr-2 text-start'>클럽검색</h3> */}
            <input
              type='text'
              className='input-primary w-4/6 h-8 p-2 rounded text-sm mr-2 border-primary outline'
              placeholder='클럽명'
              onChange={(e) => {
                setErrorMsg('');
                setClubName(e.target.value);
              }}
              value={clubName}
            />
            <button className='py-2 px-3 rounded text-sm border border-primary'>검색</button>
          </form>
          {errorMsg && !clubName ? (
            <p className='ml-2 text-sm text-red-400 text-left'>{errorMsg}</p>
          ) : null}
          {clubList.length > 0 ? (
            <div className='overflow-x-auto mt-6 min-h-[70%] w-11/12 inline-block'>
              <div className='flex items-center mb-2'>
                <p className='text-sm text-left mr-2'>total</p>
                <p className='text-sm text-purple-500'>{pageInfo.totalCount}</p>
              </div>
              <table className='table table-compact w-full'>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>클럽명</th>
                    <th>주소</th>
                  </tr>
                </thead>
                <tbody>
                  {clubList?.map((club, index) => {
                    return (
                      <tr
                        key={club._id}
                        onClick={() =>
                          clickClub(
                            club.name,
                            club.location.coordinates[1],
                            club.location.coordinates[0],
                          )
                        }
                      >
                        <td>
                          {pageInfo.totalCount - index - (pageInfo.currentPage - 1) * PAGE_SIZE}
                        </td>
                        <td>{club.name}</td>
                        <td>
                          {club.address.loadAddress ? club.address.loadAddress : club.address.jibun}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}{' '}
          {clubList.length < 1 ? (
            <p className='text-center mt-10'>
              {hasSubmitted ? '검색 결과가 없습니다' : '클럽명을 검색해주세요'}
            </p>
          ) : null}
          {clubList.length ? (
            <div className='text-center'>
              <ReactPaginate
                // pageCount={Math.ceil(items.length / PAGE_SIZE)}
                pageCount={Math.ceil(pageInfo?.totalCount / PAGE_SIZE)}
                onPageChange={handlePageClick}
                previousLabel='<'
                nextLabel='>'
              />
            </div>
          ) : null}
          <div className='absolute bottom-5 right-3'>
            <label
              ref={modalRef}
              htmlFor='search-club-modal'
              className='btn bg-transparent border border-black'
              onClick={onCancelSearchModal}
            >
              닫기
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchClubListModal;
