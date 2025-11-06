import React from "react";
import { useRouter } from "next/router";
import styles from "./OutletLayout.module.css";
const OutletLayout = ({ sidebar, children }) => {
  const router = useRouter();
  const page = router.query.page; 
  const headingMap = {
    profile: "Profile",
    listing: "Listing",
    "assigned-listing": "Assigned Listings",
    "e-verification": "S-Verification",
    leads: "Leads",
    "post-property": "Post Property",
    "activity": "Activities",
    "enquiries-received": "Enquiries Received",
    "super-associate": "Associates",
  };

  const currentHeading = headingMap[page] || "";

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-[93%] lg:w-[93%]">
        <div className={styles.wrapper}>
          <div className={styles.outletContainer}>
            <aside className={styles.sidebar}>{sidebar}</aside>

            <main className={styles.content}>
              {currentHeading && (
                <div
                  className="font-poppins text-2xl text-black"
                  style={{ color: "var(--secondary-color)", marginBottom: '10px'   }}
                >
                  <span style={{ fontSize: "1.5rem", fontWeight:"200" }}>My</span>{" "}
                  <span style={{ fontWeight: "900", fontSize: "1.5rem" }}>
                    {currentHeading}
                  </span>
                </div>



              )}
         {/* {page === "profile" && (
                <div className={styles.mascotContainer}>
                  <div className={styles.mascotImageWrapper}>
                    <Image src={mascot} fill alt="mascot" />
                  </div>
                </div>
              )} */}
              <div>{children}</div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutletLayout;
