import { Box, Typography } from "@mui/material";

function BodyListItem({ song }) {
  
  const time = (Number(song.duration_ms) / 60000).toFixed(2);
    
  return (
    <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
        gap: "1rem",
        alignItems: "center",
        cursor: "pointer",
        padding: "10px 20px",
        "&:hover": {
            // backgroundColor: "#5A5A5A"
            backgroundColor: "Black"
        }
    }}>
        <Box flex="0.35" display="flex" gap="0.7rem" alignItems="center">
            <img width="45px" src={song.album.images[0].url} alt="" />
            <Box>
                <Typography fontSize="16px" fontWeight="500">{song.name}</Typography>
                <Typography fontSize="14px" color="#9C9C9F" fontWeight="500">{song.artists[0].name}</Typography>
            </Box>
        </Box>

        <Box flex="0.30">
            <Typography fontSize="14px" color="#9C9C9f" fontWeight="500">{song.album.name}</Typography>
        </Box>

        <Box flex="0.25">
            <Typography fontSize="14px" color="#9C9C9f" fontWeight="500">{song.album.release_date}</Typography>
        </Box>

        <Box flex="0.10" alignSelf="center">
        <Typography fontSize="14px" color="#9C9C9f" fontWeight="500">{time}</Typography>
        </Box>
    </Box>
  )
}

export default BodyListItem;