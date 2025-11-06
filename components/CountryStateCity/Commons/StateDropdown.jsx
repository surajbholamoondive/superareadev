import { GLOBALLY_COMMON_TEXT } from "@/textV2";
import { useEffect } from "react";
const StateDropdown = ({ options, stateCode, setStateCode, setCity, setStateName, initialState }) => {
    const handleStateSelect = (e) => {
        const selectedState = options.find(option => option.isoCode === e.target.value);
        setStateCode(selectedState.isoCode)
        setStateName(selectedState.value)
        setCity("")
    };
    useEffect(() => {
        if (initialState) {
            const foundState = options.find(option => option.value === initialState);
            if (foundState) {
                setStateCode(foundState.isoCode);
            }
        }
    }, [initialState]);
    return (

            <select className="w-full border border-gray-300 px-1 rounded-md max-md:w-[100%] h-[38.5px] text-[14px] focus:outline-none focus:border-[1px] focus:border-[#931602] " value={stateCode} onChange={handleStateSelect}>
                <option value="foundState"> {GLOBALLY_COMMON_TEXT.text.stateText} </option>
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.isoCode}>
                            {option.displayValue}
                        </option>
                    );
                })}
            </select>
    );
};

export default StateDropdown;
