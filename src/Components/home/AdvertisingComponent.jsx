import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

const cardData = [
  {
    image:
      "https://api.istad.co/media/image/eec0362f-380e-40f5-8799-56ca9b8cafb9.png",
    title: "តើអ្វីទៅជា WEB 3.0?",
    description: " មុននឹងស្វែងយល់អំពី WEB 3.0 ត្រូវ...",
    authorImage: "https://istad.co/resources/img/CSTAD_120.png",
    authorName: "Blog",
    date: "11-Aug-2022",
  },
  {
    image:
      "https://api.istad.co/media/image/53e118d6-58e3-4ec1-b40c-ef44f09c441e.jpg",
    title: "ជជែកគ្នាលេងអំពី Web 4.0",
    description: "អ្នកទាំងអស់គ្នាបានដឹងរួចមកហើយថា...",
    authorImage: "https://istad.co/resources/img/CSTAD_120.png",
    authorName: "Blog",
    date: "24-Apr-2023 ",
  },
  {
    image:
      "https://api.istad.co/media/image/8665a243-b962-4a59-b51a-f31a3704b701.png",
    title: "SQL Cheat Sheet",
    description: "SQL commands អាចជួយអោយ...",
    authorImage: "https://istad.co/resources/img/CSTAD_120.png",
    authorName: "Blog",
    date: "13-Jul-2022",
  },
  {
    image:
      "https://api.istad.co/media/image/0b7ddba0-021c-4dc3-ad73-6fe8bea44167.png",
    title: " Developer គួរមានចំណេះដឹង",
    description: "Docker គឺជា open source ...",
    authorImage: "https://istad.co/resources/img/CSTAD_120.png",
    authorName: "Blog",
    date: "04-Aug-2022",
  },
];
const SkeletonArticle = () => (
  <article className="flex flex-col w-[272px] h-[318px] max-md:w-full">
    <div className="flex flex-col grow justify-end items-start pb-6 mx-auto w-full bg-white dark:bg-gray-800 rounded-lg border border-solid shadow-md border-zinc-100 max-md:mt-10">
      <Skeleton className="self-stretch w-full aspect-[1.64] rounded-t-lg" />
      <div className="px-4 py-3 w-full">
        <Skeleton height={24} width="80%" className="rounded" />
        <Skeleton height={20} width="90%" className="mt-2 rounded" />
        <div className="flex gap-2.5 mt-4">
          <Skeleton circle={true} height={36} width={36} />
          <div className="flex flex-col justify-center">
            <Skeleton height={20} width={100} className="rounded" />
            <Skeleton height={16} width={80} className="mt-1 rounded" />
          </div>
        </div>
      </div>
    </div>
  </article>
);

const Article = ({ card }) => (
  <article className="flex flex-col w-[272px] h-[318px] max-md:w-full gap-8" key={card.title}>
    <div className="flex flex-col grow justify-end items-start pb-6 mx-auto w-full bg-white dark:bg-gray-800 rounded-lg border border-solid shadow-md border-zinc-100 max-md:mt-10">
      <img
        loading="lazy"
        src={card.image}
        alt={card.title}
        className="self-stretch w-full shadow-sm aspect-[1.64] rounded-t-lg"
      />
      <div className="px-4 py-3 w-full">
        <h3 className="mt-3 text-left font-bold leading-6 text-neutral-800 dark:text-neutral-200">
          {card.title}
        </h3>
        <p className="mt-2 text-left leading-5 text-slate-500 dark:text-slate-400">
          {card.description}
        </p>
        <div className="flex gap-2.5 mt-4">
          <img
            loading="lazy"
            src={card.authorImage}
            alt={`${card.authorName}'s profile picture`}
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {card.authorName}
            </span>
            <time
              dateTime={card.date}
              className="mt-1 text-xs text-slate-400 dark:text-slate-500"
            >
              {new Date(card.date).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const AdvertisingComponent = () => {
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.language === "kh";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate data loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Link to={`/media`}>
        <section
          className="mt-16"
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <h2
            className={`text-3xl font-medium text-left leading-7 text-black dark:text-white max-md:ml-2.5 ${
              isKhmer ? "font-suwannaphum" : "font-kantumruy"
            }`}
          >
            {t("Advertising.advertising")}
          </h2>
          <div className="mt-8 overflow-x-auto scrollbar-hide">
            <div className="flex flex-row self-stretch max-md:max-w-full">
              <div className="flex gap-8 py-6 max-md:flex-col max-md:gap-0">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, index) => <SkeletonArticle key={index} />)
                  : cardData.map((card) => <Article card={card} key={card.title} />)}
              </div>
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default React.memo(AdvertisingComponent);