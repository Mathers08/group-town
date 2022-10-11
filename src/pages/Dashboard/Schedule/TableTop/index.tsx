import React from "react";
import './TableTop.scss';

const TableTop = () => {
  const days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ]

  return (
    <tr>
      <th className="group">ММИО</th>
      {days.map(day => (
        <th key={day} className="days">
          {day}
        </th>
      ))}
    </tr>
  );
};

export default TableTop;