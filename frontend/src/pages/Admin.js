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
import { Link as LinkUrl } from 'react-router-dom';

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

export default function Admin() {
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
          Admin Control Panel
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Manage Customer, Supplier, Projects, Items and Quotations Data
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">

            {/* // Enterprise card is full width at sm breakpoint */}
            <Grid item key={"For Supplier"} xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                  title="User Data"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center">
                          User data Management
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant={"outlined"} color="primary" component={LinkUrl} to={'/UserList'}>
                        Manage User Data
                    </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* // Enterprise card is full width at sm breakpoint */}
            <Grid item key={"For Supplier"} xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                  title="Projects Data"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center">
                            Projects data Management
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant={"outlined"} color="primary" component={LinkUrl} to={'/ProjectDataList'}>
                        Manage Projects Data
                    </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* // Enterprise card is full width at sm breakpoint */}
            <Grid item key={"For Supplier"} xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                  title="Items Data"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center">
                          Items data Management
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant={"outlined"} color="primary" component={LinkUrl} to={'/ItemDataList'}>
                        Manage Item Data
                    </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* // Enterprise card is full width at sm breakpoint */}
            <Grid item key={"For Supplier"} xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                  title="Quotations Data"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                      <Typography component="li" variant="subtitle1" align="center">
                           Quotations data Management
                      </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant={"outlined"} color="primary" component={LinkUrl} to={'/QuoteDataList'}>
                        Manage Quotations Data
                    </Button>
                </CardActions>
              </Card>
            </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  );
}