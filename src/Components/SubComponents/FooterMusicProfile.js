import { Box, Typography } from "@mui/material";
import plus from "../../Assets/song.jpg";

function FooterMusicProfile() {
  return (
    <Box sx={{
        width: "200px",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        // border: "2px solid white"
    }}>
        <Box><img width="50px" height="auto" src={plus} alt="profile" /></Box>

        <Box>
            <Typography fontSize="14px" fontWeight="bold">Name</Typography>
            <Typography fontSize="12px" color="Gray">Artist</Typography>
        </Box>
    </Box>
  );
}

export default FooterMusicProfile;