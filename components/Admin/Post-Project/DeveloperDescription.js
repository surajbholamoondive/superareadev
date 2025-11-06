import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
 
const QuillNoSSRWrapper = dynamic(
  () => import('react-quill').then((mod) => mod.default),
  { ssr: false, loading: () => <p>Loading editor...</p> }
);
 
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
};
 
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
];
 
const DeveloperDescriptionEditor = ({ developerDetail, handleDeveloperDetailChange }) => {
  const [value, setValue] = useState(developerDetail?.developerDescription || '');
 
  useEffect(() => {
    setValue(developerDetail?.developerDescription || '');
  }, [developerDetail?.developerDescription]);
 
  const handleEditorChange = (content) => {
    setValue(content);
    handleDeveloperDetailChange('developerDescription', content);
  };
 
  return (
    <div className="border border-primaryText rounded-md">
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={handleEditorChange}
        className="text-[0.875rem]"
      />
    </div>
  );
};
 
export default React.memo(DeveloperDescriptionEditor);
 