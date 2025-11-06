'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/auth';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import BackgroundImage from '../../../assets/NonLoggedUserImages/backgroundImage.svg';
import Loading from '@/pages/loading';

const BreadcrumbsStructuredData = ({ blog }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.example.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: 'https://www.example.com/blogs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `https://www.example.com/blogs/${blog.slug}/${blog._id}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default function SingleBlog() {
  const router = useRouter();
  const { slug, id } = router.query;
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [blogResponse, recentBlogsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API}admin/blog/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API}admin/blog`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

       
        if (blogResponse.data.responseCode === 200 && blogResponse.data.blog) {
          const formattedBlog = {
            ...blogResponse.data.blog,
            slug:
              blogResponse.data.blog.slug ||
              blogResponse.data.blog.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') ||
              'untitled',
            formattedDate: blogResponse.data.blog.createdAt
              ? new Date(blogResponse.data.blog.createdAt).toLocaleString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  timeZone: 'Asia/Kolkata',
                })
                  .replace(/,\s/, ' • ')
                  .replace(' at', '')
              : 'Date not available',
          };
          setBlog(formattedBlog);
        } else {
          throw new Error('Blog not found or server error');
        }

       
        if (
          recentBlogsResponse.data.responseCode === 200 &&
          recentBlogsResponse.data.blog
        ) {
          const sortedBlogs = recentBlogsResponse.data.blog
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4)
            .map((blog) => ({
              title: blog.title || 'Untitled Blog',
              slug:
                blog.slug ||
                blog.title
                  ?.toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '') ||
                'untitled',
              date: blog.createdAt
                ? new Date(blog.createdAt).toLocaleString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata',
                  })
                  .replace(/,\s/, ' • ')
                  .replace(' at', '')
                : 'Date not available',
              imageUrl:
                blog.featuredImage && blog.featuredImage[0]
                  ? blog.featuredImage[0]
                  : '/placeholder.jpg',
              link: `/blogs/${blog.slug}/${blog._id}`,
            }));
          setRecentBlogs(sortedBlogs);
        } else {
          throw new Error('Failed to load recent blogs');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load blog or recent blogs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, token]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !blog) {
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
        <div className="custom-section mx-auto bg-white w-full sm:w-[95%] lg:w-[93%] max-w-7xl py-9 px-4 sm:px-6 lg:px-12 overflow-hidden rounded-lg">
          <p className="text-center text-red-600 text-sm sm:text-base">
            {error || 'No blogs available'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <NextSeo
        title={blog.title}
        description={
          blog.metaDescription ||
          (blog.body ? blog.body.slice(0, 170) : 'Read more about this topic on our blog.')
        }
        canonical={`https://www.example.com/blogs/${blog.slug}/${blog._id}`}
        openGraph={{
          title: blog.title,
          description:
            blog.metaDescription ||
            (blog.body ? blog.body.slice(0, 170) : 'Read more about this topic on our blog.'),
          url: `https://www.example.com/blogs/${blog.slug}/${blog._id}`,
          images: [
            {
              url: blog.featuredImage?.[0] || 'https://www.example.com/default-image.jpg',
              width: 1200,
              height: 630,
              alt: blog.title || 'Blog image',
            },
          ],
          type: 'article',
        }}
      />
      <BreadcrumbsStructuredData blog={blog} />
      <section
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          paddingBottom: '20px',
          paddingTop: '20px',
        }}
      >
        <section className="custom-section mx-auto bg-white w-full sm:w-[95%] lg:w-[93%] py-4 sm:py-6 md:py-9 px-3 sm:px-4 md:px-6 lg:px-12 overflow-hidden rounded-lg">
          <div className="px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
            <div className="mb-4 sm:mb-6 flex flex-col items-start">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-3 md:mb-4 leading-tight">
                {blog.title || 'Untitled Blog'}
              </h1>
              <p className="text-[10px] sm:text-xs text-primary mb-4 sm:mb-6 font-semibold">
                {blog.formattedDate}
              </p>
            </div>
            <div className="mb-6 sm:mb-8">
              <div className="relative w-full h-auto rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden">
                <Image
                  src={blog.featuredImage?.[0] || '/placeholder.jpg'}
                  alt={blog.title || 'Blog image'}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  style={{ 
                    maxHeight: '400px',
                    '@media (min-width: 640px)': { maxHeight: '600px' },
                    '@media (min-width: 1024px)': { maxHeight: '800px' }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
              <div className="w-full lg:w-[70%] xl:w-[75%] prose prose-sm sm:prose-base max-w-none text-gray-700">
                <div className="font-normal text-sm sm:text-base leading-relaxed">
                  {blog.body ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: blog.body }}
                      className="blog-content [&>h1]:text-xl [&>h1]:sm:text-2xl [&>h1]:md:text-3xl [&>h1]:mb-4
                                 [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:md:text-2xl [&>h2]:mb-3
                                 [&>h3]:text-base [&>h3]:sm:text-lg [&>h3]:md:text-xl [&>h3]:mb-2
                                 [&>p]:mb-4 [&>p]:text-sm [&>p]:sm:text-base
                                 [&>ul]:ml-4 [&>ul]:sm:ml-6 [&>ul]:mb-4
                                 [&>ol]:ml-4 [&>ol]:sm:ml-6 [&>ol]:mb-4
                                 [&>img]:w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:my-4"
                    />
                  ) : (
                    'No content available.'
                  )}
                </div>
              </div>

              <div className="w-full lg:w-[30%] xl:w-[25%] mt-8 lg:mt-0">
                <h2 className="text-xs sm:text-sm font-normal mb-3 sm:mb-4 text-[#42526E]">
                  RECENT BLOGS
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {recentBlogs.length > 0 ? (
                    recentBlogs.map((recentBlog, index) => (
                      <div
                        key={index}
                        className="flex items-start border-b-[1px] border-[#172B4D] pb-3 sm:pb-4 last:border-b-0"
                      >
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 mr-3 sm:mr-4">
                          <Image
                            src={recentBlog.imageUrl}
                            alt={recentBlog.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] sm:text-[9px] text-primary mb-1 font-semibold">
                            {recentBlog.date}
                          </p>
                          <Link
                            href={recentBlog.link}
                            className="text-[#172B4D] text-xs sm:text-sm font-medium block break-words hover:text-primary transition-colors line-clamp-3"
                          >
                            {recentBlog.title}
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-600">No blogs available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}