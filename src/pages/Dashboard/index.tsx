import React, { SyntheticEvent } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import News from "./News";
import TodoList from "./TodoList";
import Schedule from "./Schedule";
import Progress from "./Progress";

const Dashboard = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} sx={{ marginRight: 20 }}>
            <Tab label="Новости" value="1"/>
            <Tab label="Список дел" value="2"/>
            <Tab label="Что-то там еще..." value="3"/>
            <Tab label="Прогресс" value="4"/>
            <Tab label="Расписание" value="5"/>
          </TabList>
        </Box>
        <TabPanel value="1"><News/></TabPanel>
        <TabPanel value="2"><TodoList/></TabPanel>
        <TabPanel value="3">Item 3</TabPanel>
        <TabPanel value="4"><Progress/></TabPanel>
        <TabPanel value="5" sx={{ padding: '24px 0' }}><Schedule/></TabPanel>
      </TabContext>
    </Box>
  );
};

export default Dashboard;