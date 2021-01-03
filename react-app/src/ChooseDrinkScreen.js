import React, { useState } from 'react';
import { TextField, Grid, Typography, Button, Box, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import drinksDict from './drinks.json'
import ingredients from './ingredients.json'
import GetDrinkScreen, { GetCustomDrinkScreen } from './GetDrinkScreen'

export default function ChooseDrinkScreen() {
    const [drink, setDrink] = useState(null);

    const [search, setSearch] = useState('')
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const [filterIngredients, setFilterIngredients] = useState('')
    const handleIngredientChange = (e, value) => {
        setFilterIngredients(value)
    }

    const [option, setOption] = useState('only')
    const handleOptionChange = (e, value) => {
        setOption(value)
    }

    if (drink === 'Custom') {
        return <GetCustomDrinkScreen />
    } else if (drink != null) {
        return <GetDrinkScreen drink={capitalize(drink)} qr={`g${drink}`} allowFavorite={true} />
    }
    else {
        return <div style={{ width: '100vw' }}>
            <Grid
                container
                direction="row">
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField id="standard-basic" label="Search" onChange={handleSearchChange}
                            style={{ width: '95%' }} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={ingredients.slice(1)}
                            getOptionLabel={(option) => capitalize(option)}
                            defaultValue={[]}
                            onChange={handleIngredientChange}
                            style={{ width: '95%' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Ingredients"

                                />
                            )}
                        />
                    </ div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position" defaultValue="only" style={{ display: 'flex' }} onChange={handleOptionChange}>
                                <FormControlLabel
                                    value="only"
                                    control={<Radio color="primary" />}
                                    label="Only"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value="contains"
                                    control={<Radio color="primary" />}
                                    label="Contains"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>

            <Grid container>
                {
                    search == '' && filterIngredients.length == 0 ?
                        <>
                            <Grid item xs={6} style={{ padding: '0.2%', height: '25vh' }}>
                                <Button variant="contained" color="primary"
                                    onClick={() => setDrink('Custom')}
                                    style={{ width: '100%', height: '100%' }}>
                                    Custom Drink
                            </Button>
                            </Grid>
                            {Object.keys(drinksDict).sort().map(drink => <DrinkButton drinkName={drink} setDrink={setDrink} />)}
                        </>
                        :
                        Object.keys(drinksDict).sort().filter(drink => filterDrink(drink, search, filterIngredients, option)).map(drink => <DrinkButton drinkName={drink} setDrink={setDrink} />)
                }
            </Grid>
        </div >
    }
}

function filterDrink(drink, search, ingredients, option) {
    var hasSearch = drink.includes(search.toLowerCase())
    var hasIngredient = null
    if (option == 'only') {
        hasIngredient = ingredients.every(ingredient => Object.keys(drinksDict[drink]).includes(ingredient))
    } else {
        hasIngredient = ingredients.some(ingredient => Object.keys(drinksDict[drink]).includes(ingredient))
    }
    return hasSearch && hasIngredient
}

function capitalize(text) {
    return text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}

function DrinkButton({ drinkName, setDrink }) {
    return <Grid item xs={6} style={{ padding: '0.2%', height: '25vh' }}>
        <Button variant="contained" color="primary"
            onClick={() => setDrink(drinkName)}
            style={{ width: '100%', height: '100%' }}>
            <div>
                <div>
                    {drinkName}
                </div>
                <br />
                <Box fontStyle='italic'>
                    <Typography variant="caption" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            Object.keys(drinksDict[drinkName]).map(drink => capitalize(drink)).join(', ')
                        }
                    </Typography>
                </Box>
            </div>
        </Button>
    </Grid>
}