import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RouterIcon from '@material-ui/icons/Router';
import BusinessIcon from '@material-ui/icons/Business';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';




const styles = theme => ({
  active: {
    backgroundColor: theme.palette.action.selected
  }
});

class DrawerContent extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Divider />
        <List component="nav">
          <ListItem button component={NavLink} to={{ pathname: '/organization' }} activeClassName={classes.active}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Publisher" />
          </ListItem>
          <ListItem button component={NavLink} to={{ pathname: '/dataset' }} activeClassName={classes.active}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Dataset" />
          </ListItem>
          <ListItem button component={NavLink} to={{ pathname: '/installation' }} activeClassName={classes.active}>
            <ListItemIcon>
              <RouterIcon />
            </ListItemIcon>
            <ListItemText primary="Installation" />
          </ListItem>
          <ListItem button component={NavLink} to={{ pathname: '/node' }} activeClassName={classes.active}>
            <ListItemIcon>
              <GroupWorkIcon />
            </ListItemIcon>
            <ListItemText primary="Node" />
          </ListItem>
          <ListItem button component={NavLink} to={{ pathname: '/user' }} activeClassName={classes.active}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(DrawerContent);
