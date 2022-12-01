import React from 'react';
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
// DB Conect
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


// Set Step by Item
// Get URI Var
const parsed = qs.parse(window.location.search);
var stepArray = [];
for (var i = 0; i < (parsed['item']); i++)   {
  stepArray.push("Item "+(i+1)+" Details");
}
const steps = stepArray;
const item = parsed['item'];


export default function PaymentForm() {
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
    const [project_id, setProject_id] = React.useState(''); 
    const navigate = useNavigate();

    const [confirm, setConfirm] = React.useState(false); 

    const saveItems = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/items/add',{
            name: name,
            technology: technology,
            material: material,
            surface_finish: surface_finish,
            quantity: quantity,
            status: "waiting",
            quotation: "no",
            project_id: projectId
        });
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

    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Item Details
        </Typography>
        <form onSubmit={ saveItems }>

            <Grid container spacing={3}>
                {/* Item Name */}
                <Grid item xs={12} md={12}>
                    <TextField 
                        required 
                        label="Item Name" 
                        id="itemName"
                        name="itemName"
                        fullWidth 
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
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
                        control={<Checkbox color="primary" onChange={handleTechnology} />}
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
                        control={<Checkbox color="primary" onChange={handleMaterial} />}
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
                        control={<Checkbox color="primary" onChange={handleSurface_finish} />}
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
                <Grid item xs={12} md={6}>
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
        
        </form>
        </React.Fragment>
    );
}