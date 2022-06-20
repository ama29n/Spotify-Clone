import { Box } from "@mui/material";

function SidebarPlaylists({ name, playlistSelectHandler, id }) {
  return (
    <Box
      onClick={playlistSelectHandler}
      id={id}
      sx={{
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
      }}
    >
      {name}
    </Box>
  );
}

export default SidebarPlaylists;
