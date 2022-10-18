import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
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

enum ExamDisciplineEnum {
  EXAM = 'EXAM',
  TEST = 'TEST',
  DIFF = 'DIFF'
}
interface IDiscipline {
  name: string,
  lecturer: string,
  date?: string,
  mark?: number,
  type: ExamDisciplineEnum
}

const Performance = () => {
  const users = ['Иванов Сергей', 'Петров Алексей', 'Сидоров Олег'];
  const disciplines = [
    {
      name: 'Базы данных',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: ExamDisciplineEnum.EXAM
    },
    {
      name: 'Численные методы',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: ExamDisciplineEnum.EXAM
    },
    {
      name: 'Методы оптимизации',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: ExamDisciplineEnum.EXAM
    },
    {
      name: 'Компьютерные сети',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: ExamDisciplineEnum.TEST
    },
    {
      name: 'Численные методы',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: ExamDisciplineEnum.TEST
    },
    {
      name: 'Машинное обучение',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: ExamDisciplineEnum.TEST
    },
    {
      name: 'Операционные системы',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: ExamDisciplineEnum.TEST
    },
    {
      name: 'Компьютерная графика',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: ExamDisciplineEnum.DIFF
    },
  ];
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

  const TableBodyDisplay = (disciplines: IDiscipline[], type: ExamDisciplineEnum) => {
    return (
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ mt: '-23px' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
              <Paper sx={{ bgcolor: '#d5d5d5', pl: '16px', width: 500 }}>{disciplineToName(type)}</Paper>
              {disciplines.map(d => d.type === type && (
                <TableRow key={d.name}>
                  <TableCell component="th" scope="row">{d.name}</TableCell>
                  <TableCell align="right">{d.lecturer}</TableCell>
                  <TableCell align="right">{d.date}</TableCell>
                  <TableCell align="right">{d.mark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  };

  return (
    <div>
      <h1 className='page__header'>Успеваемость</h1>
      {users.map(user => (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore/>}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Avatar sx={{ width: 50, height: 50 }}>
                <Person sx={{ width: 25, height: 25 }}/>
              </Avatar>
              <Typography variant="h6">{user}</Typography>
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
                {TableBodyDisplay(disciplines, ExamDisciplineEnum.EXAM)}
                {TableBodyDisplay(disciplines, ExamDisciplineEnum.TEST)}
                {TableBodyDisplay(disciplines, ExamDisciplineEnum.DIFF)}
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Performance;
