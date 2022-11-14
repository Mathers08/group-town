import React, { FC, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { AccountCircle, Group, Logout, Newspaper, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logo1, logo2 } from '../assets';
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";
import { useAppDispatch } from "../hooks";
import { logout } from "../redux/auth/slice";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector(selectAuth);
  const isAuth = Boolean(data);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const onLogoutClick = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };
  const settings = [
    {
      id: 0,
      title: 'Профиль',
      icon: <AccountCircle/>,
      link: '/profile'
    },
    {
      id: 1,
      title: 'Список группы',
      icon: <Group/>,
      link: '/group'
    },
    {
      id: 2,
      title: 'Новости',
      icon: <Newspaper/>,
      link: '/announcement/news'
    },
  ];

  return (
    <AppBar position="static" sx={{ background: 'transparent' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/announcement/news" style={{ display: 'flex' }}>
            <img src={logo1} alt=""/>
            <h1>roup</h1>
            <img src={logo2} alt=""/>
            <h1 style={{ marginLeft: '-7px' }}>own</h1>
          </Link>
          {isAuth
            ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <h3 style={{ color: 'black' }}>{data?.firstName} {data?.lastName}</h3>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      <Person sx={{ width: 20, height: 20 }}/>
                    </Avatar>
                  </IconButton></div>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link to={setting.link} key={setting.id}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <ListItemIcon>{setting.icon}</ListItemIcon>
                      <Typography>{setting.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
                <Link to="/login">
                  <MenuItem onClick={onLogoutClick}>
                    <ListItemIcon><Logout/></ListItemIcon>
                    <Typography>Выйти</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            :
            <Stack spacing={2} direction="row">
              <Link to="/login">
                <Button variant="outlined">Войти</Button>
              </Link>
              <Link to="/signup">
                <Button variant="contained">Создать аккаунт</Button>
              </Link>
            </Stack>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
