import React, { useState, useEffect } from "react";
import { TagsInput } from "react-tag-input-component";

const Tags = ({ defaultSelectedValues = [], setTagValues, placeholderText = '' }) => {
  const [selected, setSelected] = useState(defaultSelectedValues);
  useEffect(() => {
    setSelected(defaultSelectedValues);
  }, [defaultSelectedValues]);
  const handleTagsChange = (tags) => {
    setSelected(tags);
    if (setTagValues) {
      setTagValues(tags);
    }
  };
  return (
    <div className="my-4">
      <h5 className="text-grayText">Add Tags</h5>
      <TagsInput
        value={selected}
        onChange={handleTagsChange}
        placeHolder={placeholderText}
      />
    </div>
  );
};
export default Tags;