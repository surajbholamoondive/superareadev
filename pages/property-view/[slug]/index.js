import React from 'react';
import { makeApiRequest } from '@/utils/utils';
import axios from 'axios';
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo';
const SinglePropertyFullView = dynamic(() => import('@/components/SingleProperty'), { ssr: false })
import { GLOBALLY_COMMON_TEXT, SINGLE_PROPERTY_VIEW_TEXT } from '@/textV2';
import { useAuth } from '@/context/auth';
const { getType, viewText, propertyText } = GLOBALLY_COMMON_TEXT.text
const { text, routes } = SINGLE_PROPERTY_VIEW_TEXT
const getTokenOrIpFromCookie = (req) => {
  const token = req.cookies.token;
  const ip = req.cookies.ipaddress;
  return token ? token : ip;
};

export async function getServerSideProps({ query, req }) {
  try {
    let token = getTokenOrIpFromCookie(req);
    const cookiesToken = req.cookies.token;
    const ipAddress = req.cookies.ipaddress;
    const longitude = req.cookies.Longitude;
    const ipLatitude = req.cookies.ipLatitude;
    const ipLongitude = req.cookies.ipLongitude;
    const latitude = req.cookies.Latitude;
    const machineId = req.cookies.machineid;

    axios.defaults.headers.common['token'] = cookiesToken;
    axios.defaults.headers.common['ipaddress'] = ipAddress;
    axios.defaults.headers.common['latitude'] = latitude ? latitude : ipLatitude;
    axios.defaults.headers.common['longitude'] = longitude ? longitude : ipLongitude;
    axios.defaults.headers.common['machineid'] = machineId;

    const [propertyResponse] = await Promise.all([
      makeApiRequest(
        getType,
        `${process.env.NEXT_PUBLIC_API}${routes.viewPropertyRoute}/${query?.slug}`,
        token
      ),
    ]);

    const data = propertyResponse?.data?.result?.propertyResult;
    const alreadySeen = propertyResponse?.data?.result?.alreadySeen ?? '';
    const totalViews = propertyResponse?.data?.result?.viewersCount ?? '';

    if (data) {
      const {
        propertyDescription,
        propertyImages,
        propertyCoverImage = '',
        furnishingDetails = {},
        postedBy,
        amenities = {},
        propertyVideos,
        _id,
      } = data;

      const [propertyLatitude = '', propertyLongitude = ''] = data.coordinates ?? [];

      return {
        props: {
          latitude: propertyLatitude,
          longitude: propertyLongitude,
          propertyTitle: data.propertyTitle,
          alreadySeen,
          totalViews,
          data,
          propertyDescription,
          propertyImages,
          propertyCoverImage,
          furnishingDetails,
          postedBy,
          amenities,
          propertyVideos,
          _id,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
  return { props: {} };
}

const SinglePropertyCard = ({
  latitude,
  longitude,
  propertyTitle,
  nearbyPlaces,
  alreadySeen,
  totalViews,
  data,
  propertyDescription,
  propertyCoverImage,
}) => {
  const coverImage = {
    url: propertyCoverImage
      ? propertyCoverImage
      : 'https://media.istockphoto.com/id/697705574/photo/3d-rendering-of-modern-cozy-house-summer-evening.jpg?s=2048x2048&w=is&k=20&c=3N7_B5OIy_LYLyBBuZZs5Ly87pS8IV_33Xh0XIWoRJE=',
    alt: 'Cover Image',
  };

  const htmlToPlainText = (html) => {
    return html?.replace(/<\/?p>|<\/?ul>|<\/?li>/g, '');
  };
  const plainDescription = htmlToPlainText(propertyDescription);

  if (!data) {
    return <div>No property found. Please try again later.</div>;
  }

  const [auth] = useAuth()
  const userId = auth?.userResult?._id
  const { _id } = data || {}


  return (
    <div className='pb-1'>
      <NextSeo
        title={text.singlePropertyViewTitle}
        description={text.singlePropertyPageDescription}
        keywords={GLOBALLY_COMMON_TEXT.singlePropertySeoKeywords}
        openGraph={{
          title: `MORES - ${propertyTitle}`,
          description: `${plainDescription}`,
          url: 'https://mores.in',
          images: [
            {
              url: coverImage.url,
              width: 1200,
              height: 630,
              alt: 'Property Image',
            },
          ],
          type: 'website',
        }}
      />
      <div className='max-2xl:px-1 w-[93%] lg:w-[93%] custom-section'>
        <div className='flex justify-center items-center gap-2 mb-3 '>
          <h2 className='font-bold text-primary '>{viewText}</h2>
          <h2 className='font-normal  text-primary'>{propertyText}</h2>
        </div>
        <SinglePropertyFullView
          propertyData={data}
          latitude={latitude}
          longitude={longitude}
          alreadySeen={alreadySeen}
          totalViews={totalViews}
        />
      </div>
{/* 
      <div className='custom-section'>
        <div className='px-7 mb-9'>
          {userId && _id && (
            <RecommendedProperties
              user_id={userId}
              property_id={_id}
              recommendation_type={propertyText}
            />
          )}
        </div>

      </div> */}
    </div>
  );
};

export default SinglePropertyCard;
