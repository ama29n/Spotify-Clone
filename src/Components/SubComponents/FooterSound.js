import { Box, Slider, Stack } from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

import { useState } from "react";

function FooterSound() {
  const [value, setValue] = useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{
      width: 250,
      '@media(max-width: 950px)' : {
        width: '150px'
      },
      '@media(max-width: 720px)' : {
        display: "none"
      }
    }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          sx={{
            color: "#1db954",
          }}
        />
        <VolumeUp />
      </Stack>
    </Box>
  );
}

export default FooterSound;
