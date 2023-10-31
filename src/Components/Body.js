import Header from "./Header";
import BodyListItem from "./SubComponents/BodyListItem";

import { Box, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { useContext, useEffect } from "react";
import SpotifyContext from "../Context/SpotifyContext";

import song from "../Assets/song.jpg";

import axios from "axios";

function Body() {
  const {
    playlistId,
    setList,
    list,
    token,
    playingStatus,
    setPlayingStatus,
    audio,
    volume,
    setPlayedPart,
  } = useContext(SpotifyContext);

  useEffect(() => {
    const getPlaylist = async () => {
      if (playlistId) {
        const playlist = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        setList(playlist.data);
      }
    };
    getPlaylist();
  }, [playlistId]);

  const statusChangeHandler = () => {
    if (audio === null) {
      setPlayingStatus(!playingStatus);
    } else {
      audio.addEventListener("ended", () => setPlayingStatus(false));
      audio.addEventListener("timeupdate", () =>
        setPlayedPart(audio.currentTime)
      );
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

  const getColor = () => {
    let arr = ["#13478c", "#f94449", "#aaff00", "#2aaa8a", "#2aa2aa"];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Styles
  const __Body_main = {
    flex: "0.88",
    background: !list ? `linear-gradient(black, rgba(16, 16, 16))` : `linear-gradient(${getColor()}, rgba(16, 16, 16))`,
    height: "100vh",
    color: "White",
    overflowY: "hidden",
  };

  const __Body_upperPart = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    margin: "10px 60px 0 60px",
    "@media(max-width: 720px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  };

  const __Body_upperPart_playlistBox = {
    boxShadow: "1px 1px 30px Black",
    width: "210px",
    "@media(max-width: 720px)": {
      width: "150px",
    },
  };

  const __Body_upperPart_selectASong = {
    fontSize: "80px",
    fontWeight: "900",
    "@media(max-width: 910px)": { fontSize: "55px" },
    "@media(max-width: 720px)": { fontSize: "35px" },
  };

  const __Body_lowerPart = {
    margin: "30px 0 0 0",
    width: "100%",
    background: "	rgb(0, 0, 0, 0.3)",
    backdropFilter: "blur(20px)",
    padding: "20px 0",
    height: "500px",
    overflowY: "scroll",
  };

  return (
    <Box sx={__Body_main}>
      <Header />

      <Box sx={__Body_upperPart}>
        <Box sx={__Body_upperPart_playlistBox}>
          <img
            width="100%"
            src={list ? list.images[0].url : song}
            alt="playlist"
            style={{ display: "block" }}
          />
        </Box>

        <Box>
          <Typography fontSize="12px" fontWeight="bold">
            {list ? "PLAYLIST" : null}
          </Typography>
          <Typography sx={__Body_upperPart_selectASong}>
            {list ? list.name : "Select a playlist"}
          </Typography>
          <Typography fontSize="14px" fontWeight="bold">
            {list ? String(list.tracks.items.length) + " songs" : null}
          </Typography>
        </Box>
      </Box>

      {list ? (
        <Box sx={__Body_lowerPart}>
          <Box padding="20px">
            <IconButton
              aria-label={playingStatus ? "play" : "pause"}
              onClick={statusChangeHandler}
              style={{
                backgroundColor: "#1db954",
                color: "Black",
              }}
            >
              {!playingStatus ? (
                <PlayArrowIcon style={{ fontSize: "40px" }} />
              ) : (
                <PauseIcon style={{ fontSize: "40px" }} />
              )}
            </IconButton>
          </Box>

          {list.tracks.items.map((song) => {
            return <BodyListItem song={song.track} />;
          })}
        </Box>
      ) : null}
    </Box>
  );
}

export default Body;
