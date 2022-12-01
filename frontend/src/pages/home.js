import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useNavigate } from 'react-router-dom';

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
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'For Supplier',
    description: [
        'Find the right project for you',
        'offer the best item & price',
    ],
    buttonText: 'Search Project',
    buttonVariant: 'outlined',
  },
  {
    title: 'For Customer',
    description: [
        'Create your dream projects!',
        'Get the best offer for you',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Admin Only',
    description: [
    ],
    buttonText: 'Login',
    buttonVariant: 'outlined',
  },
];

export default function Home() {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleRole = () => {
        // if (tiers.buttonText === "Search Project") {
        //     navigate('/signup?who=supplier');
        // } else if (tiers.buttonText === "Get started") {
        //     navigate('/signup?who=customer');
        // } else if (tiers.buttonText === "Login") {
        //     navigate('/signin?who=admin');
        // }
        
        navigate('/signin?who=customer');
    };

    const handleSupplier = () => {
        navigate('/signin?who=supplier');
    };

    const handleCustomer = () => {
        navigate('/signin?who=customer');
    };

    const handleAdmin = () => {
        navigate('/signin?who=admin');
    };



  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Factorem Project Manufacture
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
            Find the best offer for your dream projects
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">

            {/* // Enterprise card is full width at sm breakpoint */}
            <Grid item key={"For Supplier"} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title="For Supplier"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center">
                            Find the right project for you
                            offer the best item & price
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant={"outlined"} color="primary" onClick={handleSupplier}>
                        Search Project
                    </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* // Enterprise card is full width at sm breakpoint */}
            <Grid item key={"For Customer"} xs={12} sm={12} md={4}>
              <Card>
                <CardHeader
                  title="For Customer"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center">
                            Find the right project for you
                            offer the best item & price
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant={"contained"} color="primary" onClick={handleCustomer}>
                        Get Started
                    </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* // Enterprise card is full width at sm breakpoint */}
            <Grid item key={"Admin Only"} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title="Admin Only"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center">
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant={"outlined"} color="primary" onClick={handleAdmin}>
                        Login
                    </Button>
                </CardActions>
              </Card>
            </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  );
}