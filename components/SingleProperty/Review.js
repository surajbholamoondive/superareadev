import React, { useState } from "react";
import Styles from "./index.module.css";

const reviewsData = [
  {
    id: 1,
    user: "User 1",
    rating: 4,
    userType: "AGNET",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis, cursus aliquet dignissim enim. Lobortis ultrices purus, aliquam fames enim, proin integer leo. Vitae elit massa sed.",
    city: "Owner",
  },
  {
    id: 2,
    user: "User 2",
    rating: 5,
    userType: "USER",
    review:
      "Excellent service and amen Great experience, loved the place Great experience, loved the place ities amen Great experience, loved the place Great experience, loved the place ities  amen Great experience, loved the place Great experience, loved the place ities  amen Great experience, loved the place Great experience, loved the place ities  amen Great experience, loved the place Great experience, loved the place ities  amen Great experience, loved the place Great experience, loved the place ities  amen Great experience, loved the place Great experience, loved the place ities  amen Great experience, loved the place Great experience, loved the place ities  ",
    city: "User",
  },
  {
    id: 3,
    user: "User 3",
    rating: 3,
    userType: "AGNET",
    review:
      "Decent place, but needs improvem Great experience, loved the place Great experience, loved the placeent.",
    city: "Agent",
  },
  {
    id: 4,
    user: "User 4",
    rating: 4,
    userType: "USER",
    review:
      "Great experience, loved the p Great experience, loved the place Great experience, loved the placelace.",
    city: "Admin",
  },
  {
    id: 5,
    user: "User 5",
    rating: 5,
    userType: "ADMIN",
    review:
      "Excellent service and amen Great experience, loved the place Great experience, loved the place ities  .",
  },
  {
    id: 6,
    user: "User 6",
    rating: 3,
    userType: "OWNER",
    review: "Decent place, but needs improvement.",
  },
];

const Review = () => {
  const [view] = useState([]);
  const [reviewsToDisplay, setReviewsToDisplay] = useState(3);

  const handleToggleView = () => {
    if (reviewsToDisplay === 3) {
      setReviewsToDisplay(reviewsData.length);
    } else {
      setReviewsToDisplay(3);
    }
  };

  return (
    <div className="relative shadow-lg rounded-b-lg">
      <div
        className="bg-[#9DACA1] flex justify-between rounded-t-lg shadow-md lg:p-4 md:p-3 p-2"
      >
        <div>
          <h1 className="text-white text-[14px] font-semibold">Reviews</h1>
        </div>
        <div>
          {reviewsData.length > 3 && (
            <div className="flex justify-center">
              <button onClick={handleToggleView} className="text-white text-[14px] font-semibold">
                {reviewsToDisplay === 3 ? 'View All' : 'View Less'}
              </button>
            </div>
          )}
        </div>
      </div>
      {view && (
        <div className="bg-white rounded-b-lg shadow-md h-fit">
          <div className="container p-2">
            <div className="flex flex-wrap max-md:justify-center justify-between">
              {reviewsData.slice(0, reviewsToDisplay).map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border-solid border-[1.2px] border-[#003E71] shadow-md p-3 m-2 lg:m-6 flex flex-col max-md:w-[86%] md:w-[30%] lg:w-[28%]"
                  style={{ width: "", height: "245px" }}
                >
                  <div className="items-center px-2">
                    <h2 className="font-semibold text-[12px] py-2">{review.user}</h2>
                    <div className="flex mt-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="gold" // Change the color here to gold
                          viewBox="0 0 16 16"
                          className="h-3 w-3" // Remove the text-primary class
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 .25a.75.75 0 0 1 .664.408l1.93 4.927 5.451.398a.75.75 0 0 1 .416 1.299l-4.148 3.208 1.457 5.377a.75.75 0 0 1-1.156.844L8 13.347l-4.056 2.756a.75.75 0 0 1-1.156-.845l1.457-5.377L.489 7.98a.75.75 0 0 1 .416-1.3l5.45-.397L7.336 .657A.75.75 0 0 1 8 .25z"
                          />
                        </svg>
                      ))}
                      {Array.from({ length: 5 - review.rating }).map(
                        (_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            // fill="gold" // Change the color here to gold
                            viewBox="0 0 16 16"
                            className="h-3 w-3" // Remove the text-primary class
                            stroke="gold"
                            fill="none"
                          >
                            <path
                              // fillRule="evenodd"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 .25a.75.75 0 0 1 .664.408l1.93 4.927 5.451.398a.75.75 0 0 1 .416 1.299l-4.148 3.208 1.457 5.377a.75.75 0 0 1-1.156.844L8 13.347l-4.056 2.756a.75.75 0 0 1-1.156-.845l1.457-5.377L.489 7.98a.75.75 0 0 1 .416-1.3l5.45-.397L7.336 .657A.75.75 0 0 1 8 .25z"
                            />
                          </svg>
                        )
                      )}
                    </div>
                    <div>
                      <p className={`text-[10px] ${Styles.review}`}>
                        {review?.review}
                      </p>
                    </div>



                    <div className="mt-5 text-[12px]">
                      From {review?.city ? review?.city : "New User"}
                      <hr className={Styles.cityUnderline} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* {reviewsData.length > 3 && (
          <div className="flex justify-center">
            <button onClick={handleToggleView} className="text-blue-600 mb-4">
              {reviewsToDisplay === 3 ? 'View More' : 'View Less'}
            </button>
          </div>
        )} */}
        </div>

      )}
    </div>
  );
};

export default Review;
