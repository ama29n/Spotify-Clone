import Header from "./Header";
import BodyListItem from "./SubComponents/BodyListItem";

import { Box, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import { useContext, useEffect, useState } from "react";
import SpotifyContext from "../Context/SpotifyContext";

import song from "../Assets/song.jpg";

import axios from "axios";

function Body() {
  const { playlistId, setList, list, token } = useContext(SpotifyContext);

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
        console.log(playlist.data.tracks.items[0].track);
        setList(playlist.data);
      }
    };
    getPlaylist();
  }, [playlistId]);

  const [paused, setPaused] = useState(false);

  return (
    <Box
      sx={{
        flex: "0.88",
        // background: "linear-gradient(#8E7F7F, Black)",
        background: "linear-gradient(#D3474F, Black)",
        height: "100vh",
        color: "White",
      }}
    >
      <Header />

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: "1.5rem",
          margin: "10px 0 0 60px",
        }}
      >
        <Box boxShadow="1px 1px 30px Black" width="230px" >
          <img
            width="100%"
            src={ list ? list.images[0].url : song }
            alt="aman"
            style={{ display: "block"}}
          />
        </Box>

        <Box>
          <Typography fontSize="12px" fontWeight="bold">
            {list ? "PLAYLIST" : null}
          </Typography>
          <Typography fontSize="80px" fontWeight="900">
            {list ? list.name : "Select a playlist"}
          </Typography>
          <Typography fontSize="14px" fontWeight="bold">
            {list ? String(list.tracks.items.length) + " songs" : null}
          </Typography>
        </Box>
      </Box>

      {list ? (
        <Box
          sx={{
            margin: "30px 0 0 0",
            width: "100%",
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(40px)",
            padding: "20px 0",
            height: "300px",
            overflow: "scroll",
          }}
        >
          <Box padding="20px">
            <IconButton
              aria-label={paused ? "play" : "pause"}
              onClick={() => setPaused(!paused)}
              style={{
                backgroundColor: "#1db954",
                color: "Black",
              }}
            >
              {!paused ? (
                <PlayArrowIcon style={{fontSize: "40px"}} />
              ) : (
                <PauseIcon style={{fontSize: "40px"}} />
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
