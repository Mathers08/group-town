import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Chat, Person, Visibility } from '@mui/icons-material';
import { Avatar, IconButton } from "@mui/material";
import axios from "../../axios";
import { allImportance, IComment, INews } from "../../redux/news/types";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../hooks";
import { addComment } from "../../redux/news/slice";

const FullNews = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState<INews>();
  const [commentText, setCommentText] = useState('');
  const newsTimeInfo = item?.createdAt === item?.updatedTime ? item?.createdAt : item?.updatedTime;
  const importanceIndex = item?.importance && allImportance.map(i => i.title).indexOf(item.importance);
  const indexType = typeof importanceIndex === 'number';

  const goBack = () => navigate(-1);
  const onCommentTextChange = (e: ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value);
  const onCommentSubmit = async (e: any) => {
    e.preventDefault();
    const newComment: IComment = {
      _id: uuidv4(),
      user: item?.user,
      content: commentText
    };
    if (commentText) {
      //await axios.post('/news', newComment);
      dispatch(addComment({ id: id ? id : '', comment: newComment }));
      setCommentText('');
    }
    console.log(commentText);
    console.log(item);
  };

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
              <div className="title-line"
                   style={{ background: indexType ? allImportance[importanceIndex].color : '' }}/>
            </h1>
          </div>
          <div className="full__main">
            <div className="full__main-info">
              <Avatar sx={{ width: 40, height: 40 }} src={item.user.avatarUrl}>
                {!item.user.avatarUrl && <Person sx={{ width: 25, height: 25 }}/>}
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
            <div className="full__main-comments">
              <h2>Комментарии</h2>
              {item.comments.map((comment, index) => (
                <div key={`${comment._id}_${index}`} className="comment">
                  <Avatar sx={{ width: 50, height: 50 }} src={comment.user?.avatarUrl}>
                    {!comment.user?.avatarUrl && <Person sx={{ width: 30, height: 30 }}/>}
                  </Avatar>
                  <div className="comment__info">
                    <div className="comment__info-author">
                      <p>{comment.user?.firstName} {comment.user?.lastName}</p>
                    </div>
                    <h4 className="comment__info-text">{comment.content}</h4>
                  </div>
                </div>
              ))}
              <form onSubmit={onCommentSubmit}>
                <input
                  value={commentText}
                  onChange={onCommentTextChange}
                  placeholder="Оставьте комментарий..."
                />
              </form>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default FullNews;