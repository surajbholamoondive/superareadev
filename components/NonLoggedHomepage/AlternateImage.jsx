import React from 'react'
import Image from 'next/image'

const AlternateImage = ({ data }) => {
  return (
    <section className="flex flex-col gap-10">
      {data.map((item, index) => (
        <>
          <div
            key={index}
            className={`flex max-md:flex-col my-4 items-center justify-evenly ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-y-8 w-[100%] px-0 md:px-14`}
          >
            <h2 className="block md:hidden font-semibold text-primary text-center mb-2">
              {item.heading}
            </h2>
            <Image
              src={item.image}
              alt={item.alt}
              width={700}
              height={700}
              className="w-[300px]"
            />
            <div className="md:w-[45%]">
              <div className="flex gap-x-4 items-center mb-2">
                <h2 className="hidden md:block font-semibold text-primary">
                  {item.heading}
                </h2>
              </div>
              <ul className="list-disc pl-[15px] m-0 leading-7">
                {item?.descriptionList.map((listItem, index) => (
                  <li key={index}>{listItem}</li>
                ))}
              </ul>
            </div>
          </div>
          {index !== data.length - 1 && (
            <hr className="h-[1px] bg-primary border-0" />
          )}
        </>
      ))}
    </section>
  )
}

export default AlternateImage
