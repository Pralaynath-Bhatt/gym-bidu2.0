import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";

const pages = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Plans", link: "/plans" },
  { id: 3, name: "My Workout", link: "/myworkout" },
  { id: 4, name: "My Details", link: "/profile" },
  { id: 5, name: "AI Model", link: "/aimodel" },
];

const settings = ["Profile", "Logout"];

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spinHover = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const popIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Adjust as per auth

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        animation: `${fadeIn} 0.6s ease-out`,
        borderRadius: "15px",
        margin: "10px",
        width: "calc(100% - 20px)",
        backgroundColor: "#222",
        boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo large */}
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              transition: "transform 0.6s",
              "&:hover": {
                animation: `${spinHover} 0.8s linear`,
              },
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              animation: `${popIn} 0.5s ease`,
            }}
          >
            GYM
          </Typography>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                animation: `${fadeIn} 0.4s ease`,
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={page.link}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile logo */}
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              "&:hover": {
                animation: `${spinHover} 0.8s linear`,
              },
            }}
          />

          {/* Desktop Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  position: "relative",
                  fontWeight: 500,
                  mx: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#90caf9",
                    backgroundColor: "transparent",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    transform: "scaleX(0)",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "#90caf9",
                    transformOrigin: "bottom right",
                    transition: "transform 0.3s ease-out",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                    transformOrigin: "bottom left",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Avatar / Auth Buttons */}
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      p: 0,
                      transition: "transform 0.5s",
                      "&:hover": {
                        transform: "rotate(360deg) scale(1.1)",
                      },
                    }}
                  >
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "20px",
                    padding: "6px 12px",
                    marginRight: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#555",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    color: "white",
                    backgroundColor: "#1976d2",
                    borderRadius: "20px",
                    padding: "6px 12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
