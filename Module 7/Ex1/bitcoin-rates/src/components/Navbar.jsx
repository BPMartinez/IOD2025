import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: "inherit",
    textDecoration: "none",
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Crypto Dashboard
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <NavLink to="/" style={linkStyle} end>
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink to="/login" style={linkStyle}>
            <Button color="inherit">Login</Button>
          </NavLink>
          <NavLink to="/bitcoin" style={linkStyle}>
            <Button color="inherit">Bitcoin Rates</Button>
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
