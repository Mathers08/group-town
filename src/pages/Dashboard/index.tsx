import React, { SyntheticEvent } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import News from "./News";
import TodoBlock from "./TodoBlock";
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
            <Tab label="Новости" value="1" sx={{ textTransform: 'initial', fontSize: '1.5rem' }}/>
            <Tab label="Список дел" value="2" sx={{ textTransform: 'initial', fontSize: '1.5rem' }}/>
            <Tab label="Что-то там еще..." value="3" sx={{ textTransform: 'initial', fontSize: '1.5rem' }}/>
            <Tab label="Прогресс" value="4" sx={{ textTransform: 'initial', fontSize: '1.5rem' }}/>
            <Tab label="Расписание" value="5" sx={{ textTransform: 'initial', fontSize: '1.5rem' }}/>
          </TabList>
        </Box>
        <TabPanel value="1"><News/></TabPanel>
        <TabPanel value="2"><TodoBlock/></TabPanel>
        <TabPanel value="3">Item 3</TabPanel>
        <TabPanel value="4"><Progress/></TabPanel>
        <TabPanel value="5" sx={{ padding: '24px 0' }}><Schedule/></TabPanel>
      </TabContext>
    </Box>
  );
};

export default Dashboard;