import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { ExpandMore, Person } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { fetchUsers } from "../../redux/auth/slice";
import { selectAuth } from "../../redux/auth/selectors";
import { Modal } from "../../components";
import AddSubject from "./AddSubject";
import { selectPerformance } from "../../redux/performance/selectors";
import { IDiscipline } from "../../redux/performance/types";

enum ExamDisciplineEnum {
  EXAM = 'EXAM',
  TEST = 'TEST',
  DIFF = 'DIFF'
}

const Performance = () => {
  const dispatch = useAppDispatch();
  const { data, users } = useSelector(selectAuth);
  const { disciplines } = useSelector(selectPerformance);
  const [isActive, setIsActive] = useState(false);
  const exams = disciplines.filter(d => d.type === 'Экзамен');
  const tests = disciplines.filter(d => d.type === 'Зачет');
  const diffs = disciplines.filter(d => d.type === 'Дифференцированный зачет');

  const onModalClick = () => setIsActive(!isActive);
  const disciplineToName = (type: ExamDisciplineEnum) => {
    switch (type) {
      case ExamDisciplineEnum.EXAM:
        return 'Теоретический курс';
      case ExamDisciplineEnum.TEST:
        return 'Практические занятия';
      case ExamDisciplineEnum.DIFF:
        return 'Дифференцированные зачеты';
    }
  };

  const TableBodyDisplay = (filteredDisciplines: IDiscipline[], type: ExamDisciplineEnum) => {
    return (
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ mt: '-23px' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
              <Paper sx={{ bgcolor: '#d5d5d5', pl: '16px', width: 500 }}>{disciplineToName(type)}</Paper>
              {filteredDisciplines.map(d => (
                <TableRow key={d.name}>
                  <TableCell component="th" scope="row">{d.name}</TableCell>
                  <TableCell align="left">{d.lecturer}</TableCell>
                  <TableCell align="left">{d.date}</TableCell>
                  <TableCell align="left">{d.mark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h1 className="page__header">{"\u00a0"}Успеваемость</h1>
      <Button variant="contained" onClick={onModalClick}>+ Добавить предмет</Button>
      <div style={{ marginTop: 20 }}>
        {users.map(user => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore/>}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Avatar sx={{ width: 50, height: 50 }} src={data?.avatarUrl}>
                  {!data?.avatarUrl && <Person sx={{ width: 35, height: 35 }}/>}
                </Avatar>
                <Typography variant="h6">{user.lastName} {user.firstName}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ mt: '-23px' }}>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ p: '10px' }}>Наименования дисциплины</TableCell>
                            <TableCell sx={{ p: '10px' }} align="right">Фамилия преподавателя</TableCell>
                            <TableCell sx={{ p: '10px' }} align="right">Дата</TableCell>
                            <TableCell sx={{ p: '10px' }} align="right">Оценка</TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </Grid>
                  {TableBodyDisplay(exams, ExamDisciplineEnum.EXAM)}
                  {TableBodyDisplay(tests, ExamDisciplineEnum.TEST)}
                  {TableBodyDisplay(diffs, ExamDisciplineEnum.DIFF)}
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Modal props={{
        active: isActive,
        setActive: setIsActive,
        color: 'transparent',
        width: 800,
      }}><AddSubject/></Modal>
    </div>
  );
};

export default Performance;
