import React from 'react';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import { Copyright } from "../components";
import { useForm } from 'react-hook-form';
import { useAppDispatch } from "../hooks";
import { fetchLogin } from "../redux/auth/slice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: 'mathers@mail.com',
      password: '123456'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: any) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      alert('Не удалось авторизоваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      navigate("/announcement/news");
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="normal"
            fullWidth
            label="Ваша почта"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Укажите почту!' })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Пароль"
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Укажите пароль!' })}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Войти
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'underline' }}>
              У вас еще нет аккаунта? Зарегистрируйтесь!
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 3, mb: 1 }}/>
    </Container>
  );
};

export default Login;