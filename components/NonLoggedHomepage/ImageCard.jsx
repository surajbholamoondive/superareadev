import Image from 'next/image';

const ImageCard = ({ data }) => {
  return (
    <div className="flex max-md:flex-col max-md:gap-10 my-10 px-5 relative ">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center text-center gap-4 max-md:gap-10 md:w-[30%] relative md:px-1">
          <div className='flex justify-center md:items-center'>
            <Image src={item.image} alt={item.alt} width={50} height={50} />
          </div>
          <div className='md:w-[98%]'>
            <h3 className="font-semibold text-primary">{item.heading}</h3>
            <p className="text-featureText md:leading-6">{item.description}</p>
          </div>
         {index < data.length - 1 && (
            <div className="hidden md:block h-52 w-[0.5px] bg-primary ml-auto absolute right-0 top-0"></div>
          )} 
        </div>
      ))}
    </div>
  );
};

export default ImageCard;