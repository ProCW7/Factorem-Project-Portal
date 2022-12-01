import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Input} from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import {InputLabel} from '@material-ui/core';
import {Select} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import { Link as LinkButton } from 'react-router-dom';
import { Cookies } from 'react-cookie';
// DB Conect
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Factorem-WebApp|ProCW7 -
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const steps = ['Project Setup'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

// set up cookies
const cookies = new Cookies();

export default function ProjectSetup() {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [item, setItem] = React.useState('');
  const navigate = useNavigate();
  
  if(!window.location.hash) {
    window.location = window.location + '#loaded';
    window.location.reload();
  }
 
  const saveProjects = async (e) => {
      e.preventDefault();
      await axios.post('http://localhost:8080/projects/add/',{
          name: name,
          status: "waiting",
          id_user: cookies.get('user_id'),
      });

      // Get Data Project
      const response = await axios.get('http://localhost:8080/projects');
      const data = response.data.data;
      const dataLength = data.length;
      const project_id = data[dataLength-1].projects_id;
      navigate('/ItemDetail?item='+item+"&i="+project_id);
  }

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  console.log(cookies.get('user_id'));

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form onSubmit={saveProjects }>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={12}>
                <Typography component="h1" variant="h4" align="center">
                  Project Setup
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Project Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="projectName"
                        name="projectName"
                        label="Project name"
                        fullWidth
                        autoComplete="given-name"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="p">
                  How many item in your project ?
                </Typography>
              </Grid>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Item</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item}
                    onChange={handleChange}
                    label="Item"
                  >
                    <MenuItem value="">
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>

            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Confirm
              </Button>
            </div>
            {/* <button type="submit">Complete Order</button> */}
          </form>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}