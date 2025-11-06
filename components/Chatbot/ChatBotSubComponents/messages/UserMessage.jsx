import React from 'react';
function CustomMarkdownMessage({ content }) {
  if (!content) return null;
  const paragraphs = content.split('\n');
  return (
    <div
      className={`!list-disc  !whitespace-normal flex flex-col gap-2 [&_ul]:pl-4 [&_ul]:py-2 [&_ul]:list-disc [&_p]:py-2 [&_p]:text-[16px] max-md:[&_p]:text-[0.9rem] [&_h1]:pb-2 [&_h2]:pb-2 [&_li]:py-1 [&_li]:text-[16px] max-md:[&_li]:text-[0.9rem] [&_a]:text-blue-600 [&_a]:text-[16px] max-md:[&_a]:text-[0.9rem]`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default CustomMarkdownMessage;