import { GLOBALLY_COMMON_TEXT } from "@/textV2";

const Dropdown = ({ options, disabled, value, onChange }) => {
    return (
        <select className="w-full border border-gray-300 px-1 rounded-md max-md:w-[100%] h-[38.5px] focus:outline-none focus:border-[1px] text-[14px] focus:border-[#931602] self-start" disabled={disabled} value={value} onChange={onChange}>
            <option value="foundCity">{GLOBALLY_COMMON_TEXT.text.cityText}</option>
            {options.map((option, index) => {
                return <option key={index} value={option.value}>{option.displayValue}</option>;
            })}
        </select>
    );
};

export default Dropdown;
