import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import history from "../history";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { baseUrl } from "../Context/BaseApi/server";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "70px",
    justifyContent: "center",
  },
  title: {
    textDecoration: "none",
    // color: "black",
    fontWeight: "bold",
  },
  linkText: {
    textDecoration: "none",
    fontSize: "16px",
    marginLeft: "10px",
    color: "white",
    paddingTop: "5px",
  },
  buttonLink: {
    textDecoration: "none",
    color: "white",
  },
  avatar: {
    backgroundColor: "blue",
  },
  profileMenue: {
    display: "flex",
    height: "50px",
    cursor: "pointer",
    marginTop: "15px",
  },
  icons: {
    position: "absolute",
    right: "40%",
    "@media (max-width: 1030px)": {
      position: "absolute",
      right: "0",
    },
    "@media (max-width: 715px)": {
      display: "none",
    },
  },
  authButtons: {
    position: "absolute",
    right: "0",
    "@media (max-width: 1030px)": {
      display: "none",
    },
  },
  menuButton: {
    display: "none",
    "@media (max-width: 1030px)": {
      display: "block",
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));
// window.innerWidth < 1030?
export default function Nav() {
  const classes = useStyles();
  const { isSignedIn, user, handleSignout } = useContext(AuthContext);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleLogout = () => {
    handleSignout();
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="primary" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawer}
            >
              <MenuIcon />
            </IconButton>
            {/* <Link to="/" className={classes.title}> */}
            <Typography variant="h6" className={classes.title} color="inherit">
              Kwanso Social Media
            </Typography>
            {/* <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "./logo.png"}
                className={classes.title}
              /> */}
            {/* </Link> */}

            <div className={classes.icons}>
              <Link to="/" className={classes.linkText}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <HomeOutlinedIcon />
                  <span className={classes.linkText}>Home</span>
                </IconButton>
              </Link>
              <Link to={"/contactus"} className={classes.linkText}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <ContactPhoneIcon />
                  <span className={classes.linkText}>Contact</span>
                </IconButton>
              </Link>

              {isSignedIn ? (
                <Link to="/dashboard" className={classes.linkText}>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <DashboardIcon />
                    <span className={classes.linkText}>Dashboard</span>
                  </IconButton>
                </Link>
              ) : (
                //
                ""
              )}
            </div>

            <div className={classes.authButtons}>
              {!isSignedIn ? (
                <>
                  <Link to="/" className={classes.buttonLink}>
                    <Button variant="outlined" color="inherit">
                      signin
                    </Button>
                  </Link>
                  <Link to="/signup" className={classes.buttonLink}>
                    <Button
                      variant="contained"
                      color="default"
                      style={{ marginLeft: "10px" }}
                    >
                      SignUp
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className={classes.profileMenue}
                    onClick={handleProfileMenuOpen}
                  >
                    <Avatar
                      className={classes.avatar}
                      src={
                        user && user.profileImage
                          ? baseUrl + "/" + user.profileImage
                          : "/ssa"
                      }
                    />
                    <span
                      className={classes.linkText}
                      style={{ marginTop: "4px" }}
                    >
                      {" "}
                      {user ? user.email : ""}
                    </span>
                    {/* </IconButton> */}
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                  >
                    <Link
                      to="/myProfile"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Signout</MenuItem>
                  </Menu>
                </>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Hidden>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {<ChevronLeftIcon />}
            </IconButton>
          </div>

          <List component="nav" aria-label="main mailbox folders">
            {/* <Link to="/" style={{ textDecoration: "none" }}> */}
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" style={{ color: "black" }} />
            </ListItem>
            {/* </Link> */}
            <Divider />
            {isSignedIn ? (
              <>
                <Link
                  to="/dashboard"
                  color="primary"
                  style={{ textDecoration: "none" }}
                >
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                </Link>
                <Divider />
              </>
            ) : (
              ""
            )}
            <Link
              to={"/contactus"}
              color="primary"
              style={{ textDecoration: "none" }}
            >
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <ContactPhoneIcon />
              </ListItemIcon>
              <ListItemText primary="Contactus" style={{ color: "black" }} />
            </ListItem>
            </Link>
            <Divider />

            {/* <Link to="/aboutus" style={{ textDecoration: "none" }}>
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Aboutus" style={{ color: "black" }} />
              </ListItem>
            </Link>
            <Divider /> */}
            {isSignedIn === false ? (
              <>
                <Link
                  to="/auth/Login"
                  color="primary"
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <AccountCircleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" style={{ color: "black" }} />
                  </ListItem>
                </Link>
                <Divider />
                <Link
                  to="/signup"
                  color="primary"
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <PersonAddOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Signup" style={{ color: "black" }} />
                  </ListItem>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/myProfile"
                  // color="primary"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem button>
                    <ListItemIcon onClick={handleDrawerClose}>
                      <AccountCircleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                </Link>
                <Divider />
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon onClick={handleDrawerClose}>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Signout" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Hidden>
    </div>
  );
}
