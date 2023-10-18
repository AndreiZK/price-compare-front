import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  CurrencyExchange,
  LightMode,
  DarkMode,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../redux/rootReducer";
import { ThemeContext } from "../theme/themeContext";
import { removeUser } from "../redux/userSlice";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user);

  const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
  const logoutOpen = Boolean(logoutAnchor);

  const handleLogout = () => {
    dispatch(removeUser());
  };

  const handleOpenLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLogoutAnchor(e.currentTarget);
  };

  const handleCloseLogout = () => {
    setLogoutAnchor(null);
  };

  const getWidth = () => {
    return window.innerWidth;
  };

  const [screenWidth, setScreenWidth] = useState(getWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(getWidth);
    });

    return window.removeEventListener("resize", () => {
      setScreenWidth(getWidth);
    });
  }, [screenWidth]);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start">
          <CurrencyExchange />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PriceCompare
        </Typography>
        <IconButton
          sx={{ marginLeft: "auto", marginRight: 0 }}
          onClick={toggleTheme}
        >
          {theme === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
        {screenWidth < 700 && (
          <IconButton onClick={() => setIsMenuOpen((prev) => !prev)}>
            <MenuIcon />
          </IconButton>
        )}
        <Stack
          className={screenWidth < 700 ? (isMenuOpen ? "open" : "hidden") : ""}
          direction={screenWidth > 700 ? "row" : "column"}
          spacing="2"
        >
          <Link to="/">
            <Button
              sx={{ color: "white" }}
              className={screenWidth < 700 ? "mobile-btn" : ""}
            >
              Главная
            </Button>
          </Link>
          {userData.isAuth ? (
            <>
              <Button
                sx={{ color: "white" }}
                className={screenWidth < 700 ? "mobile-btn" : ""}
                onClick={handleOpenLogout}
              >
                {userData.user.username}
                {userData.isAuth}
              </Button>
              <Menu
                anchorEl={logoutAnchor}
                open={logoutOpen}
                onClose={handleCloseLogout}
              >
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/signup">
              <Button
                sx={{ color: "white" }}
                className={screenWidth < 700 ? "mobile-btn" : ""}
              >
                Войти
              </Button>
            </Link>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
