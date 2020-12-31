import { Button, Grid, Toolbar, IconButton, Typography, AppBar } from '@material-ui/core';

export default function HomeScreen(props) {
    return <div style={{ height: '93vh', width: '100vw' }}>
    <Grid container style={{ height: '100%' }}>
      <MainButton buttonName='Choose your drink' buttonAction='choose' setScreen={props.setScreen} />
      <MainButton buttonName='Get favorite' buttonAction='favorite' setScreen={props.setScreen} />
      <MainButton buttonName='Get previous' buttonAction='previous' setScreen={props.setScreen} />
      <MainButton buttonName='Craft your own' buttonAction='craft' setScreen={props.setScreen} />
      <MainButton buttonName='New User' buttonAction='new' setScreen={props.setScreen} />
    </Grid>
  </div>
}

function MainButton({ buttonName, buttonAction, setScreen }) {
    return <Grid item xs={12} style={{ padding: '5px' }}>
      <Button variant="contained" color="primary"
        onClick={() => setScreen(buttonAction)}
        style={{ width: '100%', height: '100%' }}>
        {buttonName}
      </Button>
    </Grid>
  }