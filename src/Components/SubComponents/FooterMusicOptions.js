import { Box, Slider, IconButton } from "@mui/material";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

import { useContext, useEffect } from "react";
import SpotifyContext from "../../Context/SpotifyContext";

function MusicOptions() {
  const { playingStatus, setPlayingStatus, playingSong, audio, setAudio } = useContext(SpotifyContext);

  useEffect(() => {
    if (playingSong && playingSong.preview_url !== null) {
      if(audio != null) {
        audio.pause();
        setAudio(null);
      }
      setPlayingStatus(false);
      setAudio(playingSong.preview_url);
    }
    else if(playingSong && playingSong.preview_url == null) {
      if(audio != null) {
        audio.pause();
        setAudio(null);
      }
      setPlayingStatus(false);
      setAudio(null);
    }
    
  }, [playingSong]);
  
  console.log(audio);
  
  const statusChangeHandler = () => {
    if(audio === null) {
      setPlayingStatus(!playingStatus);
    } else {
      audio.addEventListener("ended", () => setPlayingStatus(false));
      if(playingStatus === false) {
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
      {audio ? (
        <Box width="500px" display="flex" gap="0.7rem" alignItems="center">
          <Box color="Gray" fontSize="12px" fontWeight="bold">
            0
          </Box>
          <Slider
            aria-label="Default"
            valueLabelDisplay="off"
            min={0}
            max={(+audio.duration / 60).toFixed(2)}
            step={0.01}
            size="small"
            // disabled
            sx={{
              color: "Grey",
              "&:hover": {
                color: "#1db954",
              },
            }}
          />
          <Box color="Gray" fontSize="12px" fontWeight="bold">{`${Math.floor(
            Number(audio.duration) / 60
          )} : ${((Number(audio.duration) % 60) / 1000).toFixed(0)}`}</Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default MusicOptions;
