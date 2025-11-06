import AlternateImage from "./AlternateImage";
import { WHAT_MAKES_SUPERAREA_STANDOUT } from "@/content/NonLoggedIn/NonLoggedScreen";
import { NON_LOGGED_USER_TEXT } from "@/textV2";
const { text } = NON_LOGGED_USER_TEXT

const StandOut = () => {
  return (
    <section className="pt-4 pb-4 " >
      <div className="  m-auto px-8 py-4 w-[93%] bg-white rounded-xl  ">

        <div className='text-center w-full'>
          <h3 className='inline-block text-primary'>{text.whatMakes}</h3>{' '}
          <h2 className='inline-block   text-primary'>{text.superAreaStandOut}</h2>
        </div>
        <AlternateImage data={WHAT_MAKES_SUPERAREA_STANDOUT} />
      </div >
    </section >
  );
}
export default StandOut
