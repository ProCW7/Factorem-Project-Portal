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
    const [company, setCompany] = React.useState([]);

    useEffect(() => {
        getProjectListC();
    }, []);

    const getProjectListC = async () => {
        // Get Data Project
        const response = await axios.get('http://localhost:8080/projects/approved');
        setDatas(response.data.data);
    
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
              <Button variant="contained" color="primary" className={classes.button} component={LinkUri} to="/QuoteListS">
                
                <Typography component="p" variant="p" align="center" color="textPrimary" gutterBottom>
                  My Quotation
                </Typography>
              </Button>
              <Typography component="h6" variant="h2" align="center" color="textPrimary" gutterBottom>
                Projects List
              </Typography>
              <Typography variant="p" align="center" color="textSecondary" paragraph>
                Find the best suit project and send your quotations
              </Typography>
            </React.Fragment>
        )} navigation="Projects /">
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            { datas.map((data, index) => (
              <Grid item key={data} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.name} Project
                    </Typography>
                        {data.company}
                    <Typography>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" component={LinkUri} to={"/ItemListS?i="+data.projects_id}>
                      Detail
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )) }
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