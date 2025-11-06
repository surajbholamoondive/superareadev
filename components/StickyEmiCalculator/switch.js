
const Switch = ({ isYearly, setIsYearly }) => {
  const toggleSwitch = () => {
    setIsYearly(!isYearly);
  };

  return (
    <div
      onClick={toggleSwitch}
      className="relative flex items-center w-16 bg-primary rounded-full cursor-pointer transition-all duration-300 px-1"
    >
      <div
        className={`absolute w-7 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? "translate-x-0" : "translate-x-7"
          }`}
      />
      <span
        className={`absolute left-2 ${isYearly ? "text-primary" : "text-white"
          } text-xs`}
      >
        Yr
      </span>
      <span
        className={`absolute right-2 ${isYearly ? "text-white" : "text-primary"
          } text-xs`}
      >
        Mo
      </span>
    </div>
  );
};

export default Switch;