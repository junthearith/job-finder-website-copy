// src/redux/api/jobCategoryApi.js
import axios from 'axios';
import { BASE_URL } from './api';

// Fetch job categories
export const fetchJobCategories = async () => {
  const response = await axios.get(`${BASE_URL}job_categories/`);
  return response.data;
};

// Fetch skills by category ID
export const fetchSkillsByCategoryId = async (categoryId) => {
  const response = await axios.get(`${BASE_URL}job_categories/${categoryId}/`);
  return response.data.skills;
};

