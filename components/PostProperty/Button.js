import React, { useState } from 'react';
import { buttonConditions } from '@/content/JSON/postProperty'; // Import the button conditions JSON

const Button = () => {
    const [ButtonState, setButtonState] = useState({ propertyType: 'Residential', propertySubType: 'Apartment' }); // Set default on the Screen

    // Function to render buttons based on conditions
    const renderButtons = (buttons, title, onClick) => (
        <div className='p-3'>
            <h3 className='text-[13px]'>{title}</h3>
            <div className='flex flex-wrap'>
                {buttons.map((button) => (
                    <button
                        key={button.value}
                        onClick={() => onClick(button.value)}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );

    // Check if the propertySubType is not in the excluded list
    const shouldShowFurnishingStatus = ButtonState.propertySubType && !buttonConditions.propertySubType.exclude.includes(ButtonState.propertySubType);

    return (
        <div>
            {/* Render listing buttons */}
            {renderButtons(buttonConditions.listing, 'Listing',
                (value) => setButtonState({
                    ...ButtonState,
                    listing: value
                }))}

            {/* Render propertyType buttons */}
            {renderButtons(
                [
                    { value: "Residential", label: "Residential" },
                    { value: "Commercial", label: "Commercial" }
                ],
                'PropertyType',
                (value) => setButtonState({
                    ...ButtonState,
                    propertyType: value,
                })
            )}

            {/* Render propertySubType buttons based on propertyType */}
            {ButtonState.propertyType && renderButtons(
                buttonConditions.propertyType[ButtonState.propertyType] || [],
                'PropertySubType',
                (value) => setButtonState({
                    ...ButtonState,
                    propertySubType: value,
                })
            )}

            {/* Render furnishing Status buttons based on property SubType */}
            {shouldShowFurnishingStatus && renderButtons(
                buttonConditions.propertySubType.furnishingStatus,
                'FurnishingStatus',
                (value) => setButtonState({
                    ...ButtonState,
                    furnishingStatus: value
                })
            )}
        </div>
    );
};

export default Button;
