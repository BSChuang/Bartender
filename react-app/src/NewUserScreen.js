import React, { useState } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';

const NewUserScreen = () => {
    const [name, setName] = useState('')
    const handleChange = (e) => {
        setName(e.target.value)
    }

    var QRCode = require('qrcode.react')
    return <div style={{ width: '100vw' }}>
        <Grid
            container
            direction="row">
            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField id="standard-basic" label="Your Name" onChange={handleChange}
                        style={{ width: '95vw' }} />
                </div>

            </Grid>
            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2%' }}>
                    <QRCode value={`n${name}`} style={{ width: '95vw', height: '95vw' }} />
                </div>
            </Grid>
        </Grid>
    </div>
}

export default NewUserScreen