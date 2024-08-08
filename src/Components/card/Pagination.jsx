import React from 'react';
import { Pagination as FlowbitePagination } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/jobs/jobsSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function Pagination({ isLoading }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.jobs.currentPage);
  const totalJobs = useSelector((state) => state.jobs.totalJobs);
  const pageSize = useSelector((state) => state.jobs.pageSize);
  const totalPages = Math.ceil(totalJobs / pageSize);

  const onPageChange = (page) => {
    dispatch(setPage(page));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Skeleton height={32} width={200} className="rounded" />
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <FlowbitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
