import ImageCard from './ImageCard';
import { UNIQUE_DATA } from '@/content/NonLoggedIn/NonLoggedScreen';
import { NON_LOGGED_USER_TEXT } from '@/textV2'
const { text } = NON_LOGGED_USER_TEXT
const UniqueData = () => {
  return (
    <section className="w-[93%] lg:w-[93%]  overflow-hidden border-none m-auto  rounded-xl ">
      
      <div className="pt-0 max-md:pt-5 flex flex-col items-center relative my-4 m-auto bg-white rounded-xl">
        <div className='text-center w-full mt-4'>
          <h3 className='inline-block text-primary'>{text.whatSetsUsUnique}</h3>{' '}
          <h2 className='inline-block   text-primary'>{text.uniqueText}</h2>
        </div>
        <ImageCard data={UNIQUE_DATA} />
      </div>
    </section>
  );
}
export default UniqueData;