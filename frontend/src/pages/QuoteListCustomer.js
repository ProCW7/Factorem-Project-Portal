import React from 'react';
import {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Link as LinkUri } from 'react-router-dom';
import * as qs from 'query-string';
import PageBase from './PageBase';
// DB Conect
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

// set up cookies
const cookies = new Cookies();

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
const idProject = parsed['i'];
const idItem = parsed['it'];
console.log(idProject);

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
    const classes = useStyles();
    const [datas, setDatas] = React.useState([]);

    useEffect(() => {
        getProjectListC();
    }, []);

    const getProjectListC = async () => {
        // Get Data Project
        const response = await axios.get('http://localhost:8080/quotation/quote/'+idItem);
        setDatas(response.data.data)
    
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <PageBase title={(
            <React.Fragment>
                <Button variant="outlined" color="primary" className={classes.button} component={LinkUri} to={"/ItemListC?i="+idProject}>
                Items List
                </Button>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Quotations List
                </Typography>
            </React.Fragment>
        )} navigation="Projects / Items List / Quotations List /">
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {datas.length > 0 ? (
            datas.map((data, index) => (
              <Grid item key={data} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.company}
                    </Typography>
                    <Typography>
                      SG($) {data.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" component={LinkUri} to={"/QuoteC?i="+idProject+"&it="+idItem+"&ic="+data.id_user}>
                      Detail
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )) ) : (
              <Typography>
                Supplier not quote yet
              </Typography>
            )}
          </Grid>
        </Container>
      </PageBase>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}