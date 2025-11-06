import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import 'react-quill/dist/quill.snow.css'

import Loading from '@/pages/loading'
import {
  GENERATE_PROPERTY_DESCRIPTION,
  LOADING_EDITOR,
  POST_TEXT,
  SNOW,
} from '@/text'
import { makeApiRequest } from '@/utils/utils'

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />
  },
  {
    ssr: false,
    loading: () => <p>{LOADING_EDITOR}</p>,
  }
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
    ['link', 'image'],
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
  'image',
]

const Loadings = () => {
  <Loading />
}

const AdvancedEditor = ({
  value,
  onChange,
  DATA,
  setIsAuto,
  isautoGenerate = false,
}) => {
  const [generatedDescription, setGeneratedDescription] = useState('')
  const [isGenerated, setIsGenerated] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  const handleEditorChange = (content, delta, source, editor) => {
    if (editor.getText().trim() === '') {
      onChange('')
    } else {
      onChange(content)
    }
  }

  const generateDescription = async () => {
    setIsLoad(true)
    try {
      const response = await makeApiRequest(
        POST_TEXT,
        '/property/generate-description',
        {
          DATA,
        }
      )
      const description = response.data.description 
      console.log("description",description)
      setGeneratedDescription(description)
      setIsAuto(true)
      onChange(description)
      setIsGenerated(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoad(false)
    }
  }

  return (
    <div className="h-fit max-w-[900px]">
      {isautoGenerate && (
        <button
          className={`mb-2 bg-primary rounded-full text-white text-opacity-1 ${isGenerated ? 'w-[100px]' : ''} px-4 py-2 ${isLoad ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={generateDescription}
          disabled={isLoad}
        >
          {isLoad
            ? 'Loading...'
            : isGenerated
              ? 'Regenerate'
              : GENERATE_PROPERTY_DESCRIPTION}
        </button>
      )}
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme={SNOW}
        value={value}
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default AdvancedEditor
