import React from 'react';
import {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Set Step by Item
// Get URI Var
const parsed = qs.parse(window.location.search);
const who = parsed['who'];

export function userRole() {
  if (who === "customer") {
      const role = "customer";
      return role;
  } else if (who === "supplier") {
      const role = "supplier";
      return role;
  } else if (who === "admin") {
    const role = "admin";
    return role;
  } else {
      console.log("error role");
  }
}

// set up cookies
const cookies = new Cookies();

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const rolenya = userRole();
  const navigate = useNavigate();

  useEffect(() => {
      getProjectListC();
  }, []);

  const getProjectListC = async () => {
  
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
  }

  const getUser = async (e) => {
      e.preventDefault();
      // Get Data SignUp User
      const response = await axios.get('http://localhost:8080/user/email/'+email);
      const data = response.data.data;
      const userLength = data.length;
      const user_id = data[userLength-1].user_id;
      const user_role = data[userLength-1].role;
      const user_password = data[userLength-1].password;
      cookies.set('user_id', user_id);
      cookies.set('user_role', user_role);

      if (md5(password) === user_password) {
        if (rolenya === "customer") {
          navigate('/ProjectListC');
        } else if (rolenya === "supplier") {
          navigate('/QuoteListS');
        } else if (rolenya === "admin") {
          navigate('/Admin');
        }
      } else {
        if (rolenya === "customer") {
          navigate('/signin?who=customer');
        } else if (rolenya === "supplier") {
          navigate('/signin?who=supplier');
        } else if (rolenya === "admin") {
          navigate('/signin?who=admin');
        }
      }
  }

  return (
    <Container component="haha" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={ getUser }>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              {rolenya === "customer" ? (
                <Link href="/signup?who=customer" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              ) : rolenya === "supplier" ? (
                <Link href="/signup?who=supplier" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              ) : (null)}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}