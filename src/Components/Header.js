import { useState, useContext, useEffect } from "react";
import SpotifyContext from "../Context/SpotifyContext";

import {
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LyricsIcon from "@mui/icons-material/Lyrics";

import UserImage from "../Assets/User.jpg";

import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { token, setUser, user, setToken, playingSong } =
    useContext(SpotifyContext);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      setUser(data);
    };
    getUser();
  }, []);

  const lyricsHandler = async () => {
    if (!playingSong) return;
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://genius-song-lyrics1.p.rapidapi.com/search/",
      params: {
        q: playingSong.customName,
        per_page: "10",
        page: "1",
      },
      headers: {
        "X-RapidAPI-Key": "1c434e7680mshfad14dbc09c5168p129f36jsn7c75b0cd65d2",
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    try {
      console.log(playingSong);
      const response = await axios.request(options);
      // console.log(response.data.hits[0].result.url);
      window.open(response.data.hits[0].result.url, "_black", "width=700,height=580,top=78,left=1000,menubar=no");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px 10px 10px",
        mt: "20px",
      }}
    >
      {true && (
        <Box display="flex" gap="1rem">
          <ThemeProvider theme={darkTheme}>
            <Tooltip title="Lyrics">
              <IconButton
                sx={{
                  backgroundColor: "#181818",
                  "&:hover": {
                    backgroundColor: "#282828",
                  },
                }}
                onClick={lyricsHandler}
              >
                <LyricsIcon htmlColor={"#fff"} />
              </IconButton>
            </Tooltip>
          </ThemeProvider>
        </Box>
      )}

      <Box>
        <ThemeProvider theme={darkTheme}>
          <Button
            id="basic-button"
            onClick={handleClick}
            sx={{
              backgroundColor: "#181818",
              color: "White",
              textTransform: "none",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#282828",
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap="1rem"
              padding="0px 1rem 0px 1px"
            >
              <Avatar
                src={user?.images[0]?.url ? user.images[0].url : UserImage}
                alt={UserImage}
              />
              <Box>{user ? user.display_name : "User"}</Box>
            </Box>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => {window.open(user.external_urls.spotify)}}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                setUser(null);
                setToken(null);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default Header;
