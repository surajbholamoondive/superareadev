import React from "react";
import LikeShareButtons from "@/components/LikeShare/Component";
import LikeUnlike from "@/components/LikeShare/LikeUnlike";
// import { useWindowDimensions } from 'next/head';

const MyComponent = ({id}) => {
  return (
    
      <div className="flex gap-2 justify-end mt-3">
        <div className="flex gap-2  text-SearchResultText text-sm items-center">
          <div className="me-3">
          </div>
          <LikeUnlike id={id}/>
          <LikeShareButtons id={id}/>
          

        </div>
      </div>
  );
};

export default MyComponent;
