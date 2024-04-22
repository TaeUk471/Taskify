'use client';
import { DEFAULT_PROFILE_IMAGE } from './constant';
import TableLayout from './TableLayout';
import { MouseEvent, useEffect, useState } from 'react';
import { getDashBoardMembers } from '@/utils/api/getDashBoardMembers';
import PageNationButton from '../PageNation/PageNationButton';

const MemberTable = () => {
  const [members, setMembers] = useState([]);
  const [pageNation, setPageNation] = useState({
    currentPage: 1,
    totalPage: 1,
  });
  const apiQuery = {
    showCount: 4,
    dashboardId: 5946,
  };

  const handleLoadMembers = async () => {
    try {
      const { members, totalCount } = await getDashBoardMembers({
        currentPage: pageNation.currentPage,
        showCount: apiQuery.showCount,
        dashboardId: apiQuery.dashboardId,
      });
      setPageNation(prevState => ({
        ...prevState,
        totalPage: Math.ceil(totalCount / apiQuery.showCount),
      }));
      setMembers(members);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCurrentPage = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === 'plus') {
      if (pageNation.currentPage < pageNation.totalPage) {
        setPageNation(prevState => ({
          ...prevState,
          currentPage: pageNation.currentPage++,
        }));
      }
    } else {
      if (pageNation.currentPage > 1) {
        setPageNation(prevState => ({
          ...prevState,
          currentPage: pageNation.currentPage--,
        }));
      }
    }
  };

  useEffect(() => {
    handleLoadMembers();
  }, [pageNation.currentPage]);

  const MemberList = members.map(member => (
    <div key={member.id} className='flex justify-between border-solid border-b-[1px] py-4 last:border-none'>
      <div className='flex gap-3 items-center ml-7'>
        <div className='w-[2.375rem] h-[2.375rem] relative rounded-full overflow-hidden'>
          <img src={member.profileImageUrl ? member.profileImageUrl : DEFAULT_PROFILE_IMAGE} alt='프로필 사진' />
        </div>
        <p className='text-base text-tp-black_700'>{member.nickname}</p>
      </div>
      <button type='button' className='border border-solid border-tp-gray_700 rounded-lg py-2 px-6 mr-7'>
        버튼대체
      </button>
    </div>
  ));

  return (
    <TableLayout
      title='구성원'
      headerContent={
        <PageNationButton
          totalPage={pageNation.totalPage}
          currentPage={pageNation.currentPage}
          handleCurrentPage={handleCurrentPage}
        />
      }
      tableContent={MemberList}
    />
  );
};

export default MemberTable;
