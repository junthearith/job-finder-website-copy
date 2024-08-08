import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJobCategories as fetchCategoriesAPI} from "../../api/jobCategoryApi.js";
import {fetchSkillsByCategoryId} from "../../api/jobCategoryApi.js";


export const fetchJobCategories = createAsyncThunk(
  "job_category/fetchJobCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategoriesAPI();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSkills = createAsyncThunk(
  "job_category/fetchSkills",
  async (categoryId, { rejectWithValue }) => {
    try {
      const skills = await fetchSkillsByCategoryId(categoryId);
      console.log('categoryId',categoryId , 'skills',skills)
      return { categoryId, skills };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "job_category",
  initialState: {
    job_categories: [],
    skills: {},
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.job_categories = action.payload;
      })
      .addCase(fetchJobCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load job categories";
      })
      .addCase(fetchSkills.pending, (state) => {
        state.skillsStatus = "loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skillsStatus = "succeeded";
        state.skills[action.payload.categoryId] = action.payload.skills;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.skillsStatus = "failed";
        state.error = action.payload || "Failed to load skills";
      })
  }
});

export default categorySlice.reducer;

// Selectors
export const selectAllJobCategories = (state) => state.category.job_categories;
export const getJobCategoriesStatus = (state) => state.category.status;
export const getJobCategoriesError = (state) => state.category.error;
export const selectSkillsByCategoryId = (state, categoryId) => state.category.skills[categoryId] || [];

