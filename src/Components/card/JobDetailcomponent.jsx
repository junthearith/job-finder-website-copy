import React from "react";

const JobDetailComponent = ({ detail }) => {
  return (
    <div className="mt-20 flex flex-col text-left">
      <div className="flex flex-col md:flex-row gap-5 items-center">
        <img
          className="w-[8%]"
          loading="lazy"
          src={detail?.thumbnail}
          alt="Company Logo"
        />
        <div className="flex-1">
          <div className="text-xl md:text-2xl font-medium leading-8 text-zinc-900">
            {detail?.title}
          </div>
          <div className="flex flex-wrap gap-2 mt-3 text-sm leading-5">
            <div className="text-lg leading-7 text-neutral-600 min-w-max">
              {detail?.company_name}
            </div>
            <div className="flex items-center justify-center px-3 py-1 font-semibold text-white whitespace-nowrap bg-primary-800 rounded-lg">
              {detail?.job_type}
            </div>
            <div className="flex items-center justify-center px-3 py-1 whitespace-nowrap bg- rounded-[52px]">
              Featured
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full max-md:max-w-full mb-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 text-base leading-6 text-gray-500 max-md:mt-6 max-md:max-w-full">
              <div className="text-lg font-medium leading-7 text-zinc-900 max-md:max-w-full">
                Job Description
              </div>
              <div className="mt-4 max-md:mr-1.5 max-md:max-w-full">
                {detail?.description}
              </div>
              <div className="mt-4 font-medium leading-[150%] text-zinc-900 max-md:max-w-full">
                Requirements
              </div>
              <div className="mt-2 max-md:max-w-full">
                {detail?.job_requirements.map((requirement, index) => (
                  <div key={index}>{requirement?.requirement}</div>
                ))}
              </div>
              <div className="mt-4 font-medium leading-[150%] text-zinc-900 max-md:max-w-full">
                Desirable:
              </div>
              <div className="mt-2 max-md:max-w-full">
                <ul className="list-disc pl-4">
                  <li>
                    Working knowledge of eCommerce platforms, ideally Shopify
                    but also others e.g. Magento, WooCommerce, Visualsoft to
                    enable seamless migrations.
                  </li>
                  <li>Working knowledge of payment gateways</li>
                  <li>API platform experience / Building restful APIs</li>
                </ul>
              </div>
              <div className="mt-4 font-medium leading-[150%] text-zinc-900 max-md:max-w-full">
                Benefits
              </div>
              <div className="mt-2 max-md:max-w-full">
                <ul className="list-disc pl-4">
                  <li>
                    Early finish on Fridays for our end of week catch up (4:30
                    finish, and drink of your choice from the bar)
                  </li>
                  <li>
                    28 days holiday (including bank holidays) rising by 1 day
                    per year PLUS an additional day off on your birthday
                  </li>
                  <li>Generous annual bonus.</li>
                  <li>Healthcare package</li>
                  <li>
                    Paid community days to volunteer for a charity of your
                    choice
                  </li>
                  <li>
                    £100 contribution for your own personal learning and
                    development
                  </li>
                  <li>
                    Free Breakfast on Mondays and free snacks in the office
                  </li>
                  <li>
                    Access to Perkbox with numerous discounts plus free points
                    from the company to spend as you wish.
                  </li>
                  <li>Cycle 2 Work Scheme</li>
                  <li>Brand new MacBook Pro</li>
                  <li>
                    Joining an agency on the cusp of exponential growth and
                    being part of this exciting story.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
              <div className="justify-center p-8 bg-white rounded-lg border-2 border-sky-100 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col justify-center self-stretch my-auto font-medium text-center max-md:mt-10">
                      <div className="text-base leading-6 text-zinc-900">
                        Salary (USD)
                      </div>
                      <div className="mt-3 text-xl leading-6 text-green-600">
                        {detail?.salary}
                      </div>
                      <div className="mt-1 text-sm leading-5 text-gray-500">
                        Monthly salary
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow justify-center text-base leading-6 text-center max-md:mt-10">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e902683ca13e9cd14279adf820e34b6cd25573791ba4a5107cc7a4322592055e?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                        className="self-center aspect-square w-[38px]"
                        alt="Location Icon"
                      />
                      <div className="mt-2 font-medium text-zinc-900">
                        Job Location
                      </div>
                      <div className="text-gray-500">{detail?.location}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-8 mt-8 bg-white rounded-lg border-2 border-sky-100 max-md:max-w-full">
                <div className="mx-8 text-lg font-medium leading-7 text-zinc-900 max-md:mr-2.5 max-md:max-w-full">
                  Job Overview
                </div>
                <div className="flex gap-4 mx-8 mt-5 max-md:flex-wrap max-md:mr-2.5">
                  <div className="flex flex-col flex-1">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/dfbd2123267a1bfab4313eadf237420709032b0bcabf931f8af8c0e994a191e7?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                      className="w-8 aspect-square"
                      alt="Calendar Icon"
                    />
                    <div className="mt-3 text-xs leading-5 text-gray-500 uppercase">
                      Job Posted:
                    </div>
                    <div className="mt-1 text-sm font-medium leading-5 text-zinc-900">
                      {detail?.created_at}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/46997f710a4214bf9b5b9bbe447fe1b90db5b0843d4f54430a357c74bc27e322?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                      className="w-8 aspect-square"
                      alt="Clock Icon"
                    />
                    <div className="mt-3 text-xs leading-5 text-gray-500 uppercase">
                      Job expire on:
                    </div>
                    <div className="mt-1 text-sm font-medium leading-5 text-zinc-900">
                      14 Aug, 2021
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f83d81f9e32da470b3b37f7b398da538503fb147090b3bc9f6b620a335d3968?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                      className="w-8 aspect-square"
                      alt="Level Icon"
                    />
                    <div className="mt-3 text-xs leading-5 text-gray-500 uppercase">
                      Job Level:
                    </div>
                    <div className="mt-1 text-sm font-medium leading-5 text-zinc-900">
                      Entry Level
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 mx-8 mt-5 whitespace-nowrap max-md:flex-wrap max-md:mr-2.5">
                  <div className="flex flex-col">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/072c8645bbe25f4f5198d6e8b3f0971b24d156767c8e5db77651e9151a59e159?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                      className="w-8 aspect-square"
                      alt="Experience Icon"
                    />
                    <div className="mt-3 text-xs leading-5 text-gray-500 uppercase">
                      Experience
                    </div>
                    <div className="mt-1 text-sm font-medium leading-5 text-zinc-900">
                      $50k-80k/month
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3a198ddbceae3d0065f7061d6cffdf79eaaae7729491c8e0131c21fe231cf37?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                      className="w-8 aspect-square"
                      alt="Education Icon"
                    />
                    <div className="mt-3 text-xs leading-5 text-gray-500 uppercase">
                      Education
                    </div>
                    <div className="mt-1 text-sm font-medium leading-5 text-zinc-900">
                      Graduation
                    </div>
                  </div>
                </div>
                <div className="shrink-0 mt-6 h-0.5 bg-sky-100 border-2 border-sky-100 max-md:max-w-full" />
                <div className="flex flex-col px-8 mt-6 max-md:px-5 max-md:max-w-full">
                  <div className="text-lg font-medium leading-7 text-zinc-900 max-md:max-w-full">
                    Share this job:
                  </div>
                  <div className="flex gap-2 pr-20 mt-2 max-md:flex-wrap max-md:pr-5">
                    <div className="flex gap-1.5 justify-center px-4 py-2 text-base font-medium leading-6 text-blue-700 bg-sky-100 rounded-[var(--sds-size-blur-100)]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4de9d1036dc405778292cdfae4666a69184749f95d83955280b55c5d1c150274?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                        className="shrink-0 w-6 aspect-square"
                        alt="Copy Icon"
                      />
                      <div>Copy Link</div>
                    </div>
                    <div className="flex justify-center items-center p-2.5 w-10 h-10 bg-sky-100 rounded-[var(--sds-size-blur-100)]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a439e5c92d3856af8fdc657fd3cf2890e491d40998e95657f136aa6e25bdae5d?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                        className="w-5 aspect-square"
                        alt="Social Icon 1"
                      />
                    </div>
                    <div className="flex justify-center items-center p-2.5 w-10 h-10 bg-sky-100 rounded-[var(--sds-size-blur-100)]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4c07cfe1eb1d71a1ae82bdc06fb860532b55d901424ae34ec8f42a820600e18?apiKey=391ff68a63584b0181b4aa51e20262f0&"
                        className="w-full aspect-square fill-blue-700 max-w-[22px]"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-center p-2.5 w-10 h-10 bg-sky-100 colorrounded-[var(--sds-size-blur-100)]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6df5c479f5a264f19cd584ba7616c0bec50584831b3e4e86f7c0b66bad95e585?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                        className="w-5 aspect-square"
                        alt="Social Icon 3"
                      />
                    </div>
                    <div className="flex justify-center items-center p-2 w-10 h-10 bg-sky-100 rounded-[var(--sds-size-blur-100)]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09e4235e1f4b86d165931d51e06eb718b87f02e11b2ec3d0ba3facccd39bb7b5?apiKey=4ca16dc24a9e4ca79331f0aa6ebbe35c&"
                        className="w-6 aspect-square"
                        alt="Social Icon 4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailComponent;
