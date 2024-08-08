import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import SliderComponent from "../Components/home/SliderComponent";
import HeroSectionComponent from "../Components/home/HeroSectionComponent";
import SearchComponent from "../Components/home/SearchComponent";
import PositionCardComponent from "../Components/home/PositionCardComponent";
import AdvertisingComponent from "../Components/home/AdvertisingComponent";
import FeatureDetailComponent from "../Components/home/FeatureDetailComponent";
import { selectStatus } from "../redux/jobs/jobsSlice";
import useThrottleScroll from "../common/useThrottleScroll";

// Wrap HomePage in React.memo for performance optimization
const HomePage = React.memo(({ categories, jobs }) => {
  const status = useSelector(selectStatus);

  const saveScrollPosition = useCallback(() => {
    localStorage.setItem("scrollPosition", window.scrollY);
  }, []);

  // Throttle the scroll event to improve performance
  useThrottleScroll(saveScrollPosition, 200);

  useEffect(() => {
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, []);

  return (
    <div className="mx-auto p-4">
      <HeroSectionComponent isLoading={status === 'loading'} />
      <SliderComponent />
      <SearchComponent categories={categories} isLoading={status === 'loading'} />
      <PositionCardComponent jobs={jobs} isLoading={status === 'loading'} />
      <AdvertisingComponent />
      <FeatureDetailComponent />
    </div>
  );
});

export default HomePage;
