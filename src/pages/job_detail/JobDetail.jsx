import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById, selectJobById } from '../../redux/jobs/jobsSlice';
import Metadata from '../../lib/Metadata';
import useThrottleScroll from '../../common/useThrottleScroll'; // Import the custom hook
import JobDetailComponent from '../../Components/card/JobDetailcomponent';

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const job = useSelector((state) => selectJobById(state, id));

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  const saveScrollPosition = useCallback(() => {
    localStorage.setItem('scrollPosition', window.scrollY);
  }, []);

  useThrottleScroll(saveScrollPosition, 200);

  useEffect(() => {
    const savedPosition = localStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, []);

  return (
    <>
      <Metadata
        title={`${job?.title} - Job Finder`}
        description={job?.description}
        author="Your Name"
        keywords="jobs, careers, employment"
        thumbnail={job?.image || 'https://example.com/og-image.jpg'}
        url={`https://example.com/jobs/${job?.id}`}
        type="article"
      />
      {job ? <JobDetailComponent detail={job} /> : <p>Loading...</p>}
    </>
  );
};

export default JobDetail;
