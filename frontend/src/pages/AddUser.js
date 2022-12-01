import React from 'react';
import {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'redux-form-material-ui/lib/Select';
import { MenuItem } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as qs from 'query-string';
import { Cookies } from 'react-cookie';
// DB Conect
import axios from "axios";
import { useNavigate } from 'react-router-dom';
var md5 = require('md5');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Set Step by Item
// Get URI Var
const parsed = qs.parse(window.location.search);
const who = parsed['who'];
console.log(who);

function Role() {
  if (who === "customer") {
    const role = "Customer";
    return role;
  } else if (who === "supplier") {
    const role = "Supplier";
    return role;
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// set up cookies
const cookies = new Cookies();

export default function AddUser() {
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [email, setEmail] = React.useState(''); 
    const [phone_number, setPhone_number] = React.useState(''); 
    const [password, setPassword] = React.useState(''); 
    const [role, setRole] = React.useState(''); 
    const navigate = useNavigate();

    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }

    const saveUser = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/user/add',{
            name: name,
            company: company,
            email: email,
            phone_number: phone_number,
            role: role,
            password: md5(password)
        });
        navigate('/UserList');

        // Get Data SignUp User
        // const response = await axios.get('http://localhost:8080/user');
        // const data = response.data.data;
        // const userLength = data.length;
        // const user_id = data[userLength-1].user_id;
        // const user_role = data[userLength-1].user_role;
        // cookies.set('user_id', user_id);
        // cookies.set('user_role', user_role);
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={ saveUser }>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={ name }
                onChange={ (e) => setName(e.target.value) }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="lname"
                value={ company }
                onChange={ (e) => setCompany(e.target.value) }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="email"
                value={ phone_number }
                onChange={ (e) => setPhone_number(e.target.value) }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="role"
                label="Role"
                type="role"
                id="role"
                autoComplete="current-role"
                value={ role }
                onChange={ (e) => setRole(e.target.value) }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={"/UserList"}variant="body2">
                Back to User List
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}