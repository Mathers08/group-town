import React from 'react';
import { Couple, TableTop } from '../../components';
import '../../components/Schedule/Schedule.scss';

const Schedule = () => {
  const times = [
    `8:00 - 9:35`,
    '9:45 - 11:20',
    '11:30 - 13:05',
    '13:25 - 15:00',
    '15:10 - 16:45',
    '16:55 - 18:30'
  ];

  return (
    <table className="table">
      <thead>
      <TableTop/>
      </thead>
      <tbody>
      {times.map(time => (
        <tr key={time}>
          <th>{time}</th>
          <Couple/>
          <Couple/>
          <Couple/>
          <Couple/>
          <Couple/>
          <Couple/>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default Schedule;