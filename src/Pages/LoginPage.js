import { Box } from "@mui/material";
import SpotifyButton from "../Components/SubComponents/SpotifyButton";
import spotifyLogo from "../Assets/spotifyLogo.png";
import { loginUrl } from "../spotify";

function LoginPage() {
  const clickHandler = e => {
    e.preventDefault();
    window.location.assign(loginUrl);
  }
  return (
    <Box
      sx={{
        backgroundColor: "Black",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "4rem 0 8rem",
      }}
    >
      <h1 style={{
        color: "White",
        fontSize: "6rem"
      }}>SPOKIFY</h1>
      <SpotifyButton onClick={clickHandler} component="a">
        LOGIN TO SPOKIFY
      </SpotifyButton>
    </Box>
  );
}

export default LoginPage;
