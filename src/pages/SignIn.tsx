import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { Copyright } from "../components";

const theme = createTheme();

const SignIn = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
            Вход в Group Town
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="email"
              label="Ваша почта"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                  У вас еще нет аккаунта? Зарегистрируйтесь!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }}/>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;