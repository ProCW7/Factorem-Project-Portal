import React from 'react';
import {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import * as qs from 'query-string';
import {Paper} from '@material-ui/core';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
// DB Conect
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// set up cookies
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 1300,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    buttonG: {
        marginTop: 15,
        alignSelf: 'right'
    },
    buttonA: {
        marginLeft: 15,
    },
}));


// Set Step by Item
// Get URI Var
const parsed = qs.parse(window.location.search);
const idProject = parsed['i'];
const idItem = parsed['it'];
const idCuotation = parsed['ic'];


export default function QuotationCustomer() {
    const projectId = parsed['i'];

    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }

    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [technology, setTechnology] = React.useState('');
    const [material, setMaterial] = React.useState(''); 
    const [surface_finish, setSurface_finish] = React.useState(''); 
    const [quantity, setQuantity] = React.useState(''); 
    const [price, setPrice] = React.useState(''); 
    const [reason, setReason] = React.useState(''); 
    const [id_item, setId_item] = React.useState(''); 
    const [id_user, setId_user] = React.useState(''); 
    const navigate = useNavigate();

    const [confirm, setConfirm] = React.useState(false); 

    const saveItems = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/quotation/add',{
            name: name,
            technology: technology,
            material: material,
            surface_finish: surface_finish,
            quantity: quantity,
            price: price,
            reason: reason,
            status: "waiting",
            id_item: id_item,
            id_user: id_user
        });
        navigate('/ItemListS?i='+idProject);
    }

    // Custom
    const [customTechnology, setCustomTechnology] = React.useState(false);
    const [customMaterial, setCustomMaterial] = React.useState(false);
    const [customSurface_finish, setCustomSurface_finish] = React.useState(false);
   
    const handleTechnology = (event) => {
        if (customTechnology===false) {
            setCustomTechnology(true);
        } else {
            setCustomTechnology(false);
        }
    };

    const handleMaterial = (event) => {
        if (customMaterial===false) {
            setCustomMaterial(true);
        } else {
            setCustomMaterial(false);
        }
    };

    const handleSurface_finish = (event) => {
        if (customSurface_finish===false) {
            setCustomSurface_finish(true);
        } else {
            setCustomSurface_finish(false);
        }
    };

    const [datas, setDatas] = React.useState([]);
    const [datasS, setDatasS] = React.useState([]);
    const [datasSS, setDatasSS] = React.useState('');

    // Data Quote
    const [idc, setIdc] = React.useState([]);
    const [idS, setIds] = React.useState([]);
    const [namec, setNamec] = React.useState([]);
    const [technologyc, setTechnologyc] = React.useState([]);
    const [materialc, setMaterialc] = React.useState([]);
    const [surface_finishc, setSurface_finishc] = React.useState([]);
    const [quantityc, setQuantityc] = React.useState([]);
    const [pricec, setPricec] = React.useState([]);
    const [reasonc, setReasonc] = React.useState([]);
    const [statusc, setStatusc] = React.useState([]);
    const [idItemc, setIdItemc] = React.useState([]);
    const [idUserc, setIdUserc] = React.useState([]);
    
    const statusQuoteA = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/quotation/status/edit/',{
            idUser :  e.currentTarget.getAttribute('data-column'),
            statusA : "accepted",
            statusB : "rejected",
            id : idItem
        });
        navigate("/AcceptedC");
    };
        
    const statusQuoteR = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/quotation/status/edit/',{
            idUser :  e.currentTarget.getAttribute('data-column'),
            statusA : "rejected",
            statusB : "approved",
            id : idItem
        });
        navigate("/ItemListC?i="+idProject);
    };
    
    useEffect(() => {
        getItemListC();
        getItemListS();
        getProjectListC();
    }, []);
    
    const getItemListC = async () => {
        // Get Data Project
        const response = await axios.get('http://localhost:8080/items/'+idItem);
        setDatas(response.data.data)
        setIdc(response.data.data[0].quotation_id)
    }

    const getItemListS = async () => {
        // Get Data Project
        const responseS = await axios.get('http://localhost:8080/quotation/'+idCuotation+"/"+idItem);
        setDatasS(responseS.data.data)
        setIds(responseS.data.data[0].quotation_id)
    }

    const getProjectListC = async () => {
        // Get Data Project
        const responseSS = await axios.get('http://localhost:8080/quotation/quote/'+idItem);
        setDatasSS(responseSS.data.data[0].company)
    
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    return (
        <React.Fragment>
        <Button variant="contained" color="primary" className={classes.button} component={Link} to={"/ItemListC?i="+idProject}>
          Item List
        </Button>

            <main className={classes.layout}>
            <Grid container spacing={2}>
                {/* Original */}
                { datas.map((data, index) => (
                <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            {/* Item Name */}
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" gutterBottom>
                                    Customer Reqruitment
                                </Typography>
                            </Grid>
                            {/* Item Name */}
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" gutterBottom>
                                    Item Name: {data.name}
                                </Typography>
                            </Grid>
                            {/* Item Technology */}
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" gutterBottom>
                                    Technology: {data.technology}
                                </Typography>
                            </Grid>
                            {/* Item Material */}
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" gutterBottom>
                                    Material: {data.material}
                                </Typography>
                            </Grid>
                            {/* Item Surface_finish */}
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" gutterBottom>
                                    Surface Finish: {data.surface_finish}
                                </Typography>
                            </Grid>
                            {/* Item Quantity */}
                            <Grid item xs={12} md={12}>
                                <Typography variant="h6" gutterBottom>
                                    Quantity: {data.quantity}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                )) }

                {/* Quote */}
                { datasS.map((data, index) => (
                <React.Fragment>
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3}>
                                {/* Item Name */}
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Supplier Quotation {datasSS}
                                    </Typography>
                                </Grid>
                                {/* Item Name */}
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Item Name: {data.name}
                                    </Typography>
                                </Grid>
                                {/* Item Technology */}
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Technology: {data.technology}
                                    </Typography>
                                </Grid>
                                {/* Item Material */}
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Material: {data.material}
                                    </Typography>
                                </Grid>
                                {/* Item Surface_finish */}
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Surface Finish: {data.surface_finish}
                                    </Typography>
                                </Grid>
                                {/* Item Quantity */}
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Quantity: {data.quantity}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h6" gutterBottom>
                                Reason: {data.reason}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h6" gutterBottom>
                                Price SG($): {data.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} className={classes.buttonG}>
                            <Button variant="outlined" className={classes.buttonR} onClick={statusQuoteR} data-column={data.id_user}>
                                Reject
                            </Button>
                            <Button variant="contained" color='primary' className={classes.buttonA} onClick={statusQuoteA} data-column={data.id_user}>
                                Accept
                            </Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
                )) }
            </Grid>
            </main>
        
        </React.Fragment>
    );
}