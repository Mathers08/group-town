import React, { FC } from 'react';
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
import { AccountCircle, Group, LineStyle, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logo1, logo2 } from '../assets';

interface HeaderProps {
  isAuth: boolean;
}

const Header: FC<HeaderProps> = ({ isAuth }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
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
      title: 'Доска',
      icon: <LineStyle/>,
      link: '/dashboard'
    },
    {
      id: 3,
      title: 'Выйти',
      icon: <Logout/>,
      link: '/login'
    }
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static" sx={{ background: 'transparent' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/dashboard" style={{ display: 'flex' }}>
            <img src={logo1} alt=""/>
            <h1 style={{ fontFamily: 'monospace', letterSpacing: -1 }}>roup</h1>
            <img src={logo2} alt=""/>
            <h1 style={{ fontFamily: 'monospace', marginLeft: '-7px' }}>own</h1>
          </Link>
          {!isAuth
            ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                </IconButton>
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
