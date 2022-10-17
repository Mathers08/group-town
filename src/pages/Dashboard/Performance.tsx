import React from 'react';
import { styled } from '@mui/material/styles';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#d5d5d5',
  borderRadius: 0,
  paddingLeft: theme.spacing(2),
}));

const Performance = () => {
  enum SessionTypes {
    EXAM = 'EXAM',
    TEST = 'TEST',
    DiFF = 'DIFF'
  }

  const users = ['Иванов Сергей', 'Петров Алексей', 'Сидоров Олег'];
  const session = [
    {
      name: 'Базы данных',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: SessionTypes.EXAM
    },
    {
      name: 'Численные методы',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: SessionTypes.EXAM
    },
    {
      name: 'Методы оптимизации',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: SessionTypes.EXAM
    },
    {
      name: 'Компьютерные сети',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: SessionTypes.TEST
    },
    {
      name: 'Численные методы',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: SessionTypes.TEST
    },
    {
      name: 'Машинное обучение',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: SessionTypes.TEST
    },
    {
      name: 'Операционные системы',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: SessionTypes.TEST
    },
    {
      name: 'Компьютерная графика',
      lecturer: '',
      date: undefined,
      mark: undefined,
      type: SessionTypes.DiFF
    },
  ];

  return (
    <div>
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
                      <TableBody>
                        <Item>Теоретический курс</Item>
                        {session.map(s => s.type === 'EXAM' && (
                          <TableRow key={s.name}>
                            <TableCell component="th" scope="row">{s.name}</TableCell>
                            <TableCell align="right">{s.lecturer}</TableCell>
                            <TableCell align="right">{s.date}</TableCell>
                            <TableCell align="right">{s.mark}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper} sx={{ mt: '-23px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        <Item>Практические знания</Item>
                        {session.map(s => s.type === 'TEST' && (
                          <TableRow key={s.name}>
                            <TableCell component="th" scope="row">{s.name}</TableCell>
                            <TableCell align="right">{s.lecturer}</TableCell>
                            <TableCell align="right">{s.date}</TableCell>
                            <TableCell align="right">{s.mark}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper} sx={{ mt: '-23px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        <Item>Дифференцированные зачеты</Item>
                        {session.map(s => s.type === 'DIFF' && (
                          <TableRow key={s.name}>
                            <TableCell component="th" scope="row">{s.name}</TableCell>
                            <TableCell align="right">{s.lecturer}</TableCell>
                            <TableCell align="right">{s.date}</TableCell>
                            <TableCell align="right">{s.mark}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Performance;
