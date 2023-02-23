export type UserLevel = 'A' | 'B' | 'C' | 'D';
export type PageInfo = {
  startPage: number;
  endPage: number;
  currentPage: number;
  totalCount: number;
};

export type ResponseData<T> = {
  resultCode: '0000' | '9999';
  dataList: T;
};

export type ResponseDataWithPageInfo<T> = {
  resultCode: '0000' | '9999';
  dataList: T;
  pageInfo: PageInfo;
};
