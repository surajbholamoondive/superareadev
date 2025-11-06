import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import mscore from "../../../assets/logo/logo-icon.svg";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { GLOBALLY_COMMON_TEXT, SEARCH_RESULT_CARD_TEXTS } from "@/textV2";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider({ value1, setValue1 }) {
  useEffect(() => {
  }, [value1[1], value1[0]])


  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  return (
    <Box sx={{
      width: '90%', "@media (min-width: 600px)": {
        width: '230px'
      }
    }} style={{ marginTop: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginLeft: "2.5px",
        }}
      >
        <div>
          <div className="flex bg-lightRedBg rounded-3xl py-2 px-2 items-center align-middle gap-1">
            <Link href={SEARCH_RESULT_CARD_TEXTS.routes.mScorePath}>
            <Image className="h-4 w-4 text-slate-500" src={mscore} alt="icon" />
            </Link>
            <p className="pr-1">Score</p>
          </div>
        </div>
        <div className="pt-2">
          <span>{value1[0]}</span>
          <span style={{ margin: "0 5px" }}> {GLOBALLY_COMMON_TEXT.symbols.dash} </span>
          <span>{value1[1]}</span>
        </div>
      </div>
      <div className="pl-[11px] pr-[10.5px]">
        <Slider
          sx={{
            color: "#931602",
            "& .MuiSlider-rail": {
              backgroundColor: "#0168A2",
            },
          }}
          getAriaLabel={() => "Minimum distance"}
          value={value1}
          onChange={handleChange1}
          // valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </div>
    </Box>

  );
}
