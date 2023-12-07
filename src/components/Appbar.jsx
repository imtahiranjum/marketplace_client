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
import efarmlogo from "assets/efarmlogo.png";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, InputBase, Link, Skeleton, Snackbar } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useGetUserByEmailQuery, useLogoutUserMutation } from "state/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUserEmail, setUserId } from "state";

const pages = ["Cattle List"];
const settings = ["Profile", "Logout"];

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function ResponsiveAppBar() {
  const userEmail = useSelector((state) => state.global.userEmail);
  const { data, isLoading, isSuccess } = useGetUserByEmailQuery(userEmail);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [userName, setUserName] = React.useState(
    data ? data.first_name : <Skeleton width={30} />
  );
  const [switchButtonAction, setSwitchButtonAction] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser, result] = useLogoutUserMutation();
  const [isSignedIn, setIsSignedIn] = React.useState(userEmail ? true : false);
  const [isSeller, setIsSeller] = React.useState(false);
  const [isBuyer, setIsBuyer] = React.useState(false);
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);

  React.useEffect(() => {
    if (data === undefined) {
      setUserName(<Skeleton width={80} />);
    } else {
      setUserName(data.first_name);
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (data && !isLoading) {
      data.roles.map((role) => {
        if (role == "seller") {
          setIsSeller(true);
        }
        if (role == "buyer") {
          setIsBuyer(true);
        }
      });
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if ((data && !isLoading) || !isSignedIn) {
      isSignedIn
        ? !isSeller
          ? setSwitchButtonAction(
              <Button
                component="label"
                variant="contained"
                onClick={handleSwitch}
                sx={{
                  borderRadius: 3,
                  color: "white",
                }}
                color="secondary"
                disabled={false}
                size="medium"
              >
                Become Seller
              </Button>
            )
          : setSwitchButtonAction(
              <Button
                component="label"
                variant="contained"
                onClick={handleSwitchDashboard}
                sx={{
                  borderRadius: 3,
                  color: "white",
                }}
                color="secondary"
                disabled={false}
                size="medium"
              >
                Your Dashboard
              </Button>
            )
        : setSwitchButtonAction(
          
          <Button
          component="label"
          variant="contained"
          onClick={handleSwitch}
          sx={{
            borderRadius: 3,
            color: "white",
          }}
          color="secondary"
          disabled={false}
          size="medium"
        >
          Become Seller!
        </Button>
        );
    }
  }, [isSeller, isSuccess, isSignedIn, isLoggedOut]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSwitchDashboard = () => {
    if (isSeller) {
      navigate("/sellerdashboard", {
        replace: false,
        state: {},
      });
    } else {
      navigate("/userdashboard", {
        replace: false,
        state: {},
      });
    }
  };
  const handleSwitch = () => {
    if (isSignedIn) {
      navigate("/registerseller", {
        replace: false,
        state: {
          context: "becomeseller",
          from: "onsalecattle",
          userEmail: userEmail,
        },
      });
    } else {
      navigate("/signup", {
        replace: false,
        state: { context: "becomeseller", from: "onsalecattle" },
      });
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  const handleSetAction = (action) => {
    setAction(action);
  };

  const logoutAction = async () => {
    const payload = await logoutUser();
    dispatch(setUserEmail(""));
    dispatch(setUserId(""));
    dispatch(setIsLoggedIn(false));
  };

  React.useEffect(() => {
    if (action == "Profile") {
      navigate("/userprofile", {
        replace: false,
        state: { userEmail: userEmail },
      });
    }
  }, [action]);

  React.useEffect(() => {
    if (action == "Logout") {
      logoutAction();
      setIsLoggedOut(true);
      setIsSignedIn(false);
      if (!result.error) {
        setAlertOpen(true);
        setSwitchButtonAction("");
        navigate("/onsalecattle", {
          replace: false,
        });
      }
    }
  }, [action]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ width: 500 }}>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={alertOpen}
              onClose={handleAlertClose}
              autoHideDuration={6000}
              key={"bottomcenter"}
            >
              <Alert
                onClose={handleAlertClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Logged Out Successfully
              </Alert>
            </Snackbar>
          </Box>
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: "block",
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleOpenNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <img
              href="/"
              src={efarmlogo}
              width={40}
              height={40}
              sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 1,
                mr: 3,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              eFarm
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex" }}></Box>
            {/* <Image
              src={"srcassetsefarmlogo.png"}
              href="/"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            /> */}
            {/* <img href="/" src={efarmlogo} width={40} height={40} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                // mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              eFarm
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            {switchButtonAction}
            <Search
              sx={{ display: { xs: "none", md: "flex", marginRight: "1rem" } }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {isSignedIn ? (
              <Box
                sx={{
                  margin: "1rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignContent: "center",
                  justifyItems: "center",
                }}
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Tooltip title="Open settings">
                    {data && !isLoading && isSuccess ? (
                      data.profile && data.profile.profile_image ? (
                        <Avatar alt="" src={data.profile.profile_image} />
                      ) : (
                        <Avatar alt="" src={data.name} />
                      )
                    ) : (
                      <Skeleton
                        variant="circular"
                        width={30}
                        height={30}
                        sx={{
                          marginRight: "0.5rem",
                          marginLeft: "0.5rem",
                          color: "white",
                        }}
                      />
                    )}
                  </Tooltip>
                  <Typography
                    sx={{
                      marginRight: "0.5rem",
                      marginLeft: "0.5rem",
                      color: "white",
                    }}
                  >
                    {userName}
                  </Typography>
                </IconButton>
                {data && !isLoading ? (
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleSetAction(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                ) : (
                  <></>
                )}
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  href="/signin"
                  sx={rightLink}
                >
                  {"Sign In"}
                </Link>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
