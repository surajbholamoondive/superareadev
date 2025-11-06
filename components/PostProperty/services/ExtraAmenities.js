import * as React from "react";
import { useState } from "react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ADD_MORE,
   ADD_NEW_LIST,
    ENTER_NEW_LOCATION, 
    RESET, 
    SAVE } from "@/text";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 4,
};

export default function ExtraNearbyLocation({
  amenities,
  setAmenities,
  selectedAmenities,
  setSelectedAmenities,
  DATA,
  toggleAmenity,
  setDATA,
  amenityIcons
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [_tempAmenities, _setTempAmenities] = useState([])
  const addNewAmenity = () => {
    setAmenities([...amenities, ""]);
  };

  const handleAmenityChange = (index, name) => {
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const updatedAmenities = [...amenities];
    updatedAmenities[index] =  capitalizeFirstLetter(name);
    setAmenities(updatedAmenities);
    _setTempAmenities(updatedAmenities);
  };



const handleSave = () => {
    let updatedAmenities = { ...selectedAmenities };
    _tempAmenities.forEach((amenity) => {
      if (amenity !== "") {
        const normalizedAmenity = amenity.toLowerCase();
        const existingAmenityKey = Object.keys(updatedAmenities).find(
          key => key.toLowerCase() === normalizedAmenity
        );
  
        if (existingAmenityKey) {
          toggleAmenity(existingAmenityKey);
        } else {
          const formattedAmenity = amenity.charAt(0).toUpperCase() + amenity.slice(1).toLowerCase();
          updatedAmenities = {
            ...updatedAmenities,
            [formattedAmenity]: true,
          };
        }
      }
    });
    
    setDATA({ ...DATA, amenities: updatedAmenities });
    setSelectedAmenities(updatedAmenities);
    _setTempAmenities([])
    setAmenities(['']);
    handleClose();
  };
  
  

  const handleReset = () => {
    //const standardAmenities = Object.keys(amenityIcons);
  
    // const updatedAmenities = Object.keys(selectedAmenities).reduce((acc, amenity) => {
    //   if (standardAmenities.includes(amenity)) {
    //     acc[amenity] = selectedAmenities[amenity];
    //   }
    //   return acc;
    // }, {});
  
    // setDATA({
    //   ...DATA,
    //   amenities: updatedAmenities,
    // });
    _setTempAmenities([]);
    setAmenities(['']);
    //setSelectedAmenities(updatedAmenities);
    handleClose();
  };
  

  return (
    <div className="h-[40px] flex justify-start items-center">
      <button onClick={handleOpen} className="text-primary capitalize">
        {ADD_MORE}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        labelled="modal-modal-title"
        described="modal-modal-description"
        sx={{
          zIndex: '99999'
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="bg-slate-200 h-10 rounded-t-2xl w-fill">
              <div className=" p-1">
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{}}>
            <div className="flex-col justify-between flex">
              <div className="mt-5  max-h-64 overflow-y-auto">
                <div className="  flex justify-center ">
                  <p className="text-xs text-center">{ENTER_NEW_LOCATION}</p>{" "}
                </div>
                {amenities?.map((amenity, index) => (
                  <div key={index} className="flex justify-center gap-4  px-2">
                    <input
                      type="text"
                      value={amenity}
                      onChange={(e) =>
                        handleAmenityChange(index, e.target.value)
                      }
                      className="w-[200px] ps-3 border-slate-950 text-base rounded-md h-7 border-[1px] m-2"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between pb-2 rounded-b-lg px-2 border-black">
                <div className="font-bold">
                  <button
                    className="text-primary bold mt-7 text-xs ml-2"
                    onClick={addNewAmenity}
                  >
                    {ADD_NEW_LIST}
                  </button>
                </div>
                <div className="flex gap-2">
                  <div
                    className="mt-5 h-8 flex justify-center w-20 border  rounded-md"
                    style={{ cursor: "pointer" }}
                  >
                    <button className=" text-xs" onClick={handleReset}>
                      {RESET}
                    </button>
                  </div>
                  <div
                    className="mt-5 h-8 flex justify-center w-20 bg-primary rounded-md"
                    style={{ cursor: "pointer" }}
                  >
                    <button className=" text-xs text-white" onClick={handleSave}>
                      {SAVE}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
