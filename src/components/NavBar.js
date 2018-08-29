import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 440,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});

function ClippedDrawer(props) {
    const { classes } = props;
    const mainEntities = ['dataset', 'organization', 'installation']
    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" noWrap>
                        <NavLink to={{ pathname: '/'}} exact={true} activeClassName="active">Registry</NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List component="nav">
                    {mainEntities.map(function(entity){
                        return <ListItem button component={NavLink} to={{ pathname: '/'+entity}} exact={true} activeClassName="active">
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary={entity} />
                    </ListItem>
                    })}
                </List>
                <Divider />
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button component="a" href="#simple-list">
                        <ListItemText primary="Something" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
            </main>
        </div>
    );
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);