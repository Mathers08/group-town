import React from 'react';
import { useSelector } from "react-redux";
import { Couple, TableTop } from '../../components';
import { selectSchedule } from "../../redux/schedule/selectors";
import '../../components/Schedule/Schedule.scss';
import { CoupleColorEnum } from "../../redux/schedule/types";

const Schedule = () => {
  const { couples } = useSelector(selectSchedule);
  const times = [
    `8:00 - 9:35`,
    '9:45 - 11:20',
    '11:30 - 13:05',
    '13:25 - 15:00',
    '15:10 - 16:45',
    '16:55 - 18:30'
  ];

  return (
    <div>
      <h1 className='page__header'>Расписание</h1>
      <TableTop/>
      <div className='main'>
        <div className="main__time">
          {times.map(time => (
            <div key={time} className="main__time-item">{time}</div>
          ))}
        </div>
        <div className="main__couples">
          {[...Array(36)].map(item => (
            <Couple id={''} subject={''} audience={''} lecturer={''} coupleColor={CoupleColorEnum.DEFAULT}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;

///*<table className="table">
//       <thead>
//       <TableTop/>
//       </thead>
//       <tbody>
//       {times.map(time => (
//         <tr key={time}>
//           <th>{time}</th>
//           {CoupleDisplay()}
//         </tr>
//       ))}
//       </tbody>
//     </table>*/