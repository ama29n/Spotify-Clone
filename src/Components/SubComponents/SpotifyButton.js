import { Button } from "@mui/material";

function SpotifyButton(props) {
  return (
    <Button
      variant="contained"
      color="success"
      style={{
        borderRadius: 50,
        backgroundColor: "#1db954",
        fontWeight: "bold",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default SpotifyButton;
