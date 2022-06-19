import { Box, Slider, IconButton } from "@mui/material";
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import { useState } from "react";

function MusicOptions() {

  const [paused, setPaused] = useState(false);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" >

      <Box mt={-1}>
        <IconButton aria-label="previous song">
          <SkipPreviousIcon htmlColor={"#fff"} />
        </IconButton>
        <IconButton
          aria-label={paused ? "play" : "pause"}
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <PlayCircleFilledIcon
              fontSize="large"
              htmlColor={"#fff"}
            />
          ) : (
            <PauseCircleFilledIcon fontSize="large" htmlColor={"#fff"} />
          )}
        </IconButton>
        <IconButton aria-label="next song">
          <SkipNextIcon htmlColor={"#fff"} />
        </IconButton>
      </Box>


      <Box width="500px" display="flex" gap="0.7rem" alignItems="center">
        <Box color="Gray" fontSize="12px" fontWeight="bold">0</Box>
        <Slider
          aria-label="Default"
          valueLabelDisplay="off"
          min={0.0}
          max={5.16}
          step={0.01}
          size="small"
          disabled
          sx={{
            color: "#1db954",
            "&:hover": {
              color: "#1db954",
            },
          }}
        />
        <Box color="Gray" fontSize="12px" fontWeight="bold">{`${5}:${16}`}</Box>
      </Box>

    </Box>
  );
}

export default MusicOptions;
