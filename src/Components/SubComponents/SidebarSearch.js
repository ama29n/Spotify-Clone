import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useState, useContext } from "react";
import SpotifyContext from "../../Context/SpotifyContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {

    const { setPlayingSong, setPlayedPart } = useContext(SpotifyContext);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [searchInput, setSearchInput] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const searchHandler = async () => {
    const options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/search",
      params: { q: searchInput },
      headers: {
        "X-RapidAPI-Key": "1c434e7680mshfad14dbc09c5168p129f36jsn7c75b0cd65d2",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setDisplayData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        style={{}}
        onClick={handleClickOpen}
        startIcon={
          <SearchIcon
            style={{ fontSize: "27px", marginRight: "4px" }}
          />
        }
        disableRipple
        sx={{
          backgroundColor: "black",
          padding: "0px 8px",
          color: "Gray",
          fontWeight: "bold",
          transition: "250ms color ease-in",
          marginBottom: "8px",
          "&:hover": {
            color: "White",
            backgroundColor: "Black",
          },
        }}
      >
        {`Search`}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 40px 0px 0px",
              gap: "10rem"
            }}
          >
            <TextField
              placeholder="Let's spotify"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#282828"
                  }
                }
              }}
            />
            <Button disableRipple sx={{
                backgroundColor: "#282828",
                color: "white",
                "&:hover": {
                    backgroundColor: "Black"
                }
            }} type="contained" onClick={searchHandler}>
              Search
            </Button>
          </Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{
            height: "500px",
            overflowY: "scroll"
          }}>
          {displayData?.length > 0 && displayData.map((info) => {
            const obj = {
                customName: info.title,
                customAlbum: info.album?.title,
                customArtist: info.artist?.name,
                preview_url: info.preview,
                customCover: info.album?.cover
            };
            return (
                <Box key={info.id} display="flex" gap="1rem" alignItems="center" marginBottom="20px" onClick={() => {
                  setPlayingSong(obj);
                  setPlayedPart(0);
                  setOpen(false);
                }} sx={{
                  cursor: "pointer",
                  borderBottom: "1px solid white",
                  borderTop: "1px solid white",
                  transition: "200ms border-bottom-color ease-in, 200ms border-top-color ease-in",
                  '&:hover': {
                    backgroundColor: "#fdfdfd",
                    borderBottomColor: "#e8e8e8",
                    borderTopColor: "#e8e8e8"
                  }
                }}>
                    <Box sx={{
                        width: "70px", height: "70px"
                    }}>
                        <img style={{ width: "100%", height: "auto" }} src={info.artist.picture} alt="artist" />
                    </Box>
                    <Box>
                        <Box sx={{ fontWeight: "bold" }}>{info.title}</Box>
                        {info?.artist && <Box>{`Artist: ${info.artist.name}`}</Box>}
                        {info?.album && <Box>{`Album: ${info.album.title}`}</Box>}
                    </Box>
                </Box>
            )
          })}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
