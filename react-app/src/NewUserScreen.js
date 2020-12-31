import React, { useState } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';

class NewUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }

        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        var QRCode = require('qrcode.react')
        return <div style={{ width: '100vw' }}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField id="standard-basic" label="Your Name" onChange={this.handleChange} 
                        style={{width:'95vw'}} />
                    </div>

                </Grid>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'2%' }}>
                        <QRCode value={`n${this.state.value}`} style={{width:'95vw', height:'95vw'}} />
                    </div>
                </Grid>
            </Grid>
        </div>
    }
}

export default NewUserScreen