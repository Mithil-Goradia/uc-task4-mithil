import { useContext, useState } from 'react';
import { Container, Typography, TextField, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailPattern.test(email)) {
      Swal.fire('Invalid Email', 'Please enter a valid email.', 'error');
      return;
    }

    if (!passwordPattern.test(password)) {
      Swal.fire('Invalid Password', 'Password must be at least 6 characters long and contain at least one letter and one number.', 'error');
      return;
    }

    axios
      .post('https://uc-fd-auth-backend.onrender.com/user/login', { email, password })
      .then((response) => {
        const token = response.data; // Ensure correct response structure
        if (token) {
          login(token); // Use default username if not provided
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You will be redirected to the homepage.',
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/home');
          });
        } else {
          Swal.fire('Login Failed', 'No token received. Please try again.', 'error');
        }
      })
      .catch((error) => {
        console.error(
          'Login error:',
          error.response ? error.response.data : error.message || error
        );
        Swal.fire('Login Failed', 'Invalid email or password. Please try again.', 'error');
      });
  };

  const handleBack = () => {
    navigate('/signin');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        bgcolor: '#f5deb3',
        p: '16px',
        color: 'black',
        font: 'roboto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        gap: '24px',
        borderRadius: '20px',
        width: '300px',
        marginTop: '10%'
      }}
    >
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
        Log-in
      </Typography>

      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <Typography>Email-id:</Typography>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Enter your email-id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <Typography>Password:</Typography>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </Box>
      </form>

      <Button variant="contained" onClick={handleLogin} sx={{backgroundColor:"black"}}>
        Next
      </Button>
      <Button
        variant="outlined"
        onClick={handleBack}
        size="small"
        sx={{
          width: '40%',
          alignSelf: 'flex-end',
        }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default Login;
