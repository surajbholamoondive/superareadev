'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/auth'
import axios from 'axios'
import { NextSeo } from 'next-seo'

import Arrow from '../../assets/Blogs/Arrow.svg'
import Search from '../../assets/Blogs/Search.svg'
import BackgroundImage from '../../assets/NonLoggedUserImages/backgroundImage.svg'
import { useRouter } from 'next/router'
import 'swiper/css/pagination'

import Loading from '@/pages/loading'

// BreadcrumbsStructuredData component for SEO
const BreadcrumbsStructuredData = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/blogs`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentBlogs, setRecentBlogs] = useState([])
  const [blogCards, setBlogCards] = useState([])
  const [filteredBlogCards, setFilteredBlogCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [auth] = useAuth()
 const router = useRouter()
  const token = auth?.token
  useEffect(() => {
      if (!token) {
      router.push('/login') // Redirect to login if no token
      return
    }
    const fetchBlogs = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}admin/blog`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (
          response.data &&
          response.data.blog &&
          Array.isArray(response.data.blog)
        ) {
          const blogs = response.data.blog.map((blog) => ({
            ...blog,
            slug:
              blog.slug ||
              blog.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') ||
              'untitled',
            formattedDate: blog.createdAt
              ? new Date(blog.createdAt)
                  .toLocaleString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                  .replace(/,\s/, ' • ')
                  .replace(' at', '')
              : 'Date not available',
          }))
          setRecentBlogs(blogs.slice(-1))
          setBlogCards(blogs.slice(0))
          setFilteredBlogCards(blogs.slice(0))
        } else {
          throw new Error('No valid blog data received')
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setError('Failed to load blogs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [token])

  useEffect(() => {
    if (!searchQuery) {
      setFilteredBlogCards(blogCards)
      return
    }

    const regex = new RegExp(searchQuery, 'i')
    const filteredCards = blogCards.filter(
      (blog) =>
        regex.test(blog.title || '') ||
        (blog.metaDescription && regex.test(blog.metaDescription))
    )

    setFilteredBlogCards(filteredCards)
  }, [searchQuery, blogCards])

  const pageTitle = 'Resources and Insights | Our Blogs'
  const pageDescription =
    'Explore the latest industry news, interviews, technologies, and resources on our blog. Stay informed with expert insights and updates.'
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/blogs`
  const ogImage =
    recentBlogs[0]?.featuredImage?.[0] ||
    `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/default-blog-image.jpg`

  const blogJsonLd = [...recentBlogs, ...filteredBlogCards].map((blog) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${pageUrl}/${blog.slug}/${blog._id}`,
    },
    headline: blog.title || 'Untitled Blog',
    image:
      blog.featuredImage?.[0] ||
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/default-blog-image.jpg`,
    datePublished: blog.createdAt
      ? new Date(blog.createdAt).toISOString()
      : new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Author Name',
    },
    description:
      blog.metaDescription ||
      (blog.body
        ? blog.body.slice(0, 170)
        : 'Read more about this topic on our blog.'),
    keywords: blog.tags || [],
  }))

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <section
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          paddingBottom: '20px',
          paddingTop: '20px',
        }}
      >
        <div className="custom-section mx-auto p-4 bg-white w-full sm:w-[95%] lg:w-[93%] py-9 px-4 sm:px-6 lg:px-24 overflow-hidden rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-primary">
            Blogs
          </h1>
          <p className="text-center text-red-600 text-sm sm:text-base">
            {error}
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={pageUrl}
        additionalMetaTags={[
          {
            name: 'robots',
            content: 'index, follow',
          },
          {
            name: 'googlebot',
            content: 'index, follow',
          },
          {
            name: 'keywords',
            content:
              'real estate blog, property insights, industry news, real estate technology',
          },
        ]}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: pageUrl,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ],
          type: 'website',
        }}
      />
      <BreadcrumbsStructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <section
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          paddingBottom: '20px',
          paddingTop: '20px',
        }}
      >
        <div className="custom-section mx-auto p-4 bg-white w-full sm:w-[95%] lg:w-[93%] py-9 px-4 sm:px-6 lg:px-24 overflow-hidden rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-primary">
            Blogs
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
            Resources and Insights
          </h2>
          <p className="text-center mb-6 text-primary text-sm sm:text-base">
            The latest industry news, interviews, technologies, and resources.
          </p>

          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Image
                  src={Search}
                  alt="Search icon"
                  width={20}
                  height={20}
                  className="h-5 w-5 text-gray-400"
                />
              </div>
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="mb-12 sm:mb-20 max-w-7xl mx-auto recent-blogs-container px-0 sm:px-0 lg:px-0">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div key={blog._id} className="w-full">
                  <div className="text-primary py-6 sm:py-8 font-semibold text-sm sm:text-base flex justify-start">
                    Recent Blogs
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <div className="w-full sm:w-[45%]">
                      <Image
                        src={blog.featuredImage?.[0] || '/placeholder.jpg'}
                        alt={blog.title || 'Blog image'}
                        width={400}
                        height={300}
                        className="object-cover w-full h-[200px] sm:h-[250px] lg:h-[300px] rounded-3xl"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 p-4 flex flex-col justify-between">
                      <div>
                        <p className="font-semibold text-primary text-sm sm:text-base">
                          {blog.formattedDate}
                        </p>
                        <Link href={`/blogs/${blog.slug}/${blog._id}`}>
                          <h2 className="text-2xl sm:text-3xl font-semibold mt-2 hover:text-primary cursor-pointer">
                            {blog.title || 'Untitled Blog'}
                          </h2>
                        </Link>
                        <p
                          className="mt-2 font-normal text-xs sm:text-sm text-[#667085] line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: blog.body || 'No content available.',
                          }}
                        />
                      </div>
                      <Link href={`/blogs/${blog.slug}/${blog._id}`}>
                        <button className="mt-4 bg-white text-primary sm:bg-primary  sm:text-white  px-2 sm:px-8 py-1 rounded-full hover:bg-opacity-90 transition duration-200 max-w-[160px] text-sm sm:text-base">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm sm:text-base text-center text-gray-600">
                No recent blogs available at the moment.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
            {filteredBlogCards.length > 0 ? (
              filteredBlogCards.map((card) => (
                <div
                  key={card._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[460px] max-w-[320px] mx-auto"
                >
                  <div className="p-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={card.featuredImage?.[0] || '/placeholder.jpg'}
                        alt={card.title || 'Blog image'}
                        width={400}
                        height={200}
                        className="w-full h-52 object-cover"
                      />
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex flex-col justify-between flex-grow">
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-primary">
                          {card.formattedDate}
                        </p>
                        <Link href={`/blogs/${card.slug}/${card._id}`}>
                          <Image
                            src={Arrow}
                            alt="Arrow icon"
                            width={20}
                            height={20}
                            className="h-5 w-5 ml-2"
                          />
                        </Link>
                      </div>
                      <Link href={`/blogs/${card.slug}/${card._id}`}>
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer transition-colors mb-3 leading-tight">
                          {card.title || 'Untitled Blog'}
                        </h3>
                      </Link>
                      <p
                        className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: card.body || 'No content available.',
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <Link href={`/blogs/${card.slug}/${card._id}`}>
                        <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-200 text-sm font-medium">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm sm:text-base col-span-full text-center text-gray-600">
                {searchQuery
                  ? `No blogs found for "${searchQuery}".`
                  : 'No additional blogs available at the moment.'}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
