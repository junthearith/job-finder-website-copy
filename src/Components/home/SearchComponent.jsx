import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkills,
  selectSkillsByCategoryId,
} from "../../redux/features/category-job/categorySlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  performGlobalSearch,
  clearSearchResults,
  selectSearchError,
} from "../../redux/jobs/jobsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import useFontClass from "../../common/useFontClass";

const SearchComponent = ({ categories, isLoading }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const { fontClass } = useFontClass();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [query, setQuery] = useState("");
  const error = useSelector(selectSearchError);
  const skills = useSelector((state) =>
    selectSkillsByCategoryId(state, selectedCategory)
  );

  useEffect(() => {
    if (query.trim() === "") {
      dispatch(clearSearchResults());
    }
  }, [query, dispatch]);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSkill("");
    setLoadingSkills(true);
    try {
      await dispatch(fetchSkills(categoryId)).unwrap();
    } catch (error) {
      toast.error(error.message || <span className={`${fontClass}`}>{t('search.fetchSkillsError')}</span>);
    } finally {
      setLoadingSkills(false);
    }
  };

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        await dispatch(performGlobalSearch(query)).unwrap();
      } catch (error) {
        toast.error(error.message || <span className={`${fontClass}`}>{t('search.searchError')}</span>);
      }
    } else {
      dispatch(clearSearchResults());
    }
    // Clear selected options
    setSelectedCategory("");
    setSelectedSkill("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission if inside a form
      handleSearch();
    }
  };

  return (
    <section className="flex border-2 border-solid border-slate-200 rounded-lg justify-between pt-4 pb-4 mt-16 px-4 text-2xl leading-8 whitespace-nowrap text-slate-700 gap-4 max-md:flex-wrap max-md:mr-1.5">
      {isLoading ? (
        <>
          <Skeleton height={50} className="w-full rounded-lg" />
          <Skeleton height={50} width={288} className="rounded-lg" />
          <Skeleton height={50} width={288} className="rounded-lg" />
          <Skeleton height={50} width={100} className="rounded-lg" />
        </>
      ) : (
        <>
          <div className="relative flex items-center w-full max-md:w-full">
            <span className="absolute left-4 text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.85-6.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder={t('search.placeholder')}
              className="pl-14 pr-4 py-4 rounded-lg border-2 border-solid border-slate-100 bg-slate-100 w-full"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              value={query}
            />
          </div>
          <select
            className="px-4 py-2 rounded-lg border-2 border-solid border-slate-100 w-72 max-md:w-full"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              {t('search.selectCategory')}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 rounded-lg border-2 border-solid border-slate-100 w-72 max-md:w-full"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            disabled={!skills.length || loadingSkills}
          >
            <option value="" disabled>
              {loadingSkills ? t('search.loadingSkills') : t('search.selectSkill')}
            </option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
          <button
            className="justify-center p-2 px-8 text-white font-kantumruy text-lg bg-blue-800 rounded-lg border-2 border-blue-800 border-solid max-lg:text-lg max-xl:text-xl max-2xl:text-xl max-md:px-6"
            onClick={handleSearch}
          >
            <span className={`${fontClass}`}>{t('search.searchButton')}</span>
          </button>
        </>
      )}
    </section>
  );
};

export default React.memo(SearchComponent);
