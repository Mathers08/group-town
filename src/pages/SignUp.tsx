import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { LockOutlined } from '@mui/icons-material';
import { Copyright } from "../components";
import { Link } from "react-router-dom";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from '@mui/material/Select';

const theme = createTheme();

const SignUp = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2001-01-01T21:11:54'));
  const [gender, setGender] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => setGender(event.target.value as string);
  const onDayChange = (newValue: Dayjs | null) => setValue(newValue);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация в Group Town
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  name="lastName"
                  id="lastName"
                  label="Фамилия"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="firstName"
                  id="firstName"
                  label="Имя"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="patronymic"
                  id="patronymic"
                  label="Отчество"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Пол"
                    onChange={handleChange}
                  >
                    <MenuItem value="male">Мужской</MenuItem>
                    <MenuItem value="female">Женский</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                  <DesktopDatePicker
                    label="Дата рождения"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={onDayChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  id="email"
                  label="Почта"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  name="password"
                  id="password"
                  label="Пароль"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Создать аккуант
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                  Уже есть аккаунт? Войдите!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }}/>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;