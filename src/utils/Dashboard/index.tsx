import React, { SyntheticEvent } from 'react';
import { Box, Tab } from '@mui/material';
import News from "../../pages/Announcement/News";
import Todos from "../../pages/Announcement/Todos";
import Progress from "../../pages/Study/Progress";
import Schedule from "../../pages/Study/Schedule";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Performance from "../../pages/Study/Performance";

const Dashboard = () => {
  const [value, setValue] = React.useState('1');
  const customStyles = { textTransform: 'initial', fontSize: '1.5rem' };

  const handleChange = (e: SyntheticEvent, newValue: string) => setValue(newValue);

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} sx={{ mr: 20 }}>
            <Tab label="Новости" value="1" sx={customStyles}/>
            <Tab label="Список дел" value="2" sx={customStyles}/>
            <Tab label="Успеваемость" value="3" sx={customStyles}/>
            <Tab label="Прогресс" value="4" sx={customStyles}/>
            <Tab label="Расписание" value="5" sx={customStyles}/>
          </TabList>
        </Box>
        <TabPanel value="1"><News/></TabPanel>
        <TabPanel value="2"><Todos/></TabPanel>
        <TabPanel value="3"><Performance/></TabPanel>
        <TabPanel value="4"><Progress/></TabPanel>
        <TabPanel value="5" sx={{ p: '24px 0' }}><Schedule/></TabPanel>
      </TabContext>
    </Box>
  );
};

export default Dashboard;