import React from 'react';
import {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Select } from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {InputLabel} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Button} from '@material-ui/core';
import * as qs from 'query-string';
import { Confirmation } from './Checkout';
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
}));


// Set Step by Item
// Get URI Var
const parsed = qs.parse(window.location.search);
const idProject = parsed['i'];
const idItem = parsed['it'];


export default function Quotation() {
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
        navigate('/QuoteListS');
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
    
    useEffect(() => {
        getItemListS();
    }, []);

    const getItemListS = async () => {
        // Get Data Project
        const response = await axios.get('http://localhost:8080/items/'+idItem);
        setDatas(response.data.data)
        setName(response.data.data[0].name)
        setTechnology(response.data.data[0].technology)
        setMaterial(response.data.data[0].material)
        setSurface_finish(response.data.data[0].surface_finish)
        setQuantity(response.data.data[0].quantity)
        setId_item(idItem)
        setId_user(cookies.get('user_id'))


        if (["CNC Machining", "3D Printing"].includes(response.data.data[0].technology)) {
            setCustomTechnology(false);
        } else if (!["CNC Machining", "3D Printing"].includes(response.data.data[0].technology)) {
            setCustomTechnology(true);
        }

        if (["Aluminum 6061", "Aluminum 6082", "SUS 304", "Stainless Steel 316"].includes(response.data.data[0].material)) {
            setCustomMaterial(false);
        } else if (!["Aluminum 6061", "Aluminum 6082", "SUS 304", "Stainless Steel 316"].includes(response.data.data[0].material)) {
            setCustomMaterial(true);
        }

        if (["Anodizing Type II", "Bead Blasting", "Brushing", "Painting"].includes(response.data.data[0].surface_finish)) {
            setCustomSurface_finish(false);
        } else if (!["Anodizing Type II", "Bead Blasting", "Brushing", "Painting"].includes(response.data.data[0].surface_finish)) {
            setCustomSurface_finish(true);
        }
    
    
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    return (
        <React.Fragment>
        <Button variant="contained" color="primary" className={classes.button} component={Link} to={"/ItemListS?i="+idProject}>
          Item List
        </Button>
        <form onSubmit={ saveItems }>

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
                                    Customer Item Details
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
                <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Supplier Item Quotation
                        </Typography>
                        <Grid container spacing={3}>
                            {/* Item Name */}
                            <Grid item xs={12} md={12}>
                            </Grid>
                            {/* Item Technology */}
                            <Grid item xs={12} md={3} className={classes.formControl}>
                                <InputLabel id="itemTechnology">Technology</InputLabel>
                                
                                {customTechnology === true ? (
                                    <Select
                                        labelId="itemTechnology"
                                        id="itemTechnology"
                                        value={technology}
                                        onChange={ (e) => setTechnology(e.target.value) }
                                        label="Technology"
                                        disabled
                                        >
                                        <MenuItem value={"CNC Machining"}>CNC Machining</MenuItem>
                                        <MenuItem value={"3D Printing"}>3D Printing</MenuItem>
                                    </Select>
                                ) : (
                                    <Select
                                        labelId="itemTechnology"
                                        id="itemTechnology"
                                        value={technology}
                                        onChange={ (e) => setTechnology(e.target.value) }
                                        label="Technology"
                                        >
                                        <MenuItem value={"CNC Machining"}>CNC Machining</MenuItem>
                                        <MenuItem value={"3D Printing"}>3D Printing</MenuItem>
                                    </Select>
                                )}
                                
                            </Grid>
                            <Grid item xs={12} md={2} className={classes.formControl}>
                                <FormControlLabel
                                    value="bottom"
                                    control={customTechnology === true ? (<Checkbox color="primary" onChange={handleTechnology} checked={true}/>) : (<Checkbox color="primary" onChange={handleTechnology} checked={false}/>)}
                                    label="Custom"
                                    labelPlacement="right"
                                />
                            </Grid>
                            <Grid item xs={12} md={5} className={classes.formControl}>
                                {customTechnology === true ? (
                                    <TextField 
                                        required 
                                        label="Custom Technology" 
                                        id="itemCustomTechnology"
                                        name="itemCustomTechnology"
                                        value={ technology }
                                        fullWidth
                                        onChange={ (e) => setTechnology(e.target.value) }
                                    />
                                ) : (
                                    <TextField 
                                        disabled
                                        label="Custom Technology" 
                                        id="itemCustomTechnology"
                                        name="itemCustomTechnology"
                                        value={ technology }
                                        fullWidth
                                        onChange={ (e) => setTechnology(e.target.value) }
                                    />
                                )}
                            </Grid>
                            {/* Item Material */}
                            <Grid item xs={12} md={3} className={classes.formControl}>
                                <InputLabel id="itemMaterial">Material</InputLabel>
                                
                                {customMaterial === true ? (
                                    <Select
                                        labelId="itemMaterial"
                                        id="itemMaterial"
                                        value={material}
                                        onChange={ (e) => setMaterial(e.target.value) }
                                        label="Material"
                                        disabled
                                        >
                                        <MenuItem value={"Aluminum 6061"}>Aluminum 6061</MenuItem>
                                        <MenuItem value={"Aluminum 6082"}>Aluminum 6082</MenuItem>
                                        <MenuItem value={"SUS 304"}>SUS 304</MenuItem>
                                        <MenuItem value={"Stainless Steel 316"}>Stainless Steel 316</MenuItem>
                                    </Select>
                                ) : (
                                    <Select
                                        labelId="itemMaterial"
                                        id="itemMaterial"
                                        value={material}
                                        onChange={ (e) => setMaterial(e.target.value) }
                                        label="Material"
                                        >
                                        <MenuItem value={"Aluminum 6061"}>Aluminum 6061</MenuItem>
                                        <MenuItem value={"Aluminum 6082"}>Aluminum 6082</MenuItem>
                                        <MenuItem value={"SUS 304"}>SUS 304</MenuItem>
                                        <MenuItem value={"Stainless Steel 316"}>Stainless Steel 316</MenuItem>
                                    </Select>
                                )}
                                
                            </Grid>
                            <Grid item xs={12} md={2} className={classes.formControl}>
                                <FormControlLabel
                                    value="bottom"
                                    control={customMaterial === true ? (<Checkbox color="primary" onChange={handleMaterial} checked={true}/>) : (<Checkbox color="primary" onChange={handleMaterial} checked={false}/>)}
                                    label="Custom"
                                    labelPlacement="right"
                                />
                            </Grid>
                            <Grid item xs={12} md={5} className={classes.formControl}>
                                {customMaterial === true ? (
                                    <TextField 
                                        required 
                                        label="Custom Material" 
                                        id="itemCustomMaterial"
                                        name="itemCustomMaterial"
                                        value={ material }
                                        fullWidth
                                        onChange={ (e) => setMaterial(e.target.value) }
                                    />
                                ) : (
                                    <TextField 
                                        disabled
                                        label="Custom Material" 
                                        id="itemCustomMaterial"
                                        name="itemCustomMaterial"
                                        value={ material }
                                        fullWidth
                                        onChange={ (e) => setMaterial(e.target.value) }
                                    />
                                )}
                            </Grid>
                            {/* Item Surface_finish */}
                            <Grid item xs={12} md={3} className={classes.formControl}>
                                <InputLabel id="itemSurface_finish">Surface_finish</InputLabel>
                                
                                {customSurface_finish === true ? (
                                    <Select
                                        labelId="itemSurface_finish"
                                        id="itemSurface_finish"
                                        value={surface_finish}
                                        onChange={ (e) => setSurface_finish(e.target.value) }
                                        label="Surface_finish"
                                        disabled
                                        >
                                        <MenuItem value={"Anodizing Type II"}>Anodizing Type II</MenuItem>
                                        <MenuItem value={"Bead Blasting"}>Bead Blasting</MenuItem>
                                        <MenuItem value={"Brushing"}>Brushing</MenuItem>
                                        <MenuItem value={"Painting"}>Painting</MenuItem>
                                    </Select>
                                ) : (
                                    <Select
                                        labelId="itemSurface_finish"
                                        id="itemSurface_finish"
                                        value={surface_finish}
                                        onChange={ (e) => setSurface_finish(e.target.value) }
                                        label="Surface_finish"
                                        >
                                        <MenuItem value={"Anodizing Type II"}>Anodizing Type II</MenuItem>
                                        <MenuItem value={"Bead Blasting"}>Bead Blasting</MenuItem>
                                        <MenuItem value={"Brushing"}>Brushing</MenuItem>
                                        <MenuItem value={"Painting"}>Painting</MenuItem>
                                    </Select>
                                )}
                                
                            </Grid>
                            <Grid item xs={12} md={2} className={classes.formControl}>
                                <FormControlLabel
                                    value="bottom"
                                    control={customSurface_finish === true ? (<Checkbox color="primary" onChange={handleSurface_finish} checked={true}/>) : (<Checkbox color="primary" onChange={handleSurface_finish} checked={false}/>)}
                                    label="Custom"
                                    labelPlacement="right"
                                />
                            </Grid>
                            <Grid item xs={12} md={5} className={classes.formControl}>
                                {customSurface_finish === true ? (
                                    <TextField 
                                        required 
                                        label="Custom Surface_finish" 
                                        id="itemCustomSurface_finish"
                                        name="itemCustomSurface_finish"
                                        value={ surface_finish }
                                        fullWidth
                                        onChange={ (e) => setSurface_finish(e.target.value) }
                                    />
                                ) : (
                                    <TextField 
                                        disabled
                                        label="Custom Surface_finish" 
                                        id="itemCustomSurface_finish"
                                        name="itemCustomSurface_finish"
                                        value={ surface_finish }
                                        fullWidth
                                        onChange={ (e) => setSurface_finish(e.target.value) }
                                    />
                                )}
                            </Grid>
                            {/* Item Quantity */}
                            <Grid item xs={12} md={12}>
                                <TextField 
                                    required 
                                    label="Item Quantity" 
                                    id="itemQuantity"
                                    name="itemQuantity"
                                    fullWidth 
                                    value={ quantity }
                                    onChange={ (e) => setQuantity(e.target.value) }
                                />
                            </Grid>
                            {/* Price */}
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>
                                <Grid item xs={12} md={2}>
                                    <Typography variant="h6" align="right">
                                        SGD.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <TextField 
                                        required 
                                        label="Price of total quantity" 
                                        id="price"
                                        name="price"
                                        fullWidth 
                                        value={ price }
                                        onChange={ (e) => setPrice(e.target.value) }
                                    />
                                </Grid>
                                </Grid>
                            </Grid>
                            {/* Reasons */}
                            <Grid item xs={12} md={12}>
                                <TextField 
                                    required 
                                    label="Quotation Reason" 
                                    id="reason"
                                    name="reason"
                                    fullWidth 
                                    placeholder="eg: quantity 5 items will have better price than 1, Material 1 is cheaper than Material 2,…"
                                    value={ reason }
                                    onChange={ (e) => setReason(e.target.value) }
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <div className={classes.buttons}>
                                    {confirm === false ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className={classes.button}
                                    >
                                        Confirm
                                    </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled
                                            className={classes.button}
                                        >
                                            Confirm
                                        </Button>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            </main>
        
        </form>
        </React.Fragment>
    );
}