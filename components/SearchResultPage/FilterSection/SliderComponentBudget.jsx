import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { getLogger } from '@/helper/logger';
import { SEARCH_RESULT_PAGE_TEXT } from '@/textV2';
const {budgetCrore,budgetLakh,budgetThousand}=SEARCH_RESULT_PAGE_TEXT.text
export default function MinimumDistanceInputBudget({ budgetValue, setBudgetValue }) {
  const Logger = getLogger();
  const unitMultipliers = {
    [budgetThousand]: 1000,
    [budgetLakh]: 100000,
    [budgetCrore]: 10000000,
  };

  const [selectedMinUnit, setSelectedMinUnit] = useState(budgetThousand);
  const [selectedMaxUnit, setSelectedMaxUnit] = useState(budgetThousand);

  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');

  useEffect(() => {
    if (budgetValue[0]) {
      setMinInput(budgetValue[0] / unitMultipliers[selectedMinUnit]);
    }
    if (budgetValue[1]) {
      setMaxInput(budgetValue[1] / unitMultipliers[selectedMaxUnit]);
    }
  }, [budgetValue]);

  const handleChange = (event, type) => {
    const value = parseFloat(event.target.value) || '';
    const multiplier = unitMultipliers[type === 'min' ? selectedMinUnit : selectedMaxUnit];

    if (type === 'min') {
      setMinInput(value);
      setBudgetValue([value * multiplier, budgetValue[1]] || 99000);
    } else if (type === 'max') {
      setMaxInput(value);
      setBudgetValue([budgetValue[0] || 0, value * multiplier]);
    } else {
      Logger.warn("Invalid input: min must be non-negative and max must be greater than min.");
    }
  };

  const handleUnitChange = (event, type) => {
    const unit = event.target.value;
    const multiplier = unitMultipliers[unit];

    if (type === 'min') {
      setSelectedMinUnit(unit);
      const newValue = (parseFloat(minInput) || 0) * multiplier;
      setBudgetValue([newValue, budgetValue[1]]);
    } else if (type === 'max') {
      setSelectedMaxUnit(unit);
      const newValue = (parseFloat(maxInput) || 0) * multiplier;
      setBudgetValue([budgetValue[0], newValue]);
    }
  };

  return (
    <Box
      sx={{
        width: "90%",
        "@media (min-width: 600px)": {
          width: "200px",
        },
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
      style={{ marginTop: "0px" }}
      className="flex flex-col gap-3"
    >
      <div className='flex px-2 gap-3 '>
        <TextField
          name="min"
          type="number"
          label={
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0168A2' }}>
              Min
            </Typography>
          }
          InputProps={{
            inputProps: { min: 0, inputMode: "numeric", pattern: "[0-9]*", step: "any" },
            sx: {
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]": { "-moz-appearance": "textfield" },
            },
          }}
          placeholder="0"
          value={minInput}
          onChange={(e) => handleChange(e, 'min')}
          sx={{ width: "50px" }}
          variant="standard"
        />
        <div className='flex justify-end flex-col'>
          <TextField
            select
            value={selectedMinUnit}
            onChange={(e) => handleUnitChange(e, 'min')}
            sx={{
              width: "115px",
              marginLeft: "5px",
              fontSize: "12px",
              '& .MuiSelect-select': {
                padding: '2px 8px',
              },
            }}
          >
            <MenuItem value={budgetThousand}>{budgetThousand}</MenuItem>
            <MenuItem value={budgetLakh}>{budgetLakh}</MenuItem>
            <MenuItem value={budgetCrore}>{budgetCrore}</MenuItem>
          </TextField>
        </div>
      </div>
      <div className='flex px-2 gap-3 '>
        <TextField
          name="max"
          label={
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Max
            </Typography>
          }
          type="number"
          InputProps={{
            inputProps: { min: 0, inputMode: "numeric", pattern: "[0-9]*", step: "any" },
            sx: {
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]": { "-moz-appearance": "textfield" },
            },
          }}
          placeholder="50"
          value={maxInput}
          onChange={(e) => handleChange(e, 'max')}
          sx={{ width: "50px" }}
          variant="standard"
        />
        <div className='flex justify-end flex-col'>
          <TextField
            select
            value={selectedMaxUnit}
            onChange={(e) => handleUnitChange(e, 'max')}
            sx={{
              width: "115px",
              marginLeft: "5px",
              fontSize: "12px",
              '& .MuiSelect-select': {
                padding: '2px 8px',
              },
            }}
          >
            <MenuItem value={budgetThousand}>{budgetThousand}</MenuItem>
            <MenuItem value={budgetLakh}>{budgetLakh}</MenuItem>
            <MenuItem value={budgetCrore}>{budgetCrore}</MenuItem>
          </TextField>
        </div>
      </div>
    </Box>
  );
}
