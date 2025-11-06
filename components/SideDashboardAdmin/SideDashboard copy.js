import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CustomTabLabel, excludedPaths, numberFormatter } from '@/utils/utils'

const SideDashboard = ({ arrayMenu, count }) => {
  const router = useRouter()
  const currentPage = router.query.page

  const isActive = (path) => {
    if (path.includes('?')) {
      const basePath = path.split('?')[0]
      return router.pathname.replace('[page]', currentPage) === basePath
    } else {
      return router.pathname.replace('[page]', currentPage) === path
    }
  }

  const { city, days } = router.query

  return (
    <div className="bg-white min-w-[220px] w-fit max-w-[260px] rounded-lg border border-[#931602] flex justify-start  max-[1024px]:hidden py-20 ">
      <div>
        {arrayMenu.map(({ icon, label, path, labelIcon, preIconText }) => (
          <Link
            key={path}
            href={
              path.startsWith('/admin')
                ? {
                    pathname: path,
                    query:
                      path.startsWith('/admin') && !excludedPaths.includes(path)
                        ? { city, days }
                        : {},
                  }
                : path
            }
            shallow
          >
            <div className="my-2 py-1 flex items-center px-3">
              <div className="rounded-full border border-[#931602] p-2 relative flex items-center justify-center">
                <Image src={icon} width={20} height={20} alt="menu-icon" />
                {count?.[label] &&
                  label !== 'Leads' &&
                  label !== 'All Users' &&
                  label !== 'Direct Leads' && (
                    <div className="absolute -top-[6px] -right-1">
                      <CustomTabLabel count={count[label]} />
                    </div>
                  )}
              </div>

              <div className="flex items-center">
                {labelIcon && (
                  <div className="flex items-center">
                    {preIconText && (
                      <div
                        className={`ml-2 ${
                          isActive(path)
                            ? 'text-[#931602] font-bold'
                            : 'text-[#555] font-normal'
                        }`}
                      >
                        <p
                          className={
                            isActive(path)
                              ? 'text-[#931602] font-bold'
                              : 'text-[#555] font-normal'
                          }
                        >
                          {preIconText}
                        </p>
                      </div>
                    )}

                    {labelIcon && (
                      <div className="ml-2">
                        <Image
                          src={labelIcon}
                          width={14}
                          height={10}
                          alt="menu-icon"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`flex items-center ml-2 ${
                    isActive(path)
                      ? 'text-[#931602] font-bold'
                      : 'text-[#555] font-normal'
                  }`}
                >
                  <p
                    className={
                      isActive(path)
                        ? 'text-secondary-color font-bold'
                        : 'text-heading-color font-normal'
                    }
                  >
                    {label}
                  </p>
                  {(label === 'Leads' ||
                    label === 'All Users' ||
                    label === 'Direct Leads') &&
                    count?.[label] && (
                      <span className="ml-1">
                        ({numberFormatter(count[label])})
                      </span>
                    )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideDashboard
