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
        justifyContent: "space-between",
        padding: "4rem 0 8rem",
      }}
    >
      <img width="40%" src={spotifyLogo} alt="logo" />
      <SpotifyButton onClick={clickHandler} component="a">
        LOGIN TO SPOTIFY
      </SpotifyButton>
    </Box>
  );
}

export default LoginPage;
