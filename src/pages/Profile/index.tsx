import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Stack } from '@mui/material';
import { ExpandMore, Person } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/selectors";
import NewsList from "../../components/News/NewsList";
import TodoList from "../../components/Todos/TodoList";
import './Profile.scss';
import { AddNews, Modal } from "../../components";
import AddTodo from "../../components/Todos/AddTodo";
import { formatDate } from "../../utils";

const Profile = () => {
  const { data } = useSelector(selectAuth);
  const [isAddTodoActive, setIsAddTodoActive] = useState(false);
  const [isAddNewsActive, setIsAddNewsActive] = useState(false);
  const onTodoClick = () => setIsAddTodoActive(!isAddTodoActive);
  const onNewsClick = () => setIsAddNewsActive(!isAddNewsActive);

  return (
    <>
      <div className="profile">
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ width: 300, height: 300 }} src='https://sun9-west.userapi.com/sun9-66/s/v1/ig2/H10wD23PMZLS5zb4BQwi5kSxUpNle5mim7PJszkvHlLUXnllNqZmNPIo_OMnv3czdAu9LQ0BBmu3CT9kVMKHy0t2.jpg?size=2160x2160&quality=96&type=album'>
            {/*<Person sx={{ width: 250, height: 250 }}/>*/}
          </Avatar>
        </Stack>
        <div className="profile__info">
          <h1 className="profile__info-name">{data?.firstName} {data?.lastName}</h1>
          <div className="profile__info-less">
            <p><em>Дата рожения:</em> {data?.birthday}</p>
            <p><em>Пол:</em> {data?.gender}</p>
            <p><em>Почта:</em> {data?.email}</p>
          </div>
          <div className="profile__info-buttons">
            <Button onClick={onTodoClick} color="primary" variant="contained" sx={{ width: 200 }}>
              Добавить задачу
            </Button>
            <Button onClick={onNewsClick} color="primary" variant="contained" sx={{ width: 200 }}>
              Добавить новость
            </Button>
          </div>
        </div>
      </div>
      <Accordion sx={{ width: '66vw' }}>
        <AccordionSummary
          expandIcon={<ExpandMore/>}
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
          expandIcon={<ExpandMore/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <h2>Новости</h2>
        </AccordionSummary>
        <AccordionDetails>
          <NewsList/>
        </AccordionDetails>
      </Accordion>
      <Modal props={{
        active: isAddTodoActive,
        setActive: setIsAddTodoActive,
        color: 'transparent',
        width: 800,
        height: 550,
      }}><AddTodo/></Modal>
      <Modal props={{
        active: isAddNewsActive,
        setActive: setIsAddNewsActive,
        color: 'transparent',
        width: 800,
        height: 550,
      }}><AddNews/></Modal>
    </>
  );
};

export default Profile;