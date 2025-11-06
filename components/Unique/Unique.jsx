import Image from 'next/image'
import AssuredPropertiesLogo from '@/assets/ColorChangeIcons/AssuredProperties/AssuredProperties'
import Allinclusivesupport from '@/assets/ColorChangeIcons/InclusiveSupport/⁠Allinclusivesupport.jsx'
import MinimalCommission from '@/assets/ColorChangeIcons/MinimalCommission/MinimalCommission.jsx'
import TotalControl from '@/assets/ColorChangeIcons/TotalControl/TotalControl.jsx'
import Bg from '@/assets/UniqueBg.png'

import Bot from '../../assets/UniqueBot.png'
import styles from './Unique.module.css'

export default function Unique() {
  const features = [
    {
      icon: <AssuredPropertiesLogo />,
      title: 'Assured Properties',
      description:
        'Protect your property with reliable, long-term assurance. Perfect for fractional and reference homes, we provide consistent security, value, and peace of mind—now and into the future.',
      extraClass: 'gap-1 mb-0 md:mb-3 pr-3 pb-3 md:pr-0 md:pb-0',
    },
    {
      icon: <TotalControl />,
      title: 'Total Control',
      description:
        'Explore properties remotely with interactive 360° and 3D virtual tours. Schedule viewings in advance and make confident decisions from anywhere—ideal for inspecting key or reference homes.',
    },
    {
      icon: <MinimalCommission />,
      title: 'Minimal Commission',
      description:
        'Enjoy competitive rates and low commissions for maximum value. Access unlimited property options tailored to your budget and investment goals.',
    },
    {
      icon: <Allinclusivesupport />,
      title: '⁠All inclusive support',
      description:
        'Experience seamless, personalized service from first contact to final handover. We ensure a smooth, stress-free journey for buyers and tenants with expert guidance every step of the way.',
    },
  ]

  return (
    <section
      className={`${styles.customSection} mx-auto w-[95%] lg:w-[93%] overflow-hidden`}
    >
      <div className="relative flex flex-col mt-8">
        <h2 className="text-[2rem] md:text-[2.5rem] font-normal text-[#8A1E0A] text-center mb-14">
          What sets us{' '}
          <span className="font-bold text-[2rem] md:text-[2.5rem]">Unique</span>
        </h2>
        <div className="flex flex-col md:flex h-[1100px] md:h-auto justify-between">
          <div className="flex flex-col-reverse md:flex-row justify-end items-center md:items-start gap-4   px-4  md:p-16  md:pt-0 ">
            <div className="relative flex w-full md:w-[60%] justify-center max-h-auto">
              <div className="v-line absolute top-0 bottom-0 left-1/2 w-px lg:h-full md:h-full h-[925px] bg-red-300 z-10"></div>
              <div className="h-line  absolute left-0 right-0 top-1/2 h-px  lg:mt-0 md:mt-0  mt-3  bg-red-300 z-10"></div>
              <div className="grid grid-cols-2 w-full h-full -ml-5 gap-4 ">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex gap-3  ${
                      index % 2 === 0 ? 'pr-6' : 'pl-6'
                    } ${feature.extraClass || ''}`}
                  >
                    <div className="my-3">{feature.icon}</div>
                    <div className="my-3">
                      <h2 className="text-lg md:text-2xl font-semibold text-[var(--secondary-color)]">
                        {feature.title}
                      </h2>
                      <div className="text-gray-600 text-sm py-2">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div>
              <Image src={Bg} className="w-full" alt="Background" />
            </div>
            <div className={styles.botWrapper}>
              <Image
                src={Bot}
                className={styles.botImage}
                width={630}
                height={630}
                alt="Bot"
              />

              <button className={`${styles.botButton} `}>Download</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
