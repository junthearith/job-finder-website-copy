import React from "react";
import { Link } from "react-router-dom";
import SearchComponent from "../home/SearchComponent";

export function CardComponent({ job, isLoading }) {
  <SearchComponent />;
  if (isLoading) {
    return (
      <article className="p-6 w-full max-w-xs mx-auto animate-pulse bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="flex gap-5 justify-between items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="w-20 h-6 rounded bg-gray-300"></div>
        </div>
        <div className="w-3/4 h-6 rounded bg-gray-300 mb-4"></div>
        <div className="flex gap-2 justify-between mb-4">
          <div className="w-1/3 h-4 rounded bg-gray-300"></div>
          <div className="w-1/4 h-4 rounded bg-gray-300"></div>
        </div>
        <div className="h-20 bg-gray-300 rounded mb-4"></div>
        <div className="w-3/4 h-9 rounded bg-gray-300 mx-auto"></div>
      </article>
    );
  }

  const jobTypeBadge = job.isFullTime ? "Full Time" : "Part Time";

  return (
    <article
      data-aos="fade-up"
      className="hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/jobs/${job.id}`}>
        <div className="flex flex-col p-6 text-base leading-6 bg-white border border-solid border-gray-200 rounded-lg shadow-md max-w-xs mx-auto">
          <div className="flex gap-5 justify-between items-center text-indigo-600">
            <img
              loading="lazy"
              src={job.thumbnail}
              className="shrink-0 w-12 h-12 rounded-full"
              alt={`${job.company_name} logo`}
            />
            <div className="px-3 py-1 border border-primary-600 text-primary-800 rounded-lg font-kantumruy">
              {job.job_type}
            </div>
          </div>
          <div className="mt-4 text-lg font-semibold text-gray-800 text-start line-clamp-1">
            {job.title}
          </div>
          <div className="text-gray-600 mt-1">
            <div className="line-clamp-1 text-start">{job.company_name}</div>
            <div className="line-clamp-1 text-start">{job.location}</div>
          </div>
          <div className="mt-4 text-gray-500 text-start leading-relaxed line-clamp-2">
            {job.description}
          </div>
          <div className="flex flex-wrap gap-2 mt-4 text-sm font-semibold justify-center">
            <button className="w-full justify-center p-2 px-8 text-white bg-blue-800 rounded-lg border-2 border-blue-800 border-solid max-md:px-5">
              Detail
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
