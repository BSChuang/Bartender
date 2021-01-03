import React, { useState } from 'react';
import { TextField, Grid, Typography, Fab } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function GetDrinkScreen({ drink, qr, allowFavorite }) {
    var QRCode = require('qrcode.react')
    const [isFavorite, setFavorite] = useState(false)
    return <div style={{ width: '100vw' }}>
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography fontWeight="fontWeightBold" variant="h4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {drink}
                    </Typography>
                </div>

            </Grid>
            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2%' }}>
                    <QRCode value={
                        isFavorite ?
                            `f${qr.substring(1, qr.length)}` :
                            qr
                    } style={{ width: '95vw', height: '95vw' }} />
                </div>
            </Grid>
        </Grid>
        {
            allowFavorite && 
            <Fab aria-label="like" style={{ margin: '10px' }} onClick={() => setFavorite(!isFavorite)}>
                <FavoriteIcon color={isFavorite ? 'secondary' : 'default'} />
            </Fab>
        }

    </div>
}

export const GetCustomDrinkScreen = () => {
    const [name, setName] = useState('')
    const handleChange = (e) => {
        setName(e.target.value)
    }

    var QRCode = require('qrcode.react')
    return <div style={{ width: '100vw' }}>
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField id="standard-basic" label="Your drink" onChange={handleChange} 
                        style={{width:'95vw', padding:'5px'}} />
                </div>

            </Grid>
            <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2%' }}>
                    <QRCode value={`g${name.toLowerCase()}`} style={{ width: '95vw', height: '95vw' }} />
                </div>
            </Grid>
        </Grid>
    </div>
}