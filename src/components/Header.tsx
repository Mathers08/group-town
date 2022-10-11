import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { AccountCircle, Group, LineStyle, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
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
      link: '/'
    }
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Typography
            variant="h4"
            component="a"
            href="/dashboard"
            sx={{ fontFamily: 'monospace' }}
          >
            Group Town
          </Typography>

          {/*<Box sx={{ flexGrow: 0 }}>
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
                <Link to={setting.link}>
                  <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <Typography>{setting.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>*/}
          <Stack spacing={2} direction="row">
            <Link to='/signup'>
              <Button variant="outlined">Зарегистрироваться</Button>
            </Link>
            <Link to='/login'>
              <Button variant="contained">Войти</Button>
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
