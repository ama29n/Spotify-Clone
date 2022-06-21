import { Box, Slider, IconButton } from "@mui/material";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

import { useContext, useEffect, useState } from "react";
import SpotifyContext from "../../Context/SpotifyContext";

function MusicOptions() {
  const { playingStatus, setPlayingStatus, playingSong, audio, setAudio, volume, playedPart, setPlayedPart } =
  useContext(SpotifyContext);
  

  useEffect(() => {
    setPlayedPart(0);
    if (playingSong && playingSong.preview_url !== null) {
      if (audio != null) {
        audio.pause();
        setAudio(null);
      }
      setPlayingStatus(false);
      setAudio(playingSong.preview_url);
    } else if (playingSong && playingSong.preview_url == null) {
      if (audio != null) {
        audio.pause();
        setAudio(null);
      }
      setPlayingStatus(false);
      setAudio(null);
    }
  }, [playingSong]);

  const statusChangeHandler = () => {
    if (audio === null) {
      setPlayingStatus(!playingStatus);
    } else {
      audio.addEventListener("ended", () => setPlayingStatus(false));
      audio.addEventListener("timeupdate", () => setPlayedPart(audio.currentTime));
      audio.volume = volume;
      if (playingStatus === false) {
        setPlayingStatus(true);
        audio.play();
      } else {
        setPlayingStatus(false);
        audio.pause();
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mt={-1}>
        <IconButton aria-label="previous song">
          <SkipPreviousIcon htmlColor={"#fff"} />
        </IconButton>
        <IconButton
          aria-label={playingStatus ? "play" : "pause"}
          onClick={statusChangeHandler}
        >
          {!playingStatus ? (
            <PlayCircleFilledIcon fontSize="large" htmlColor={"#fff"} />
          ) : (
            <PauseCircleFilledIcon fontSize="large" htmlColor={"#fff"} />
          )}
        </IconButton>
        <IconButton aria-label="next song">
          <SkipNextIcon htmlColor={"#fff"} />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "500px",
          "@media(max-width: 1100px)": {
            width: "270px",
          },
        }}
      >
        {/* <Box color="Gray" fontSize="12px" fontWeight="bold">0</Box> */}
        <Box width="inherit">
          <Slider
            aria-label="Default"
            valueLabelDisplay="off"
            min={0}
            max={audio ? audio.duration : 100}
            value={playedPart ? playedPart : 0}
            step={0.01}
            size="small"
            {...{disabled: audio ? false : true}}
            sx={{
              color: "#1db954",
              "&:hover": {
                color: "#1db954",
              },
            }}
          />
        </Box>
        {/* <Box color="Gray" fontSize="12px" fontWeight="bold">a</Box> */}
      </Box>
    </Box>
  );
}

export default MusicOptions;

// display="flex" gap="0.7rem" alignItems="center"

// (+audio.duration / 60).toFixed(2)
// {`${Math.floor(Number(audio.duration) / 60)} : ${((Number(audio.duration) % 60) / 1000).toFixed(0)}`}
