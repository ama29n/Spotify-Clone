import Sidebar from "../Components/Sidebar";
import Body from "../Components/Body";
import Footer from "../Components/Footer";

import { Box } from "@mui/material";

function PlayerPage() {
  return (
    <Box>
        <Box sx={{
            display: "flex",
            position: "relative",
        }}>
            <Sidebar />
            <Body />
        </Box>

        <Footer />
    </Box>
  );
}

export default PlayerPage;