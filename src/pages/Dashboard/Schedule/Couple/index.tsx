import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Couple.scss';
import { useColor, useModal } from "../../../../hooks";
import Modal from "../Modal";

const Couple = () => {
  const { color, setColor } = useColor();
  const newColor = color.modal;
  const { isModalActive, onModalClick } = useModal();
  const [background, setBackground] = useState('#d2cccc');
  const [isTyping, setIsTyping] = useState(false);
  const [data, setData] = useState({
    subject: '',
    office: '',
    teacher: ''
  });
  const subjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setData({ ...data, subject: e.target.value });
  };
  const officeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setData({ ...data, office: e.target.value });
  };
  const teacherChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setData({ ...data, teacher: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    onModalClick();
    setData({
      subject: data.subject,
      office: data.office,
      teacher: data.teacher
    });
    setIsTyping(false);
    setBackground(color.modal);
  };

  const Info = () => <>{data.subject}<br/>{data.office}<br/>{data.teacher}</>;

  return (
    <>
      <td onClick={onModalClick} style={{ background: background }}>
        {!isTyping ? <Info/> : <br/>}
      </td>
      {isModalActive &&
        <Modal
          isModalActive={isModalActive}
          hide={onModalClick}
          subject={data.subject}
          office={data.office}
          teacher={data.teacher}
          subjectChange={subjectChange}
          officeChange={officeChange}
          teacherChange={teacherChange}
          handleSubmit={handleSubmit}
        />
      }
    </>
  );
};

export default Couple;