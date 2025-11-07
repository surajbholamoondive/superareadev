import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { HOME_PAGE_TEXT } from '@/textV2';
const noida = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244383/assets/Images/OurLocation/NOIDA.png";
const delhi = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244384/assets/Images/OurLocation/Delhi.jpg";
const mumbai = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244386/assets/Images/OurLocation/Mumbai.jpg";
const kolkata = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244385/assets/Images/OurLocation/KOLKATA.png";
const hyderabad = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244385/assets/Images/OurLocation/Hyderabadd.jpg";
const lucknow = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244386/assets/Images/OurLocation/Lucknow.jpg";
const gurugram = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244385/assets/Images/OurLocation/GURUGRAM.png";
const chennai = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244384/assets/Images/OurLocation/CHENNAI.png";
const pune = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244386/assets/Images/OurLocation/Pune.png";
const ahmedabad = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244384/assets/Images/OurLocation/AHEMDABAD.png";
const chandigarh = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244383/assets/Images/OurLocation/CHANDIGARH.png";
const goa = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244385/assets/Images/OurLocation/GOA.png";
const vijayawada = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244387/assets/Images/OurLocation/VIJAYAWADA.png";
const vizag = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244387/assets/Images/OurLocation/VIZAG.png";
const indore = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244385/assets/Images/OurLocation/INDORE.png";
const mohali = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244386/assets/Images/OurLocation/MOHALI.png";
const kochi = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244385/assets/Images/OurLocation/KOCHI.png";
const bengaluru = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244383/assets/Images/OurLocation/BENGALURU.png";

// HomePage Image
const mapBackground = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244381/assets/Images/HomePage/mapBackground.png";
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const { text, routes } = HOME_PAGE_TEXT;

const CityGrid = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);


  const cityImages = {
    noida,
    delhi,
    lucknow,
    bengaluru,
    chennai,
    mumbai,
    kolkata,
    hyderabad,
    pune,
    ahmedabad,
    chandigarh,
    goa,
    vijayawada,
    vizag,
    indore,
    gurugram,
    mohali,
    kochi,

  };

  useEffect(() => {
    const cityList = ["noida", "delhi", "mumbai", "chennai", "bengaluru", "gurugram", "mumbai", "kolkata", "pune", "ahmedabad", "chandigarh", "goa", "hyderabad", "lucknow", "vijayawada", "vizag",
      "indore", "mohali", "kochi",
    ];

    const fetchCities = async () => {
      try {
        const response = await axios.post('/user/city-list', { cities: cityList });
        const data = response?.data?.result;

        if (response.status === 200) {
          const formattedCities = Object.keys(data).map(city => ({
            name: city.charAt(0).toUpperCase() + city.slice(1),
            image: cityImages[city.toLowerCase()],
            count: data[city].city,
          })).sort((a, b) => b.count - a.count);
          setCities(formattedCities);
        }
      } catch (error) {
        console.error('Failed to fetch city listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleClick = (city) => {
    router.push({
      pathname: routes.searchResultPageRoute,
      query: { city }
    });
  };

  if (loading) return <div>Loading...</div>;

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const cityChunks = chunkArray(cities, 6);
  return (
    <div
      className="py-8 w-[95%] lg:w-[93%] m-auto custom-section"
      style={{
        backgroundImage: `url(${mapBackground.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="font-thin text-center text-primary text-[2.5rem] pb-[22px]">
        {text.explore} <span className="font-bold text-[2.5rem]">{text.cities}</span>
      </h2>


      {/* Mobile Carousel */}
      <div className="block lg:hidden ">
  <Swiper
  modules={[Pagination]}
  pagination={{ clickable: true }}
  centeredSlides={false}  
  spaceBetween={0}         
  slidesPerView={1}       
  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
>

          {cities.map((city, index) => (
            <SwiperSlide key={city.name}>
              <div
                className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                onClick={() => handleClick(city.name)}
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  width={1000}
                  height={1000}
                  className="w-full h-[400px] object-cover"
                />
                {activeIndex === index && (
                  <div className="absolute bottom-0 w-full h-[120px] flex flex-col items-center justify-end pb-4 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-2xl text-white font-bold uppercase">{city.name}</h3>
                    {city.count > 0 && (
                      <p className="text-lg text-white font-medium">
                        {city.count} {city.count > 1 ? "Properties" : "Property"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
  .swiper-pagination {
    position: relative !important;
    bottom: 0 !important;
    margin-top: 10px;
    text-align: center;
  }

  .swiper-pagination-bullet {
    background: #cccccc !important; 
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: var(--secondary-color) !important; /* using global color */
  }


  :root {
    --secondary-color: #931602; 
  }

  * {
    scrollbar-color: var(--secondary-color) transparent;
    scrollbar-width: thin;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--secondary-color);
    border-radius: 10px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }
`}</style>

      </div>


      <div className="hidden lg:block relative p-10">

        <div className="absolute top-[-2rem] right-10 flex gap-3 z-10">
          <button className="swiper-button-prev-desktop bg-gray-300 p-2 rounded-full text-black shadow-md hover:bg-[var(--secondary-color)] hover:text-white transition">
            <ChevronLeft size={20} />
          </button>
          <button className="swiper-button-next-desktop bg-gray-300 p-2 rounded-full text-black shadow-md hover:bg-[var(--secondary-color)] hover:text-white transition">
            <ChevronRight size={20} />
          </button>
        </div>


        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-desktop",
            prevEl: ".swiper-button-prev-desktop",
          }}
          slidesPerView={1} // one grid per slide
          loop={true}
        >
          {cityChunks?.map((chunk, chunkIndex) => (
            <SwiperSlide key={chunkIndex}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[260px]">
                {chunk.map((city, index) => (
                  <div
                    key={city.name}
                    className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group ${index === 0 || index === 5
                      ? "lg:col-span-2 lg:row-span-1"
                      : "col-span-1 row-span-1"
                      }`}
                    onClick={() => handleClick(city.name)}
                  >
                    <Image
                      src={city.image}
                      alt={city.name}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-all duration-300 flex flex-col items-center justify-end"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(217, 217, 217, 0) 0%, #931602 81%)",
                      }}
                    >
                      <div className="mb-4">
                        <h3 className="text-4xl text-white font-black uppercase">
                          {city.name}
                        </h3>
                        {city.count > 0 && (
                          <p className="text-xl text-white mt-2 font-black">
                            {city.count}{" "}
                            {city.count > 1
                              ? text.propertiesText
                              : text.propertyText}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

export default CityGrid;
