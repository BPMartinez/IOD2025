import { Box, Paper, Typography } from "@mui/material";
import BitcoinRates from "../components/BitcoinRates";

function BitcoinPage() {
  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h2" gutterBottom>
          Bitcoin Rates
        </Typography>
        <BitcoinRates />
      </Paper>
    </Box>
  );
}

export default BitcoinPage;
