import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


import OrganizationTitle from './organization/OrganizationTitle';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 10,
  },
});

class DrawerContent extends Component {

  render() {
    const { classes } = this.props;

    let organizationTitle = '';
    if (this.props.match.params.type === 'organization' && this.props.match.params.key) {
      organizationTitle = (
        <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <OrganizationTitle id={this.props.match.params.key}/>
            </ListItem>
          </List>
      );
    }
    return (
      <div>
        <Divider />
        <List component="nav">
          <ListItem button component={NavLink} to={{ pathname: '/organization' }} exact={true} activeClassName="active">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Publisher" />
          </ListItem>
          {organizationTitle}
          <ListItem button component={NavLink} to={{ pathname: '/installation' }} exact={true} activeClassName="active">
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Installation" />
          </ListItem>
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
      </div>
    );
  }
}

export default withStyles(styles)(DrawerContent);
