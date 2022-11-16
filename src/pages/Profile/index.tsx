import React, { ChangeEvent, useRef, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Stack } from '@mui/material';
import { ExpandMore, Person } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/selectors";
import NewsList from "../../components/News/NewsList";
import TodoList from "../../components/Todos/TodoList";
import './Profile.scss';
import { AddNews, Modal } from "../../components";
import AddTodo from "../../components/Todos/AddTodo";
import axios from "../../axios";

const Profile = () => {
  const { data } = useSelector(selectAuth);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isAddTodoActive, setIsAddTodoActive] = useState(false);
  const [isAddNewsActive, setIsAddNewsActive] = useState(false);

  const onTodoClick = () => setIsAddTodoActive(!isAddTodoActive);
  const onNewsClick = () => setIsAddNewsActive(!isAddNewsActive);
  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files) {
        const file = e.target.files[0];
        formData.append('image', file);
      }
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
      const uploadedImage = {
        avatarUrl: imageUrl
      }
      await axios.patch('/auth/login', uploadedImage);
    } catch (e) {
      console.log(e);
      alert('Ошибка при загрузке картинки!');
    }
  };

  return (
    <>
      <div className="profile">
        <div className="profile__avatar">
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ width: 300, height: 300 }} src={data?.avatarUrl}>
              {!data?.avatarUrl && <Person sx={{ width: 250, height: 250 }}/>}
            </Avatar>
          </Stack>
          <div>
            <Button onClick={() => imageRef.current?.click()} color="primary" variant="outlined" size="large">
              Загрузить фотографию
            </Button>
            <input ref={imageRef} type="file" hidden onChange={onImageFileChange}/>
          </div>
        </div>
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