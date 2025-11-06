import React from 'react'
import useWindowWidth from '@/context/useWindowWidth'

const VideoSection = ({ projectVideo }) => {
  const windowWidth = useWindowWidth()
  return (
    <div>
      {windowWidth >= 1317 ? (
        <div className="py-5 px-7 rounded-lg w-[100%] h-fit">
          <video
            controls
            src={projectVideo?.url}
            alt="Default Image"
            style={{
              height: '450px',
              margin: 'auto',
              borderRadius: '4px',
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-1 mt-2 mb-2">
          <video
            controls
            src={projectVideo?.url}
            alt="Default Image"
            style={{
              height: '40vw',
              borderRadius: '4px',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default VideoSection
