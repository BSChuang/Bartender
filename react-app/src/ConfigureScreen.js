import React, { useState } from 'react';
import { Slider, Grid, Select, InputLabel, Typography, FormControl, MenuItem, FormHelperText, Paper, TextField } from '@material-ui/core';
import ingredients from './ingredients.json'

ingredients.unshift('None')

function capitalize(text) {
    return text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}

class ConfigureScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'ingredient0': 'None',
            'ingredient1': 'None',
            'ingredient2': 'None',
            'ingredient3': 'None',
            'ingredient4': 'None',
            'ingredient5': 'None',
        }

        this.ingredients = ingredients.sort()
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        var QRCode = require('qrcode.react')
        const handleChange = this.handleChange.bind(this);

        var qr = 'i'
        for (var i = 0; i < 6; i++) {
            qr += this.state['ingredient' + i] + '|'
        }
        qr = qr.substring(0, qr.length - 1)

        console.log(qr)

        return <Grid container justify="center">
            {
                [...Array(6).keys()].map(index =>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Select
                                style={{ minWidth: '75%' }}
                                name={`ingredient${index}`}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state[`ingredient${index}`]}
                                onChange={(event) => handleChange(event.target.name, event.target.value)}
                            >
                                {this.ingredients.map((ingredient) => {
                                    return <MenuItem value={ingredient}>{capitalize(ingredient)}</MenuItem>
                                })}
                            </ Select>
                            <FormHelperText>Pump {index + 1}</FormHelperText>
                        </FormControl>
                    </Grid>)
            }

            <QRCode value={qr} style={{ width: '95vw', height: '95vw', margin:'10px' }} />
        </Grid>
    }
}

export default ConfigureScreen