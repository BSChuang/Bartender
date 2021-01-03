import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

export default function SimpleMenu({setScreen}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event, val) => {
        if (val != null) {
            setScreen(val)
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={(event) => handleClose(event, null)}
            >
                <MenuItem onClick={(event) => handleClose(event, 'configure')}>Configure</MenuItem>
                <MenuItem onClick={(event) => handleClose(event, 'clean')}>Clean</MenuItem>
                <MenuItem onClick={(event) => handleClose(event, null)}>Built by Ben Chuang</MenuItem>
            </Menu>
        </div>
    );
}