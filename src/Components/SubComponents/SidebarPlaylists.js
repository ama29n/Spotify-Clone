import { Box } from "@mui/material";

function SidebarPlaylists({ name, url }) {
  return (
    <Box sx={{
        cursor: "pointer",
        fontSize: "14px",
        color: "Gray",
        fontWeight: "bold",
        marginBottom: "12px",
        transition: "250ms color ease-in",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        "&:hover": {
            color: "White",
          },
    }}>
        <Box>
            {name}
        </Box>
    </Box>
  )
}

export default SidebarPlaylists;