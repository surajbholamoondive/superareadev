import * as React from "react";
import { createPortal } from "react-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DefaultIcons } from "@/content/Amenities/defaultIcon";
import { GLOBALLY_COMMON_TEXT } from "@/textV2";
import Image from "next/image";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  boxSizing: 'border-box',
};

export default function ExtraAmenitiesModal({
  amenities,
  setAmenities,
  DATA,
  setDATA,
  setSelectedAmenities,
  selectedAmenities,
  setDefaultIcon,
  defaultIcon,
}) {
  const [open, setOpen] = React.useState(false);
 const [openDropdowns, setOpenDropdowns] = React.useState([]);
  const [dropdownPosition, setDropdownPosition] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const addNewAmenity = () => {
    setAmenities([...amenities, { name: "", count: 0 }]);
    setOpenDropdowns([...openDropdowns, false]);
  };

  const handleAmenityChange = (index, name) => {
    const validatedName = name.replace(/[0-9]/g, '');
      const updatedAmenities = [...amenities];
    updatedAmenities[index].name = validatedName;
    setAmenities(updatedAmenities);
  };
  

  const defaultIconName = (index, value) => {
    const updatedAmenities = [...amenities]
    updatedAmenities[index].iconName = value
    setAmenities(updatedAmenities)
  }

  const handleNumberChange = (index, count) => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index].count = count;
    setAmenities(updatedAmenities);
  };
  const handleSave = () => {
    const existingDataObject = {}
    amenities.forEach((item) => {
      if (item.iconName !== undefined && item.count !== 0  && item.name !== "") {
        existingDataObject[item.name] = {
          count: item?.count,
          iconName: item?.iconName
        }
      }
    });
    const finalData = {
      ...selectedAmenities,
      ...existingDataObject
    };
    setSelectedAmenities(finalData)
    handleClose();
  };




  const toggleDropdown = (index, event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX,
      width: buttonRect.width,
    });

    setOpenDropdowns((prev) => {
      const newOpen = [...prev];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };


  const selectIcon = (index, value) => {
    defaultIconName(index, value);
    setOpenDropdowns((prev) => {
      const newOpen = [...prev];
      newOpen[index] = false;
      return newOpen;
    });
  };


  const getSelectedOption = (index) => {
    const iconName = amenities[index]?.iconName;
    if (!iconName) return null;
    return Object.values(DefaultIcons).find((opt) => opt.value === iconName);
  };




  return (
    <div>
      <button onClick={handleOpen} className="text-gray-600 font-bold capitalize">
        +Add More
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        labelled="modal-modal-title"
        described="modal-modal-description"
        sx={{
          zIndex: 99999
        }}
      >
        <Box sx={style} className='rounded-xl'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="bg-slate-200 h-14 w-fill rounded-lg">
              <div className=" p-1">
                <h4 className="pl-3">Furnishing Details</h4>
                <p className="pl-3 text-[#5F5F5F] ">
                Enter custom amenities not in the list.
                </p>
              </div>
            </div>
          </Typography>

  <div className="flex flex-col h-full justify-center ">

<div
              className={`pt-5 max-h-64 ${amenities.length > 4 ? "overflow-y-auto" : ""}`}
              style={{
                position: "relative",
                maxHeight: amenities.length > 4 ? "16rem" : "auto",
              }}
            >
              {amenities.map((amenity, index) => {
                const isOpen = openDropdowns[index] ?? false;
                const selectedOption = getSelectedOption(index);
                return (
                  <div key={index} className="flex justify-around relative">
                    <div>
                      <p className="ml-1">Name of Item</p>
                      <input
                        type="text"
                        value={amenity.name}
                        onChange={(e) => handleAmenityChange(index, e.target.value)}
                        className="w-[100px] ps-2 border-slate-950 rounded-md h-7 border-[1px] m-1"
                      />
                    </div>
                    <div>
                      <p className="ml-1">Number</p>
                      <input
                        type="number"
                        value={amenity.count}
                        onChange={(e) => handleNumberChange(index, parseInt(e.target.value))}
                        className="w-[50px] ps-2 pr-1 border-slate-950 rounded-md h-7 border-[1px] m-1"
                        min="0"
                      />
                    </div>
                    <div className="ml-1 w-[80px]">
                      <p className="mb-[2px]">Select icon</p>
                      <div className="relative w-[80px] flex justify-center items-center">
                        <button
                          className="flex justify-center items-center border border-blue-900 w-full rounded"
                          onClick={(e) => toggleDropdown(index, e)} // ✅ [CHANGED] Now passes event for position tracking
                        >
                          {selectedOption ? (
                            <Image
                              src={selectedOption.icon}
                              alt={selectedOption.value}
                              className="h-4 w-4 mr-2"
                            />
                          ) : (
                            <span>Icons</span>
                          )}
                          <span className="text-black text-[20px] ml-1">
                            {isOpen ? "▴" : "▾"}
                          </span>
                        </button>

                        {/* ✅ [CHANGED] Dropdown now rendered via Portal outside modal */}
                        {isOpen &&
                          dropdownPosition &&
                          createPortal(
                            <div
                              className="absolute bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto flex flex-col"
                              style={{
                                top: dropdownPosition.top,
                                left: dropdownPosition.left,
                                width: dropdownPosition.width,
                                zIndex: 999999,
                                position: "absolute",
                              }}
                            >
                              {Object.values(DefaultIcons).map((option) => (
                                <div
                                  key={option.value}
                                  className="border-b border-gray-200 h-[2rem] flex items-center justify-center cursor-pointer hover:bg-gray-100"
                                  onClick={() => selectIcon(index, option.value)}
                                >
                                  <Image
                                    src={option.icon}
                                    alt={option.value}
                                    className="h-[80%]"
                                  />
                                </div>
                              ))}
                            </div>,
                            document.body
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>


    <div>
    <div className="flex justify-between pb-2 px-2 border-black">
      <div className="font-bold">
        <button
          className="text-gray-600 bold mt-7 ml-2"
          onClick={addNewAmenity}
        >
          +Add New Item
        </button>
      </div>
      <div className="flex">
        <div
          className="mt-5 h-8 flex justify-center w-20 border mr-4 rounded-md"
          onClick={handleClose}
          style={{ cursor: 'pointer' }}
        >
          <button>{GLOBALLY_COMMON_TEXT.buttons.backButton}</button>
        </div>
        <div
          className="mt-5 h-8 flex justify-center w-20 bg-gray-300 rounded-md"
          style={{ cursor: 'pointer' }}
        >
          <button onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
        </Box>
      </Modal>
    </div>
  );
}
