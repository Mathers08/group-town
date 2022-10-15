import React, { useState, MouseEvent } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Chat, ExpandLess, ExpandMore, Forum, Group, LineStyle } from '@mui/icons-material';
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
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
    }
  ];
  const chatNames = [
    {
      id: 0,
      title: 'Чат 1',
    },
    {
      id: 1,
      title: 'Чат 2',
    },
    {
      id: 2,
      title: 'Чат 3',
    },
    {
      id: 3,
      title: 'Чат 4',
    },
  ];
  const [isOpen, setIsOpen] = useState(true);
  const onIsOpenClick = () => setIsOpen(!isOpen);

  return (
    <List sx={{ width: '100%', maxWidth: 360, marginRight: '50px' }}>
      {navItems.map((item, index) => (
        <Link to={item.link} key={`${item}_${index}`}>
          <ListItemButton>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title}/>
          </ListItemButton>
        </Link>
      ))}

      <ListItemButton onClick={onIsOpenClick}>
        <ListItemIcon>
          <Forum/>
        </ListItemIcon>
        <ListItemText primary="Чаты"/>
        {isOpen ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {chatNames.map((item, index) => (
            <Link to={`/chats/${item.id + 1}`} key={`${item}_${index}`}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Chat/>
                </ListItemIcon>
                <ListItemText primary={item.title}/>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default Navbar;