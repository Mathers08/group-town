import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";
import { useAppDispatch } from "../hooks";
import { fetchUsers } from "../redux/auth/slice";
import { Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from "@mui/material";

function createData(
  _id: string,
  lastName: string,
  firstName: string,
  birthday: string,
  gender: string,
  email: string,
) {
  return { _id, lastName, firstName, birthday, gender, email };
}

const GroupList = () => {
  const dispatch = useAppDispatch();
  const { users } = useSelector(selectAuth);
  const rows = users.map(user => (
    createData(user._id, user.lastName, user.firstName, user.birthday, user.gender, user.email)
  ));

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  console.log(users);

  return (
    <>
      <h1 className='page__header'>{"\u00a0"}Список группы</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>ID</TableCell>
              <TableCell align="left">Фамилия</TableCell>
              <TableCell align="left">Имя</TableCell>
              <TableCell align="left">Дата рождения</TableCell>
              <TableCell align="left">Пол</TableCell>
              <TableCell align="left">Почта</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">
                  <Avatar sx={{ width: 35, height: 35 }} src='https://sun9-west.userapi.com/sun9-66/s/v1/ig2/H10wD23PMZLS5zb4BQwi5kSxUpNle5mim7PJszkvHlLUXnllNqZmNPIo_OMnv3czdAu9LQ0BBmu3CT9kVMKHy0t2.jpg?size=2160x2160&quality=96&type=album'>
                    {/*<Person sx={{ width: 250, height: 250 }}/>*/}
                  </Avatar>
                </TableCell>
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.firstName}</TableCell>
                <TableCell align="left">{row.birthday}</TableCell>
                <TableCell align="left">{row.gender}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GroupList;
