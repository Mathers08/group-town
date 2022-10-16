import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import 'dayjs/locale/ru';
import { LockOutlined } from '@mui/icons-material';
import { Copyright } from "../components";
import { Link } from "react-router-dom";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";

const SignUp = () => {
  const { register, handleSubmit, control, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      lastName: '',
      firstName: '',
      gender: 'male',
      birthday: dayjs('2001-01-01'),
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация в Group Town
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                required
                fullWidth
                label="Фамилия"
                error={Boolean(errors.lastName?.message)}
                helperText={errors.lastName?.message}
                {...register('lastName', { required: 'Укажите фамилию!' })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Имя"
                error={Boolean(errors.firstName?.message)}
                helperText={errors.firstName?.message}
                {...register('firstName', { required: 'Укажите имя!' })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Пол</FormLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel value="male" control={<Radio/>} label="Мужской"/>
                    <FormControlLabel value="female" control={<Radio/>} label="Женский"/>
                  </RadioGroup>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="birthday"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <DesktopDatePicker
                      label="Дата рождения"
                      inputFormat="MM/DD/YYYY"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="email"
                label="Почта"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', { required: 'Укажите почту!' })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                label="Пароль"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register('password', { required: 'Укажите пароль!' })}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Создать аккуант
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>
              Уже есть аккаунт? Войдите!
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 3, mb: 1 }}/>
    </Container>
  );
};

export default SignUp;