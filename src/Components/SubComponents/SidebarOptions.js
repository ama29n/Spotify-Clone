import { Box } from "@mui/material";

function SidebarOptions({ name, icon }) {
  return (
    <Box
      sx={{
        cursor: "pointer",
        fontSize: "14px",
        color: "Gray",
        transition: "250ms color ease-in",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        "&:hover": {
          color: "White",
        },
      }}
    >
      <Box fontSize="28px">{icon}</Box>
      <Box fontWeight="bold">{name}</Box>
    </Box>
  );
}

export default SidebarOptions;
