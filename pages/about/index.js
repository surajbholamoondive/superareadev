import Styles from "./index.module.css";
import "animate.css/animate.css";
import { About_Heading_Text, GLOBALLY_COMMON_TEXT } from "@/textV2";  
import BackgroundImage from '../../assets/NonLoggedUserImages/backgroundImage.svg'
import Hero from "@/content/About/Hero";
import MvData from "@/content/About/MvData";
import { Pillars } from "@/content/About/Pillars";
import { ChooseUs } from "@/content/About/ChooseUs";

const { text } = GLOBALLY_COMMON_TEXT;
const { heading } = About_Heading_Text;

const About = () => {
    return (
        <section
            style={{
                backgroundImage: `url(${BackgroundImage.src})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                paddingBottom: "20px",
                paddingTop: "20px"
            }}
        >
            <div className="bg-white mx-auto w-[93%] lg:w-[93%] py-9 px-6 lg:px-14 overflow-hidden rounded-lg ">
                <h1 className={`${Styles.heading} text-center mb-8 lg:mb-10 text-primary`}>
  <strong className="font-thin">{text.aboutUsText}</strong> <strong className="font-bold">{text.usText}</strong>
</h1>

                <h2 className="leading-loose mb-10 lg:mb-10">
                    <span className="text-primary text-3xl">{heading.Empowering} </span>
                    <span className="text-primary font-bold text-3xl">{heading.Smarter}</span>
                    <br />
                    <span className="text-primary font-bold text-3xl">
                        {heading.PropertyChoices}
                    </span>
                    <span className="text-primary font-normal text-3xl"> {heading.Powered} </span>
                    <span className="text-primary font-bold text-3xl">{heading.AI}</span>
                </h2>
                <div className="mb-12 lg:mb-16">
                    <Hero/>
                </div>

                <div className="mb-12 lg:mb-16">
                    <MvData />
                </div>
                <div className="mb-12 lg:mb-16">
                    <Pillars />
                </div>
                <div>
                    <ChooseUs />
                </div>
            </div>
        </section>
    );
};

export default About;