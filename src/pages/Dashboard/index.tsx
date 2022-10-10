import React, { SyntheticEvent } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import './Dashboard.scss';

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

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <Box sx={{ width: '100%' }} className='navTabs'>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Новости" href="/news" />
        <LinkTab label="Список дел" href="/todo" />
        <LinkTab label="Что-то там еще..." href="/something" />
        <LinkTab label="Прогресс" href="/progress" />
        <LinkTab label="Расписание" href="/schedule" />
      </Tabs>
    </Box>
  );
}

export default Dashboard;