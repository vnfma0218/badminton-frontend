import { FormEvent, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '@/styles/Pagination.module.css';
import classNames from 'classnames';
import { getClubListByName } from '@/lib/api/club';
import { Club } from '@/lib/types';
import { useAppDispatch } from '@/store/hooks';
import { updateAlertState } from '@/store/slices/AlertSlice';
interface SearchClubListModalProps {
  onCancelSearchModal: () => void;
}

const SearchClubListModal = ({ onCancelSearchModal }: SearchClubListModalProps) => {
  const dispatch = useAppDispatch();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [clubName, setClubName] = useState('');
  const [clubList, setClubList] = useState<Club[]>([]);
  useEffect(() => {
    return () => {
      console.log('destroy');
    };
  }, []);

  const onSubmitClubList = async (e: FormEvent) => {
    e.preventDefault();
    if (!clubName) {
      return setErrorMsg('클럽명을 입력해주세요');
    }

    setHasSubmitted(true);
    const res = await getClubListByName({ name: clubName });
    if (res.resultCode === '0000') {
      setClubList(res.dataList);
    }
  };

  return (
    <div className={classNames('issuesPagination', styles.pagination)}>
      <input type='checkbox' id='search-club-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <form className='flex items-center mb-4' onSubmit={onSubmitClubList}>
            <h3 className='font-bold mr-2 text-start'>클럽검색</h3>
            <input
              type='text'
              className='input-primary p-1 rounded text-sm mr-2 border-primary outline'
              placeholder='클럽명'
              onChange={(e) => setClubName(e.target.value)}
              value={clubName}
            />
            <button className='py-2 px-3 rounded text-sm border border-primary'>검색</button>
            {errorMsg ? <p className='ml-2 text-sm text-red-400'>{errorMsg}</p> : null}
          </form>

          <div className='overflow-x-auto'>
            <table className='table table-compact w-full'>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>클럽명</th>
                  <th>주소</th>
                </tr>
              </thead>
              <tbody>
                {clubList.length ? (
                  clubList?.map((club, index) => {
                    return (
                      <tr key={club._id}>
                        <td>{index}</td>
                        <td>{club.name}</td>
                        <td>
                          {club.address.loadAddress ? club.address.loadAddress : club.address.jibun}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p className='text-center mt-10'>
                    {hasSubmitted ? '검색 결과가 없습니다' : '클럽명으로 검색할 수 있습니다'}
                  </p>
                )}
              </tbody>
            </table>
          </div>
          {clubList.length ? (
            <div className='mt-10 absolute bottom-6 ml-auto mr-auto left-0 right-20 text-center'>
              <ReactPaginate
                pageCount={5}
                onPageChange={() => {}}
                previousLabel='<'
                nextLabel='>'
              />
            </div>
          ) : null}

          <div className='modal-action'>
            <label htmlFor='search-club-modal' className='btn' onClick={onCancelSearchModal}>
              확인
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchClubListModal;
