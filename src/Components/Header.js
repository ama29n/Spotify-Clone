import { useState, useContext, useEffect } from "react";
import SpotifyContext from "../Context/SpotifyContext";

import { Box, IconButton, Button, Menu, MenuItem, Avatar } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import UserImage from "../Assets/User.png";

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

  const { token, setUser, user } = useContext(SpotifyContext);

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
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px 10px 10px",
        mt: "20px"
      }}
    >
      <Box display="flex" gap="1rem">
        <ThemeProvider theme={darkTheme}>
          <IconButton
            sx={{
              backgroundColor: "#0A0A0A",
              "&:hover": {
                backgroundColor: "#282828"
              }
            }}
          >
            <KeyboardArrowLeftIcon htmlColor={"#fff"} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#0A0A0A",
              "&:hover": {
                backgroundColor: "#282828"
              }
            }}
          >
            <KeyboardArrowRightIcon htmlColor={"#fff"} />
          </IconButton>
        </ThemeProvider>
      </Box>

      <Box>
        <ThemeProvider theme={darkTheme}>
          <Button
            id="basic-button"
            onClick={handleClick}
            sx={{
              backgroundColor: "#0A0A0A",
              color: "White",
              textTransform: "none",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#282828"
              }
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap="1rem"
              padding="0px 10px"
            >
              <Avatar src={user ? user.images[0].url : UserImage} alt={UserImage}/>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default Header;
