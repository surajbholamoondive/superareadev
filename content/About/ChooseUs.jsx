import Image from "next/image";

import Supports from '../../assets/AboutPage/Supports.png'
import Service from '../../assets/AboutPage/Service.png'
import group from '../../assets/AboutPage/Group.png'
import Drivеn from '../../assets/AboutPage/Drivеn.png'

const whyChooseUsData = [
  {
    icon: Service,
    title: "AI at Your Service 24/7",
    description:
      "From instant property suggestions to legal document help, our SuperArea Assistant provides you with accurate answers and real estate advice anytime, like your personal expert on demand.",
  },
  {
    icon: group,
    title: "Verified Properties Only",
    description:
      "Our Super-Verification process upholds the highest standards of authenticity, ensuring each listing is authenticated, accurate, and trustworthy.",
  },
  {
    icon: Drivеn,
    title: "Insight-Driven Tools",
    description:
      "Get powerful tools backed by AI-driven insights, from property suggestions to legal document assistance, designed to simplify and empower your real estate decisions.",
  },
  {
    icon: Supports,
    title: "End-to-End Support",
    description:
      "Our dedicated support ensures you get expert help across every step of your property journey, making it seamless, transparent, and stress-free.",
  },
];

export const ChooseUs = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-primary mb-12 text-left">
        Why Choose Us?
      </h1>

      <div className="w-full flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-3xl lg:max-w-4xl px-4">
    {whyChooseUsData.map((item, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between transition duration-300 min-h-[250px]"
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">
            {item.title}
          </h3>
          {item.icon && (
            <Image
              src={item.icon}
              alt={item.title}
              className="w-10 h-10 object-contain"
            />
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    ))}
  </div>
</div>

    </>
  );
};
