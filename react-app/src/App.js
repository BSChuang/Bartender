
import React, { useState } from 'react';
import './App.css';
import { Grid, Toolbar, IconButton, Typography, AppBar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeScreen from './HomeScreen'
import NewUserScreen from './NewUserScreen'
import GetDrinkScreen from './GetDrinkScreen'
import ChooseDrinkScreen from './ChooseDrinkScreen'
import SimpleMenu from './SimpleMenu'
import CraftScreen from './CraftScreen'
import ConfigureScreen from './ConfigureScreen'

function App() {
  const [screen, setScreen] = useState('home');
  return (
    <>
      <TopBar screen={screen} setScreen={setScreen} />
      {chooseScreen(screen, setScreen)}
    </>
  );
}

function chooseScreen(screen, setScreen) {
  switch (screen) {
    case 'home':
      return <HomeScreen setScreen={setScreen} />
    case 'new':
      return <NewUserScreen />
    case 'favorite':
      return <GetDrinkScreen drink='Your favorite drink' qr='f' />
    case 'previous':
      return <GetDrinkScreen drink='Your previous drink' qr='p' />
    case 'choose':
      return <ChooseDrinkScreen />
    case 'craft':
      return <CraftScreen />
    case 'configure':
      return <ConfigureScreen />
    case 'clean':
      return <GetDrinkScreen drink='Clean' qr='c' />
    default:
      return
  }
}

function TopBar({ screen, setScreen }) {
  return <AppBar position="static">
    <Toolbar>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setScreen('home')} disabled={screen === 'home'}>
          <ArrowBackIcon />
        </IconButton>
        <Grid item xs={4}>
          <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            QRtender
          </Typography>
        </Grid>
        <SimpleMenu setScreen={setScreen} />
      </ Grid>
    </Toolbar>
    
  </AppBar>
}

export default App;
