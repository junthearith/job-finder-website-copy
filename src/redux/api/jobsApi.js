import axios from "axios";
import { BASE_URL } from "./api";

export const getJobs = async (page, pageSize = 12) => {
  const jobsPerPage = 10; // Number of jobs per page returned by the API
  let jobs = [];
  let currentPage = Math.floor((pageSize * (page - 1)) / jobsPerPage) + 1;
  let offset = (pageSize * (page - 1)) % jobsPerPage;
  let totalJobs = 0;

  // Fetch the first page
  const response1 = await axios.get(`${BASE_URL}jobs/`, {
    params: {
      page: currentPage,
      pageSize: jobsPerPage,
    },
  });
  const { results: results1, count } = response1.data;

  jobs = jobs.concat(results1.slice(offset));
  totalJobs = count;

  if (jobs.length < pageSize && (currentPage * jobsPerPage < totalJobs)) {
    // Fetch the next page to get additional jobs
    const response2 = await axios.get(`${BASE_URL}jobs/`, {
      params: {
        page: currentPage + 1,
        pageSize: jobsPerPage,
      },
    });
    const { results: results2 } = response2.data;
    jobs = jobs.concat(results2);
  }

  // Return only the number of jobs needed to fill the page
  return {
    jobs: jobs.slice(0, pageSize),
    totalJobs: totalJobs,
  };
};

// Fetch job by ID
export const getJobById = async (jobId) => {
  const response = await axios.get(`${BASE_URL}jobs/${jobId}/`);
  return response.data;
};

export const getAllJobs = async () => {
  let allJobs = [];
  let page = 1;
  let pageSize = 10;
  let totalJobs = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get(`${BASE_URL}jobs/`, {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    const { results, count } = response.data;
    allJobs = [...allJobs, ...results];
    totalJobs = count;
    hasMore = allJobs.length < totalJobs;
    page += 1;
  }
  return {
    jobs: allJobs,
    totalJobs: totalJobs,
  };
};


export const fetchGlobalSearch = async (query) => {
  const response = await axios.get(`${BASE_URL}global_search/?q=${query}`);
  return response.data.jobs;
};