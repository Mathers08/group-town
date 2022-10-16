import React, { ChangeEvent, FC, useState } from 'react';
import { Button } from "@mui/material";
import { CoupleColorEnum, ICouple } from "../../redux/schedule/types";
import { useAppDispatch } from "../../hooks";
import Modal from "../Modal";
import './Schedule.scss';
import { editCouple } from "../../redux/schedule/slice";

type CoupleProps = ICouple;

const Couple: FC<CoupleProps> = ({ id, subject, audience, lecturer, coupleColor }) => {
  const dispatch = useAppDispatch();

  const [isTyping, setIsTyping] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [editSubject, setEditSubject] = useState(subject);
  const [editAudience, setEditAudience] = useState(audience);
  const [editLecturer, setEditLecturer] = useState(lecturer);
  const [editColor, setEditColor] = useState<CoupleColorEnum>(CoupleColorEnum.DEFAULT);
  const textColor = coupleColor === CoupleColorEnum.DEFAULT
  && editColor === CoupleColorEnum.DEFAULT ? '#000' : 'whitesmoke';

  const onModalClick = () => setIsModalActive(!isModalActive);
  const onSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setEditSubject(e.target.value);
  };
  const onAudienceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setEditAudience(e.target.value);
  };
  const onLecturerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setEditLecturer(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onModalClick();
    const editedCouple: ICouple = {
      id,
      subject: editSubject,
      audience: editAudience,
      lecturer: editLecturer,
      coupleColor: editColor
    };
    dispatch(editCouple(editedCouple));
    setIsTyping(false);
    setEditColor(editColor);
  };

  const Info = () => <p style={{ color: textColor }}>{editSubject}<br/>{editAudience}<br/>{editLecturer}</p>;

  return (
    <div>
      <td className="main__couples-item" onClick={onModalClick}
          style={{ background: editColor }}>
        {!isTyping ? <Info/> : <br/>}
        {isModalActive &&
          <Modal active={isModalActive} setActive={setIsModalActive} color={editColor}>
            <div>
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: textColor }}>Предмет</h3>
                <input
                  autoFocus
                  type="text"
                  maxLength={16}
                  value={editSubject}
                  onChange={onSubjectChange}
                />
                <h3 style={{ color: textColor }}>Кабинет</h3>
                <input
                  type="text"
                  maxLength={16}
                  value={editAudience}
                  onChange={onAudienceChange}
                />
                <h3 style={{ color: textColor }}>Преподаватель</h3>
                <input
                  type="text"
                  maxLength={16}
                  value={editLecturer}
                  onChange={onLecturerChange}
                />
                <div>
                  <h3 style={{ color: textColor }}>Выберите цвет</h3>
                  <div className="colors">
                    <div className="circle colors-default"
                         onClick={() => setEditColor(CoupleColorEnum.DEFAULT)}/>
                    <div className="circle colors-blue"
                         onClick={() => setEditColor(CoupleColorEnum.BLUE)}/>
                    <div className="circle colors-green"
                         onClick={() => setEditColor(CoupleColorEnum.GREEN)}/>
                    <div className="circle colors-red"
                         onClick={() => setEditColor(CoupleColorEnum.RED)}/>
                  </div>
                </div>
                <Button type="submit" variant="contained" color="inherit" sx={{ mt: '15px' }}>Добавить</Button>
              </form>
            </div>
          </Modal>
        }
      </td>
    </div>
  );
};

export default Couple;

