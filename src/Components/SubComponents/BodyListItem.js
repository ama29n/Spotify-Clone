import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import SpotifyContext from "../../Context/SpotifyContext";
import axios from "axios";

function BodyListItem({ song }) {
  const { setPlayingSong, token } = useContext(SpotifyContext);

  const minutes = Math.floor(song.duration_ms / 60000);
  const seconds = ((song.duration_ms % 60000) / 1000).toFixed(0);

  const time =
    minutes +
    " : " +
    (Math.floor(seconds / 10) === 0 ? "0" + seconds : seconds);

  const musicSelectHandler = async (e) => {
    const song = await axios.get(
      `https://api.spotify.com/v1/tracks/${e.target.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    setPlayingSong(song.data);
  };

  return (
    <Box
      id={song.id}
      key={song.id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
        gap: "1rem",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "2px solid transparent",
        borderTop: "2px solid transparent",
        "&:hover": {
          backgroundColor: "Black",
          borderBottom: "2px solid #282828",
          borderTop: "2px solid #282828"
        },
      }}
    >
      <Box
        flex="0.50"
        sx={{ cursor: "pointer", }}
        display="flex"
        gap="0.7rem"
        alignItems="center"
        pl="2rem"
        id={song.id}
        onClick={musicSelectHandler}
      >
        <img
          width="45px"
          src={song.album.images[0].url}
          alt=""
          id={song.id}
        />
        <Box>
          <Typography
            fontSize="17px"
            fontWeight="500"
            id={song.id}
          >
            {song.name}
          </Typography>
          <Typography
            fontSize="15px"
            color="#E0E0E0"
            fontWeight="500"
            id={song.id}
          >
            {song.artists[0].name}
          </Typography>
        </Box>
      </Box>

      <Box flex="0.40" id={song.id}>
        <Typography
          fontSize="15px"
          color="#E0E0E0"
          fontWeight="500"
          id={song.id}
          onClick={musicSelectHandler}
          sx={{ cursor: "pointer", }}
        >
          {song.album.name}
        </Typography>
      </Box>

      <Box flex="0.10" id={song.id}>
        <Typography
          fontSize="15px"
          color="#E0E0E0"
          fontWeight="500"
          id={song.id}
          onClick={musicSelectHandler}
          sx={{ cursor: "pointer", }}
        >
          {time}
        </Typography>
      </Box>
    </Box>
  );
}

export default BodyListItem;
