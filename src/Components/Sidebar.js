import { Box, Typography } from "@mui/material";
import spotifyLogo from "../Assets/spotifyLogo.png";

import SidebarOptions from "./SubComponents/SidebarOptions";
import { MdHomeFilled } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import { BiLibrary } from "react-icons/bi";

import SidebarPlaylists from "./SubComponents/SidebarPlaylists";
// import plus from "../Assets/plus.jpg";

import { useContext, useEffect } from "react";
import SpotifyContext from "../Context/SpotifyContext";

import axios from "axios";

function Sidebar() {
  const { token, setPlaylists, playlists, setPlaylistId, setList, audio, setAudio, setPlayingStatus, setPlayingSong } =
    useContext(SpotifyContext);

  useEffect(() => {
    const getPlaylists = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      setPlaylists(data.items);
    };
    getPlaylists();
  }, []);

  const playlistSelectHandler = (e) => {
    setPlaylistId(e.target.id);
  };

  const homeClickHandler = () => {
    if(audio != null) {
      audio.pause();
      setAudio(null);
    }
    setPlayingSong(null);
    setPlayingStatus(false);
    setPlaylistId(null);
    setList(null);
  };

  return (
    <Box
      sx={{
        flex: "0.12",
        height: "100vh",
        backgroundColor: "#000000",
        color: "White",
        minWidth: "200px",
        padding: "20px",
      }}
    >
      <Box width="130px" margin="5px 0 0 5px">
        <img width="100%" src={spotifyLogo} alt="logo" />
      </Box>

      <Box margin="25px 0 0 5px">
        <SidebarOptions
          name="Home"
          addProps={homeClickHandler}
          icon={<MdHomeFilled />}
        />
        <SidebarOptions name="Search" icon={<RiSearch2Line />} />
        <SidebarOptions name="Library" icon={<BiLibrary />} />
      </Box>

      <Typography fontWeight="bold" margin="30px 0 10px 5px" fontSize="12px">
        PLAYLISTS
      </Typography>

      {playlists ? (
        <Box margin="10px 0 0 5px">
          {playlists.map((playlist) => {
            return (
              <SidebarPlaylists
                name={playlist.name}
                url={playlist.images[0].url}
                id={playlist.id}
                key={playlist.id}
                playlistSelectHandler={playlistSelectHandler}
              />
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
}

export default Sidebar;
