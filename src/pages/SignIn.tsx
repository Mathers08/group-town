import React from 'react';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { Copyright } from "../components";
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
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

export default SignIn;