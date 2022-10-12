import React, { SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import News from "./News";
import TodoBlock from "./TodoBlock";
import Schedule from "./Schedule";
import Progress from "./Progress";
import { Link } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";

function LinkTab(props: any) {
  return (
    <Tab
      component={Link}
      to={props.pathname}
      {...props}
    />
  );
}

const Dashboard = () => {
  const [value, setValue] = React.useState('1');
  const customStyles = { textTransform: 'initial', fontSize: '1.5rem' };

  const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} sx={{ marginRight: 20 }}>
            <Tab label="Новости" value="1" sx={customStyles}/>
            <Tab label="Список дел" value="2" sx={customStyles}/>
            <Tab label="Что-то там еще..." value="3" sx={customStyles}/>
            <Tab label="Прогресс" value="4" sx={customStyles}/>
            <Tab label="Расписание" value="5" sx={customStyles}/>
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