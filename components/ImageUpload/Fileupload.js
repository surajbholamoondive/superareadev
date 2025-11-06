import React from "react";

const StepThreeCard = ({
    icon,
    definition,
    buttonLabel,
    onSelect,
    onPhotoUpload,
    onVideoUpload,
}) => {
    return (
        <div className="flex items-center justify-center bg-secondary rounded-3xl md:w-[300px] w-full p-4 md:p-2 mb-3">
            <div className="rounded-lg p-4 text-center">
                {/* Icon */}
                <div className="text-5xl mb-2">{icon}</div>

                {/* Definition */}
                <p className="text-black text-[10px] text-center font-poppins font-normal leading-[128%] tracking-[0.14px]">
                    {definition}
                </p>

                {/* Button */}
                <button
                    className="py-1 px-3 mt-2 rounded bg-primary text-white text-[10px] w-[95px] h-[35px] flex-shrink-0 border-none border-radius-9"
                    onClick={onSelect}
                    disabled={onPhotoUpload || onVideoUpload}
                >
                    {onPhotoUpload || onVideoUpload ? "Uploading..." : buttonLabel}
                </button>
            </div>
        </div>
    );
};

export default StepThreeCard;