import { Box, Slider, Stack } from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

import { useContext } from "react";
import SpotifyContext from "../../Context/SpotifyContext";

function FooterSound() {

  const { audio, volume, setVolume } = useContext(SpotifyContext);

  const handleChange = (event, newValue) => {
    if(audio !== null) {
      audio.volume = Number(newValue) / 100;
    }
    setVolume(Number(newValue) / 100);
  };
  return (
    <Box
      sx={{
        width: 250,
        "@media(max-width: 950px)": {
          width: "150px",
        },
        "@media(max-width: 720px)": {
          display: "none",
        },
      }}
    >
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          aria-label="Volume"
          value={(Number(volume) * 100).toFixed(0)}
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
