'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

import OpenGraphPreviewCard from '@/components/Admin/Blogs/OpenGraphPreviewCard'
import Tags from '@/components/Admin/Blogs/Tags'

import BackgroundImage from '../../../../assets/NonLoggedUserImages/backgroundImage.svg'
import 'react-quill/dist/quill.snow.css'
import styles from './quill.module.css'

// Dynamic import for ReactQuill for SSR safety
const ReactQuill = dynamic(
  () => import('react-quill').then((mod) => mod.default),
  { ssr: false, loading: () => <p>Loading editor...</p> }
)

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
]

export default function EditBlogPage() {
  const router = useRouter()
  const { page } = router.query // blog _id

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    ogTitle: '',
    tags: [],
    body: '',
  })

  const [featuredImage, setFeaturedImage] = useState(null)
  const [openGraphImage, setOpenGraphImage] = useState(null)

  const [slugError, setSlugError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // --- Fetch existing blog ---
  useEffect(() => {
    if (!page) return
    const fetchBlog = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}admin/blog/${page}`
        )
        if (data.responseCode === 200) {
          const blog = data.blog
          setFormData({
            title: blog.title || '',
            slug: blog.slug || '',
            metaTitle: blog.metaTitle || '',
            metaDescription: blog.metaDescription || '',
            ogTitle: blog.ogTitle || '',
            tags: blog.tags || [],
            body: blog.body || '',
          })
          setFeaturedImage(blog.featuredImage?.[0] || null)
          setOpenGraphImage(blog.openGraphImage?.[0] || null)
        } else {
          toast.error('Failed to fetch blog data')
        }
      } catch (err) {
        console.error(err)
        toast.error('Error fetching blog data')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlog()
  }, [page])

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'slug') {
      const slugPattern = /^[a-z0-9-]*$/
      if (!slugPattern.test(value)) {
        setSlugError(
          'Slug can only contain lowercase letters, numbers, and hyphens.'
        )
      } else {
        setSlugError('')
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, body: content }))
  }

  const handleTagChange = (tags) => {
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (type === 'openGraph') setOpenGraphImage(file)
    else if (type === 'featured') setFeaturedImage(file)
  }

  const handleRemoveImage = (type) => {
    if (type === 'openGraph') setOpenGraphImage(null)
    else if (type === 'featured') setFeaturedImage(null)
  }

  // --- Validation ---
  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required'
    if (!formData.slug.trim()) return 'Slug is required'
    const slugPattern = /^[a-z0-9-]+$/
    if (!slugPattern.test(formData.slug))
      return 'Slug can only contain lowercase letters, numbers, and hyphens.'
    if (!formData.metaTitle.trim()) return 'Meta Title is required'
    if (!formData.metaDescription.trim()) return 'Meta Description is required'
    if (formData.metaDescription.length > 170)
      return 'Meta Description must be ≤ 170 characters'
    if (!formData.ogTitle.trim()) return 'Open Graph Title is required'
    if (!formData.body.trim()) return 'Body is required'
    if (!formData.tags.length) return 'At least one tag is required'
    if (!featuredImage) return 'Featured Image is required'
    if (!openGraphImage) return 'Open Graph Image is required'
    return null
  }

  const handleUpdate = async () => {
    const errorMsg = validateForm()
    if (errorMsg) {
      toast.error(errorMsg)
      return
    }

    try {
      const payload = new FormData()
      payload.append('title', formData.title)
      payload.append('slug', formData.slug)
      payload.append('metaTitle', formData.metaTitle)
      payload.append('metaDescription', formData.metaDescription)
      payload.append('ogTitle', formData.ogTitle)
      payload.append('body', formData.body)
      formData.tags.forEach((tag) => payload.append('tags[]', tag))

      if (featuredImage instanceof File)
        payload.append('featuredImage', featuredImage)
      if (openGraphImage instanceof File)
        payload.append('openGraphImage', openGraphImage)

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}admin/blog/${page}`,
        payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      if (response.status === 200) {
        toast.success('Blog updated successfully!')
        router.push('/admin/website-moderation')
      } else {
        toast.error(response.data.message || 'Failed to update blog')
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Server error')
    }
  }

  const getImageUrl = (image) => {
    if (!image) return null
    return image instanceof File ? URL.createObjectURL(image) : image
  }

  if (isLoading)
    return (
      <section
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          padding: '20px 0',
        }}
      >
        <div className="bg-white mx-auto w-[93%] lg:w-[93%] py-9 px-6 lg:px-9 rounded-lg">
          <p className="text-center text-xl text-gray-600">
            Loading blog data...
          </p>
        </div>
      </section>
    )

  return (
    <section
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        padding: '20px 0',
      }}
    >
      <div className="bg-white mx-auto w-[93%] lg:w-[93%] py-9 px-6 lg:px-9 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Blog</h1>

        {/* Title */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border-b border-gray-300 text-2xl font-semibold pb-2 focus:outline-none focus:border-blue-500 transition"
          />
          <p className="text-sm text-gray-400 mt-1">
            170 characters from the start of the blog content will be used as
            default meta description
          </p>
        </div>

        {/* Tags */}
        <Tags
          defaultSelectedValues={formData.tags}
          setTagValues={handleTagChange}
          placeholderText="Add tags..."
        />

        {/* Featured Image */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Upload Featured Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'featured')}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {featuredImage && (
            <>
              <p className="text-sm text-gray-400 mt-1">
                Selected:{' '}
                {featuredImage instanceof File
                  ? featuredImage.name
                  : 'Existing Image'}
              </p>
              <button
                onClick={() => handleRemoveImage('featured')}
                className="text-sm text-red-500 mt-1 hover:underline"
              >
                Remove Image
              </button>
              <img
                src={getImageUrl(featuredImage)}
                alt="Featured Preview"
                className="mt-2 w-full max-w-sm h-auto object-cover rounded-md shadow-md"
              />
            </>
          )}
        </div>

        {/* Open Graph Image */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Upload Open Graph Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'openGraph')}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {openGraphImage && (
            <>
              <p className="text-sm text-gray-400 mt-1">
                Selected:{' '}
                {openGraphImage instanceof File
                  ? openGraphImage.name
                  : 'Existing Image'}
              </p>
              <button
                onClick={() => handleRemoveImage('openGraph')}
                className="text-sm text-red-500 mt-1 hover:underline"
              >
                Remove Image
              </button>
              <img
                src={getImageUrl(openGraphImage)}
                alt="Open Graph Preview"
                className="mt-2 w-full max-w-sm h-auto object-cover rounded-md shadow-md"
              />
            </>
          )}
        </div>

        {/* Body */}
        <div className="mb-8">
          <h5 className="text-gray-400 mb-2 text-sm">Start writing below</h5>
          <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
            <div className={styles.quillContainer}>
              <ReactQuill
                modules={modules}
                formats={formats}
                theme="snow"
                value={formData.body}
                onChange={handleEditorChange}
                className="text-[0.875rem]"
              />
            </div>
          </div>
        </div>

        {/* Meta Description */}
        <div className="mb-6">
          <textarea
            placeholder="Meta Description"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Slug */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Edit the URL (default is slugified title)
          </label>
          <input
            type="text"
            placeholder="www.example.com/blogs/..."
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border-b border-gray-300 text-lg pb-2 focus:outline-none focus:border-blue-500 transition"
          />
          {slugError && (
            <p className="text-sm text-red-500 mt-1">{slugError}</p>
          )}
        </div>

        {/* Meta Title */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Meta Title (default is blog title)"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            className="w-full border-b border-gray-300 text-lg pb-2 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* OG Title */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Open Graph Title (default is blog title)"
            name="ogTitle"
            value={formData.ogTitle}
            onChange={handleChange}
            className="w-full border-b border-gray-300 text-lg pb-2 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Preview */}
        {(formData.title ||
          formData.metaDescription ||
          openGraphImage ||
          featuredImage) && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Preview
            </h3>
            <OpenGraphPreviewCard
              title={formData.ogTitle || formData.title}
              description={
                formData.metaDescription ||
                (formData.body
                  ? formData.body.replace(/<[^>]+>/g, '').slice(0, 170)
                  : '')
              }
              image={
                getImageUrl(openGraphImage) ||
                getImageUrl(featuredImage) ||
                '/placeholder.jpg'
              }
              websiteUrl={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/blogs/${formData.slug || 'preview'}`}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-end mt-8">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Update Blog
          </button>
          <Link
            href="/admin/website-moderation"
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition font-medium"
          >
            Back
          </Link>
        </div>
      </div>
    </section>
  )
}
