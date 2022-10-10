import React, { MouseEvent, useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Chat, ExpandLess, ExpandMore, Forum, Group, LineStyle } from '@mui/icons-material';
import './Navbar.scss';

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
      link: '/'
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
  const [selectedNavItemId, setSelectedNavItemId] = useState(2);
  const [selectedChatNameId, setSelectedChatNameId] = useState(-1);

  const onIsOpenClick = () => setIsOpen(!isOpen);
  const onNavItemClick = (e: MouseEvent<HTMLDivElement>, id: number) => {
    setSelectedNavItemId(id);
    setSelectedChatNameId(-1);
  };
  const onChatNameClick = (e: MouseEvent<HTMLDivElement>, id: number) => {
    setSelectedChatNameId(id);
    setSelectedNavItemId(-1);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, marginRight: '50px' }}>
      {navItems.map((item, index) => (
        <ListItemButton
          key={`${item}_${index}`}
          selected={selectedNavItemId === item.id}
          onClick={e => onNavItemClick(e, item.id)}
        >
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title}/>
        </ListItemButton>
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
            <ListItemButton
              sx={{ pl: 4 }}
              key={`${item}_${index}`}
              selected={selectedChatNameId === item.id}
              onClick={e => onChatNameClick(e, item.id)}
            >
              <ListItemIcon>
                <Chat/>
              </ListItemIcon>
              <ListItemText primary={item.title}/>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default Navbar;