import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Chat, Visibility } from '@mui/icons-material';
import { Avatar, IconButton } from "@mui/material";
import axios from "../../axios";
import { INews } from "../../redux/news/types";

const FullNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<INews>();
  const newsTimeInfo = item?.createdAt === item?.updatedTime ? item?.createdAt : item?.updatedTime;

  const goBack = () => navigate(-1);

  useEffect(() => {
    axios.get(`/news/${id}`)
      .then(({ data }) => setItem(data))
      .catch(err => {
        console.warn(err);
        alert('Ошибка при открытии!');
      });
  }, []);

  return (
    <div className="full">
      {item &&
        <>
          <div className="full__top">
            <IconButton onClick={goBack} sx={{ position: 'absolute', top: 20, left: -20, width: 60, height: 60 }}>
              <ArrowBack/>
            </IconButton>
            <h1 className="full__top-title">
              {item.title}
              <div className="title-line" style={{ background: item.importance }}/>
            </h1>
          </div>
          <div className="full__main">
            <div className="full__main-info">
              <Avatar sx={{ width: 50, height: 50 }}
                      src="https://sun9-west.userapi.com/sun9-66/s/v1/ig2/H10wD23PMZLS5zb4BQwi5kSxUpNle5mim7PJszkvHlLUXnllNqZmNPIo_OMnv3czdAu9LQ0BBmu3CT9kVMKHy0t2.jpg?size=2160x2160&quality=96&type=album"
              >
                {/*<Person sx={{ width: 25, height: 25 }}/>*/}
              </Avatar>
              <div>
                <p><em>Автор:</em> {item.user.firstName} {item.user.lastName}</p>
                <p>
                  <em>{item.createdAt === item.updatedTime ? 'Дата создания:' : 'Обновлено:'}</em> {newsTimeInfo}
                </p>
              </div>
            </div>
            <h2 className="full__main-content">{item.content}</h2>
            <ul className="full__main-details">
              <li>
                <Visibility/>
                <span>{item.viewsCount}</span>
              </li>
              <li>
                <Chat/>
                <span>3</span>
              </li>
            </ul>
          </div>
        </>
      }
    </div>
  );
};

export default FullNews;