import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";

import {
  ThemeProvider,
  styled,
  useTheme,
  createTheme,
} from "@mui/material/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import UserMenu from "./UserMenu";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
      setIsLogin(true);
    }
  }, [showModal, isLogin])


  const logout = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
    setOpenDrawer(false);
    navigate('/');
  }

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handlerDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleThemeChange = () => {
    setDarkMode(!isDarkMode);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={openDrawer}>
          <Toolbar>
            {isLogin && <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, ...(openDrawer && { display: "none" }) }}
              onClick={handlerDrawer}
            >
              <MenuIcon />
            </IconButton>
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E diary
            </Typography>
            {isLogin ? <UserMenu user={user} logout={logout} /> : <Button color='inherit' onClick={() => setShowModal(true)}> Login </Button>}

          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <DrawerHeader>
            <IconButton onClick={handlerDrawer}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List sx={{ pt: 0 }}>
            <ListItem disablePadding component={NavLink} to="subjects">
              <ListItemButton>
                <ListItemText primary="Subjects" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding component={NavLink} to="teachers">
              <ListItemButton>
                <ListItemText primary="Teachers" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={isDarkMode} onChange={handleThemeChange} />
                  }
                  label={isDarkMode ? "Light mode" : "Dark mode"}
                />
              </FormGroup>
            </ListItem>
            <Divider />

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
            </Menu>
          </List>
        </Drawer>
        <Main open={openDrawer}>
          <DrawerHeader />
          {showModal && <LoginModal show={showModal} handleCloseModal={() => setShowModal(false)} />}
          <Outlet></Outlet>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
