import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Stack } from '@mui/material';
import { ExpandMore, Person } from '@mui/icons-material';
import '../components/News/News.scss';
import NewsList from "../components/News/NewsList";
import TodoList from "../components/Todos/TodoList";

const Profile = () => {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ width: 300, height: 300 }}>
          <Person sx={{ width: 250, height: 250 }}/>
        </Avatar>
      </Stack>
      <Accordion sx={{ width: '66vw' }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h2>Мой список дел</h2>
        </AccordionSummary>
        <AccordionDetails>
          <TodoList/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <h2>Новости</h2>
        </AccordionSummary>
        <AccordionDetails>
          <NewsList/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Profile;