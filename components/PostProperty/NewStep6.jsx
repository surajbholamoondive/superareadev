import { postPropertyMap } from "@/content/JSON/PostPropertyMap";

export default function NewStep6 ({DATA, setDATA, setDeclarationOne, SetDeclarationTwo, declarationOne, declarationTwo}){
    
    const renderButtons = (buttons, title, onPress, category) => {
        if (!buttons || buttons.length === 0) {
            return null;
        }
     return (
      <div>
        <div className="flex flex-row mb-1">
          <span className="font-medium text-base">{title}</span>
        </div>
        <div className="flex flex-row gap-3 flex-wrap mb-2">
          {buttons.map((button) => {
            const isButtonActive = DATA[category] === button;
            return (
              <button
                className={`flex flex-row items-center text-center justify-center px-4 py-1 rounded-full ${
                  isButtonActive
                    ? 'bg-primary  text-white'
                    : 'border border-newBackground  text-gray-600'
                }`}
                key={button}
                onClick={() => onPress(category, button)}
              >
                <span>{button}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
    }
    const PropertyFeatures=['Established Developer', 'Renovated to Perfection', 'Vastu Friendly', 'Private Parking', 'Safe Community']
    const DesignAndLayout=['Elegant Interiors', 'Desirable Locality', 'Modern Comfort', 'Natural Light Zones', 'Finised to Standards']
    const LocationPerks=['Near By Schools', 'Easy Transit Access', 'Calm Surroundings', 'Broad Road Access', 'Secure Neighbourhood']
    const PricingAndInvestment=['Ready to Move-In', 'Value Deal', 'Fast Closure', 'Ideal Investment', 'Budget-Friendly' ]

    const renderArrayButtons = (
        buttons,
        title,
        onClick,
        category
      ) => {
        if (!buttons || buttons.length === 0) {
          return null
        }
        return (
          <div>
            <h4 className={'text-left mb-1'}>{title}</h4>
            <div className='flex flex-wrap mb-3 gap-3'>
              {buttons.map((button) => {
                const isButtonActive =
                  Array.isArray(DATA.tags) && DATA.tags.includes(button)
                return (
                  <div>
                    <button
                      className={`px-4 py-1 rounded-full ${isButtonActive ? 'bg-primary text-white' : 'bg-white text-gray-600'} border border-primary whitespace-nowrap`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      key={button}
                      onClick={() => onClick(category, button)}
                    >
                      {button}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
    }
    return (
        <div className="px-5">
         {
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.labels && (
                renderButtons(
                postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.labels?.list,
                'Labels',
                (category, value) => {
                setDATA({
                    ...DATA,
                    [category]: value,
                })
                },
                'labels'
                )
        )}
        <h4 className="mb-1"> Tags </h4>
        {
            renderArrayButtons(
               PropertyFeatures,
                'Property Features',
                (category, value) => {
                setDATA({
                    ...DATA,
                    [category]: Array.isArray(DATA[category]) 
                        ? DATA[category].includes(value)
                            ? DATA[category].filter(item => item !== value)
                            : [...DATA[category], value]
                        : [value]
                })
                },
                'tags'
                )
        }
        {
            renderArrayButtons(
               DesignAndLayout,
                'Design & Layout',
                (category, value) => {
                setDATA({
                    ...DATA,
                    [category]: Array.isArray(DATA[category]) 
                        ? DATA[category].includes(value)
                            ? DATA[category].filter(item => item !== value)
                            : [...DATA[category], value]
                        : [value]
                })
                },
                'tags'
                )
        }
        {
            renderArrayButtons(
               LocationPerks,
                'Location Perks',
                (category, value) => {
                setDATA({
                    ...DATA,
                    [category]: Array.isArray(DATA[category]) 
                        ? DATA[category].includes(value)
                            ? DATA[category].filter(item => item !== value)
                            : [...DATA[category], value]
                        : [value]
                })
                },
                'tags'
                )
        }
        {
            renderArrayButtons(
               PricingAndInvestment,
                'Pricing & Investment',
                (category, value) => {
                setDATA({
                    ...DATA,
                    [category]: Array.isArray(DATA[category]) 
                        ? DATA[category].includes(value)
                            ? DATA[category].filter(item => item !== value)
                            : [...DATA[category], value]
                        : [value]
                })
                },
                'tags'
                )
        }
    </div>
    )
}