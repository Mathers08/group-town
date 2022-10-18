import React, { useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  AccountCircle,
  CalendarMonth,
  CreditScore,
  ExpandLess,
  ExpandMore,
  Group,
  LineStyle,
  ListAlt,
  Newspaper,
  PublishedWithChanges,
  ReceiptLong,
  School
} from '@mui/icons-material';
import { Link } from "react-router-dom";

const Navbar = () => {
  const primaryItems = [
    {
      title: 'Профиль',
      icon: <AccountCircle/>,
      link: '/profile'
    },
    {
      title: 'Список группы',
      icon: <Group/>,
      link: '/group'
    }
  ];
  const secondaryItems = [
    {
      key: 'Объявления',
      icon: <LineStyle/>,
      title: 'Объявления',
      children: [
        {
          link: '/news',
          icon: <Newspaper/>,
          title: 'Новости',
        },
        {
          link: '/articles',
          icon: <ReceiptLong/>,
          title: 'Статьи',
        },
        {
          link: '/todos',
          icon: <ListAlt/>,
          title: 'Список дел',
        }
      ]
    },
    {
      key: 'Учеба',
      icon: <School/>,
      title: 'Учеба',
      children: [
        {
          link: '/performance',
          icon: <CreditScore/>,
          title: 'Успеваемость',
        },
        {
          link: '/progress',
          icon: <PublishedWithChanges/>,
          title: 'Прогресс',
        },
        {
          link: '/schedule',
          icon: <CalendarMonth/>,
          title: 'Расписание',
        }
      ],
    }
  ];

  const [isOpen, setIsOpen] = useState(true);
  const onIsOpenClick = () => setIsOpen(!isOpen);

  return (
    <List sx={{ width: '100%', maxWidth: 360, mr: '50px' }}>
      {primaryItems.map((item) => (
        <Link to={item.link} key={item.link}>
          <ListItemButton>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title}/>
          </ListItemButton>
        </Link>
      ))}
      {secondaryItems.map(({ key, title, icon, children }) => (
        <div key={key}>
          <ListItemButton onClick={onIsOpenClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title}/>
            {isOpen ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>

          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map(({ title, link, icon }) => (
                <Link to={link} key={link}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title}/>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </div>
      ))};
    </List>
  );
};

export default Navbar;