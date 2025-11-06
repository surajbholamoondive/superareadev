import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ADD_MORE,
   ADD_NEW_LIST,
    DEFINING_LOCATION,
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
  DefiningLocation,
  setDefiningLocation,
  DATA,
  setDATA,

}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewAmenity = () => {
    setAmenities([...amenities, ""]);
  };

  const handleAmenityChange = (index, name) => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index] = name;
    setAmenities(updatedAmenities);
  };

 
  const handleSave = () => {
  
    amenities.forEach((amenity) => {
      if(amenity!==""){

      setDefiningLocation((prev) => ({
        ...prev,
        [amenity]: false,
      }));
      setDATA({ ...DATA, DefiningLocation: { ...DefiningLocation, [amenity]: false } });
    }
    });
    handleClose();
  };
  const handleReset = () => {
   
   amenities.forEach((amenity) => {
     if(amenity!==""){
        setDefiningLocation((prev) => ({
            ...prev,
            [amenity]: false,
          }));
          setDATA({ ...DATA, DefiningLocation: { ...DefiningLocation, [amenity]: false } });
     
    
        }
   setAmenities([""]);
   });

  };

  React.useEffect(() => {
  }, [amenities]);
  return (
    <div>
      <Button onClick={handleOpen} className="text-primary font-bold ">
       {ADD_MORE}.
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        labelled="modal-modal-title"
        described="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="bg-slate-200 h-10 rounded-t-2xl w-fill">
              <div className=" p-1">
                <p className="pl-3">{DEFINING_LOCATION}</p>
                
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{}}>
            <div className="flex-col justify-between flex">
              <div className="mt-5">
                <div className="flex ml-8">
                  <div className="text-xs ">{ENTER_NEW_LOCATION}</div>{" "}
                </div>
                {amenities?.map((amenity, index) => (
                  <div key={index} className="flex gap-4 ml-3 px-2">
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
                <div className="flex">
                  <div
                    className="mt-5 h-8 flex justify-center w-20 border mr-4 rounded-md"
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
                    <button className=" text-xs" onClick={handleSave}>
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
