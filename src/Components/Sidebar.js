import { Box, Typography } from "@mui/material";
import spotifyLogo from "../Assets/spotifyLogo.png";

import SidebarOptions from "./SubComponents/SidebarOptions";
import { MdHomeFilled } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import { BiLibrary } from "react-icons/bi";

import SidebarPlaylists from "./SubComponents/SidebarPlaylists";
// import plus from "../Assets/plus.jpg";

import { useContext } from "react";
import SpotifyContext from "../Context/SpotifyContext";

function Sidebar() {

  const values = useContext(SpotifyContext);
  
  return (
    <Box sx={{
        flex: "0.12",
        height: "100vh",
        backgroundColor: "#000000",
        color: "White",
        minWidth: "200px",
        padding: "20px"
    }}>
        <Box width="130px" margin="5px 0 0 5px">
            <img width="100%" src={spotifyLogo} alt="logo"/>
        </Box>

        <Box margin="25px 0 0 5px">
            <SidebarOptions name="Home" icon={<MdHomeFilled />} />
            <SidebarOptions name="Search" icon={<RiSearch2Line />} />
            <SidebarOptions name="Library" icon={<BiLibrary />} />
        </Box>

        <Typography fontWeight="bold" margin="30px 0 10px 5px" fontSize="12px">PLAYLISTS</Typography>

        <Box margin="10px 0 0 5px">
            {values.playlists.items.map(playlist => {
                return <SidebarPlaylists name={playlist.name} url={playlist.images[0].url} />
            })}
        </Box>
    </Box>
  );
}

export default Sidebar;