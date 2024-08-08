import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardComponent } from "../feat-jobs/CardComponent";
import { selectDataBySearch, fetchAllJobs } from "../../redux/jobs/jobsSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFontClass from "../../common/useFontClass";

const INITIAL_VISIBLE_JOBS = 8;

const PositionCardComponent = ({ jobs, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchResults = useSelector(selectDataBySearch) || [];
  const notificationShown = useRef(false);
  const previousPath = useRef(location.pathname);
  const { t } = useTranslation();
  const { fontClass } = useFontClass();

  useEffect(() => {
    if (!jobs.length) {
      dispatch(fetchAllJobs()).catch((error) => {
        console.error("Failed to fetch jobs:", error);
        toast.error("Error fetching jobs. Please try again later.");
      });
    }
  }, [dispatch, jobs]);

  useEffect(() => {
    if (searchResults.length === 0 && !isLoading && !notificationShown.current) {
      if (location.pathname !== previousPath.current) {
        toast.info("No jobs found for your search query.");
        notificationShown.current = true;
      }
    }
  }, [searchResults, isLoading, location]);

  useEffect(() => {
    previousPath.current = location.pathname;
  }, [location]);

  const handleRedirect = useCallback(() => {
    navigate("/"); 
  }, [navigate]);

  const handleSeeMore = useCallback(() => {
    navigate("/jobs");
  }, [navigate]);

  const displayJobs = searchResults.length ? searchResults : jobs;

  return (
    <div className="my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-[30px] font-semibold text-gray-900 ${fontClass}`}>
          {t("List-Jobs.List")}
        </h2>
        <div
          onClick={handleSeeMore}
          className="cursor-pointer text-xl text-blue-600 hover:text-primary-750"
        >
          See More →
        </div>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: INITIAL_VISIBLE_JOBS }, (_, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 animate-pulse"
            >
              <Skeleton height={200} />
            </div>
          ))}
        </div>
      ) : displayJobs.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayJobs.slice(0, INITIAL_VISIBLE_JOBS).map((job) => (
            <CardComponent key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div
          className="text-center mt-4 text-lg text-gray-600"
          aria-live="polite"
        >
          No jobs available at the moment.
        </div>
      )}
    </div>
  );
};

export default React.memo(PositionCardComponent);
