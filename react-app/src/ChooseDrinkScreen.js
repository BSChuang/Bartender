import React, { useState } from 'react';
import { TextField, Grid, Typography, Button } from '@material-ui/core';
import drinksDict from './drinks.json'
import GetDrinkScreen from './GetDrinkScreen'

export default function ChooseDrinkScreen() {
    const [drink, setDrink] = useState(null);
    console.log(drinksDict)


    if (drink != null) {
        return <GetDrinkScreen drink={capitalize(drink)} qr={`g${drink}`} allowFavorite={true} />
    } else {
        return <div style={{ width: '100vw' }}>
            <Grid container>
                {Object.keys(drinksDict).map(drink => <DrinkButton drinkName={drink} setDrink={setDrink} />)}
            </Grid>
        </div>
    }
}

function capitalize(text) {
    return text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

function DrinkButton({ drinkName, setDrink }) {
    return <Grid item xs={6} style={{ padding: '10px', height: '25vh' }}>
        <Button variant="contained" color="primary"
            onClick={() => setDrink(drinkName)}
            style={{ width: '100%', height: '100%' }}>
            {drinkName}
        </Button>
    </Grid>
}