import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import './NavTabs.scss';

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const NavTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <Box sx={{ width: '100%' }} className='navTabs'>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Новости" href="/drafts" />
        <LinkTab label="Список дел" href="/trash" />
        <LinkTab label="Что-то там еще..." href="/trash" />
        <LinkTab label="Прогресс" href="/spam" />
        <LinkTab label="Расписание" href="/spam" />
      </Tabs>
    </Box>
  );
}

export default NavTabs;