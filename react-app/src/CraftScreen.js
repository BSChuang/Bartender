import React, { useState } from 'react';
import { Slider, Grid, Select, InputLabel, Typography, FormControl, MenuItem, Button, Paper, TextField } from '@material-ui/core';
import ingredients from './ingredients.json'

function capitalize(text) {
    return text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}

class CraftScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'ingredients': 1,
            'ingredient0': '',
            'quantity0': 0,
            'ingredient1': '',
            'quantity1': 0,
            'ingredient2': '',
            'quantity2': 0,
            'ingredient3': '',
            'quantity3': 0,
            'ingredient4': '',
            'quantity4': 0,
            'ingredient5': '',
            'quantity5': 0
        }

        this.ingredients = ingredients.sort()
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    makeIngredient(index, handleChange) {
        return <Grid item xs={12} style={{ padding: '5px' }}>
            <Paper elevation={3} >
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Ingredient {index + 1}
                </Typography>

                <div>
                    <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Select
                            style={{ minWidth: '50%' }}
                            name={`ingredient${index}`}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state[`ingredient${index}`]}
                            onChange={(event) => handleChange(event.target.name, event.target.value)}
                            autoWidth
                            min
                        >
                            {this.ingredients.map((ingredient) => {
                                return <MenuItem value={ingredient}>{capitalize(ingredient)}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography id="continuous-slider" gutterBottom>
                            Quantity (10 = ~1 ounce)
                    </Typography>
                        <Slider
                            name={`quantity${index}`}
                            defaultValue={50}
                            aria-labelledby="discrete-slider-custom"
                            valueLabelDisplay="auto"
                            onChange={(event, val) => handleChange(`quantity${index}`, val)}
                            style={{ width: '75%' }}
                        />
                    </FormControl>
                </div>
            </Paper>
        </Grid>
    }

    addIngredient() {
        if (this.state.ingredients < 6) {
            this.setState({
                ingredients: this.state.ingredients + 1
            })
        }

    }

    removeIngredient() {
        if (this.state.ingredients > 1) {
            this.setState({
                ingredients: this.state.ingredients - 1
            })
        }
    }

    render() {
        var QRCode = require('qrcode.react')
        const handleChange = this.handleChange.bind(this);
        const boundAdd = this.addIngredient.bind(this);
        const boundRemove = this.removeIngredient.bind(this);

        var qr = this.state.name
        for (var i = 0; i < this.state.ingredients; i++) {
            qr += '|' + this.state['ingredient' + i] + ':' + this.state['quantity' + i]
        }

        return <Grid container
            justify="center"
        >
            <Grid item xs={12} style={{ padding: '10px' }}>
                <Paper elevation={3} >
                    <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Craft your own
                    </Typography>

                    <div style={{ padding: '10px' }}>
                        <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                id="standard-basic"
                                label="Drink name"
                                style={{ minWidth: '75%' }}
                                onChange={(event) => handleChange('name', event.target.value)}
                            />
                        </FormControl>
                    </div>
                </Paper>
            </Grid>

            {[...Array(this.state.ingredients).keys()].map(index => {
                return this.makeIngredient(index, handleChange)
            })}

            <Grid item xs={6} align='center' style={{ padding: '10px' }}>
                <Button variant="contained" color="primary"
                    style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}
                    onClick={boundAdd}>
                    Add
                </Button>
            </ Grid>
            <Grid item xs={6} align='center' style={{ padding: '10px', }}>
                <Button variant="contained" color="primary"
                    style={{ width: '25%' }}
                    onClick={boundRemove}>
                    Remove
                </Button>
            </ Grid>

            <QRCode value={`s${qr}`} style={{ width: '95vw', height: '95vw', margin:'10px' }} />
        </Grid>
    }
}

export default CraftScreen