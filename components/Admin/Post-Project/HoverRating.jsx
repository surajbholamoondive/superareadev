import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
const labels = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
}
function getLabelText(value) {
  return `${value} Star${value !== 1 && 's'}, ${labels[value]}`
}
const HoverRating = ({ handleProjectDataChange, valueToChange, value, setValue, projectData, readOnly = false }) => {
  const [hover, setHover] = useState(value || -1)
  return (
    <div>
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          size='large'
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue)
            handleProjectDataChange(valueToChange, newValue)
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover)
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.75, fontSize: '24px' }} fontSize="inherit" />}
          icon={<StarIcon fontSize="inherit" style={{ fontSize: '24px' }} />}
          readOnly={readOnly}
        />
      </Box>
    </div>
  )
}

export default HoverRating