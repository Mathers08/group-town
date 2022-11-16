import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";
import { useAppDispatch } from "../hooks";
import { fetchUsers } from "../redux/auth/slice";
import { Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from "@mui/material";
import { Person } from "@mui/icons-material";

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
  const { data, users } = useSelector(selectAuth);
  const rows = users.map(user => (
    createData(user._id, user.lastName, user.firstName, user.birthday, user.gender, user.email)
  ));

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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
                  <Avatar sx={{ width: 35, height: 35 }} src={data?.avatarUrl}>
                    {!data?.avatarUrl && <Person sx={{ width: 20, height: 20 }}/>}
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
