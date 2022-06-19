import Header from "./Header";
import BodyListItem from "./SubComponents/BodyListItem";

import { Box, Typography } from "@mui/material";

import { useContext } from "react";
import SpotifyContext from "../Context/SpotifyContext";

function Body() {

  const values = useContext(SpotifyContext);
  const songs = values.list.tracks.items;
  console.log(songs);

  return (
    <Box sx={{
        flex: "0.88",
        background: "linear-gradient(#513A9D, Black)",
        height: "100vh",
        color: "White",
    }}>

        <Header />
        
        <Box sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: "1.5rem",
          margin: "10px 0 0 60px"
        }}>
          <Box boxShadow="1px 1px 30px Black" width="230px">
            <img width="100%" src="https://mosaic.scdn.co/640/ab67616d0000b2731c8193de8d62b2ffa49a09dbab67616d0000b2733042c53026e29faf3a21c9f9ab67616d0000b27356ac7b86e090f307e218e9c8ab67616d0000b2737636e1c9e67eaafc9f49aefd" alt="aman" />
          </Box>

          <Box>
            <Typography fontSize="12px" fontWeight="bold">PLAYLIST</Typography>
            <Typography fontSize="80px" fontWeight="900">Aman</Typography>
            <Typography fontSize="14px" fontWeight="bold">29 Songs</Typography>
          </Box>
        </Box>

        <Box sx={{
          margin: "30px 0 0 0",
          width: "100%",
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          padding: "20px"
        }}>
          {songs.map(song => {
            return <BodyListItem song={song} />
          })}
        </Box>
    </Box>
  );
}

export default Body;