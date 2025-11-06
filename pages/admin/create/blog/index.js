'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

import OpenGraphPreviewCard from '@/components/Admin/Blogs/OpenGraphPreviewCard'
import Tags from '@/components/Admin/Blogs/Tags'

import BackgroundImage from '../../../../assets/NonLoggedUserImages/backgroundImage.svg'
import 'react-quill/dist/quill.snow.css'
import styles from './quill.module.css'

const ReactQuill = dynamic(
  () => import('react-quill').then((mod) => mod.default),
  { ssr: false, loading: () => <p>Loading editor...</p> }
)

export default function BlogPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    ogTitle: '',
    tags: [],
    body: '',
  })
  const [slugError, setSlugError] = useState('')
  const [openGraphImage, setOpenGraphImage] = useState([])
  const [featuredImage, setFeaturedImage] = useState([])

  const router = useRouter()

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

    if (type === 'openGraph') {
      setOpenGraphImage([file])
    } else if (type === 'featured') {
      setFeaturedImage([file])
    }
  }

  const handleRemoveImage = (type) => {
    if (type === 'openGraph') {
      setOpenGraphImage([])
    } else if (type === 'featured') {
      setFeaturedImage([])
    }
  }

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required'
    if (!formData.slug.trim()) return 'Slug is required'
    const slugPattern = /^[a-z0-9-]+$/;
    if (!slugPattern.test(formData.slug)) {
      return 'Slug can only contain lowercase letters, numbers, and hyphens.'
    }

    if (!formData.metaTitle.trim()) return 'Meta Title is required'
    if (!formData.metaDescription.trim()) return 'Meta Description is required'
    const MAX_META_DESCRIPTION_LENGTH = 170
    if (formData.metaDescription.length > MAX_META_DESCRIPTION_LENGTH) {
      return `Meta Description length must be less than or equal to ${MAX_META_DESCRIPTION_LENGTH} characters long`
    }

    if (!formData.ogTitle.trim()) return 'Open Graph Title is required'
    if (!formData.body.trim()) return 'Body is required'
    if (formData.tags.length === 0) return 'At least one tag is required'
    if (featuredImage.length === 0) return 'Featured Image is required'
    if (openGraphImage.length === 0) return 'Open Graph Image is required'
    return null
  }

  const handlePublish = async () => {
    const errorMsg = validateForm()
    if (errorMsg) {
      toast.error(errorMsg)
      return
    }

    try {
      const payload = new FormData()

      payload.append('title', formData.title)
      payload.append('slug', formData.slug)
      payload.append('body', formData.body)
      payload.append('metaTitle', formData.metaTitle)
      payload.append('metaDescription', formData.metaDescription)
      payload.append('ogTitle', formData.ogTitle)

      formData.tags.forEach((tag) => {
        payload.append('tags[]', tag)
      })

      payload.append('openGraphImage', openGraphImage[0])
      payload.append('featuredImage', featuredImage[0])

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}admin/create/blog`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (response.status === 200) {
        toast.success('Blog added successfully!')
        router.push('/admin/website-moderation')
      } else {
        toast.error(response.data.message || 'Failed to publish blog')
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message)
      toast.error(error.response?.data?.message || 'Server error')
    }
  }

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
      <div className="bg-white mx-auto w-[93%] lg:w-[93%] py-9 px-6 lg:px-9 overflow-hidden rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Create New Blog
        </h1>

        <div className="mb-6">
          <label
            htmlFor="Title"
            className="block mb-2 font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border-b border-gray-300 text-2xl font-semibold pb-2 focus:outline-none focus:border-blue-500 transition"
            required
          />
          <p className="text-sm text-gray-400 mt-1">
            170 characters from the start of the blog content will be used as
            default meta description
          </p>
        </div>

        <Tags
          defaultSelectedValues={formData.tags}
          setTagValues={handleTagChange}
          placeholderText="Add tags..."
        />

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Upload Featured Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'featured')}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          {featuredImage.length > 0 && (
            <>
              <p className="text-sm text-gray-400 mt-1">
                Selected: {featuredImage[0].name}
              </p>
              <button
                onClick={() => handleRemoveImage('featured')}
                className="text-sm text-red-500 mt-1 hover:underline"
              >
                Remove Image
              </button>
            </>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Upload Open Graph Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'openGraph')}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          {openGraphImage.length > 0 && (
            <>
              <p className="text-sm text-gray-400 mt-1">
                Selected: {openGraphImage[0].name}
              </p>
              <button
                onClick={() => handleRemoveImage('openGraph')}
                className="text-sm text-red-500 mt-1 hover:underline"
              >
                Remove Image
              </button>
            </>
          )}
        </div>

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

        <div className="mb-6">
          <label
            htmlFor="metaDescription"
            className="block mb-2 font-medium text-gray-700"
          >
            Meta Description
          </label>
          <textarea
            placeholder="Meta Description"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>

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
            required
          />
          {slugError && (
            <p className="text-sm text-red-500 mt-1">{slugError}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="metaTitle"
            className="block mb-2 font-medium text-gray-700"
          >
            Meta Title (default is blog title)
          </label>
          <input
            type="text"
            placeholder="Meta Title (default is blog title)"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            className="w-full border-b border-gray-300 text-lg pb-2 focus:outline-none focus:border-blue-500 transition"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="ogTitle"
            className="block mb-2 font-medium text-gray-700"
          >
            Open Graph Title (default is blog title)
          </label>
          <input
            type="text"
            placeholder="Open Graph Title (default is blog title)"
            name="ogTitle"
            value={formData.ogTitle}
            onChange={handleChange}
            className="w-full border-b border-gray-300 text-lg pb-2 focus:outline-none focus:border-blue-500 transition"
            required
          />
        </div>

        {(formData.title ||
          formData.metaDescription ||
          openGraphImage.length > 0 ||
          featuredImage.length > 0) && (
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
                openGraphImage.length > 0
                  ? URL.createObjectURL(openGraphImage[0])
                  : featuredImage.length > 0
                    ? URL.createObjectURL(featuredImage[0])
                    : '/placeholder.jpg'
              }
              websiteUrl={`${
                process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
              }/blogs/${formData.slug || 'preview'}`}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-end mt-8">
          <button
            onClick={handlePublish}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Publish
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
