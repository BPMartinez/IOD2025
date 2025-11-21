import { Routes, Route } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";

import { MoodProvider } from "./context/MoodContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import BitcoinPage from "./pages/BitcoinPage";

function App() {
  return (
    <MoodProvider>
      <Box>
        <Navbar />
        <Container sx={{ mt: 3 }}>
          <Typography variant="h1" gutterBottom>
            Module 7 – Crypto App
          </Typography>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bitcoin" element={<BitcoinPage />} />
          </Routes>
        </Container>
      </Box>
    </MoodProvider>
  );
}

export default App;
