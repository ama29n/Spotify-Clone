import { Box } from "@mui/material";
import FooterMusicProfile from "./SubComponents/FooterMusicProfile";
import FooterMusicOptions from "./SubComponents/FooterMusicOptions";
import FooterSound from "./SubComponents/FooterSound";

function Footer() {
  return (
    <Box
      sx={{
        height: "90px",
        position: "absolute",
        bottom: "0",
        backgroundColor: "#181818",
        width: "100%",
        color: "White",
        padding: "10px 30px",
        borderTop: "2px solid #282828",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        '@media(max-width: 780px)' : {
          justifyContent: "flex-start",
          gap: "4rem"
        }
      }}
    >
      <FooterMusicProfile />
      <FooterMusicOptions />
      <FooterSound />
    </Box>
  );
}

export default Footer;
