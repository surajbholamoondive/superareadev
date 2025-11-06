import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CustomTabLabel, excludedPaths, numberFormatter } from "@/utils/utils";
import styles from "./SideDashboard.module.css";

const SideDashboard = ({ arrayMenu, count }) => {
  const router = useRouter();
  const currentPage = router.query.page;

  const isActive = (path) => {
    if (path.includes("?")) {
      const basePath = path.split("?")[0];
      return router.pathname.replace("[page]", currentPage) === basePath;
    } else {
      return router.pathname.replace("[page]", currentPage) === path;
    }
  };

  const { city, days } = router.query;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.menuContainer}>
        {arrayMenu?.map(({ icon, iconBlack, label, path, labelIcon, preIconText }) => (
          <Link
            key={path}
            href={
              path.startsWith("/admin")
                ? {
                  pathname: path,
                  query:
                    path.startsWith("/admin") &&
                      !excludedPaths.includes(path)
                      ? { city, days }
                      : {},
                }
                : path
            }
            shallow
          >
            <div
              className={`${styles.menuItem} ${isActive(path) ? styles.active : ""
                }`}
            >

              <div className={`${styles.iconWrapper}   ${isActive(path) ? "bg-languageBackground" : ""
                }`}>
                <Image
                  src={isActive(path) ? icon : iconBlack}
                  width={20}
                  height={20}
                  alt="menu-icon"
                />

                {count?.[label] &&
                  label !== "Leads" &&
                  label !== "All Users" &&
                  label !== "Direct Leads" && (
                    <div className={styles.badge}>
                      <CustomTabLabel count={count[label]} />
                    </div>
                  )}
              </div>


              <div className={styles.labelWrapper}>
                {preIconText && (
                  <p
                    className={`${styles.preIconText} ${isActive(path) ? styles.activeText : ""
                      }`}
                  >
                    {preIconText}
                  </p>
                )}

                {labelIcon && (
                  <Image
                    src={labelIcon}
                    width={14}
                    height={10}
                    alt="label-icon"
                    className={styles.labelIcon}
                  />
                )}

                <p
                  className={`${styles.label} ${isActive(path) ? styles.activeText : ""
                    }`}
                >
                  {label}
                </p>

                {(label === "Leads" ||
                  label === "All Users" ||
                  label === "Direct Leads") &&
                  count?.[label] && (
                    <span className={styles.count}>
                      ({numberFormatter(count[label])})
                    </span>
                  )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideDashboard;
