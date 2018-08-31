import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from './history'

import Home from './components/Home'
import EntityPage from './components/shared/EntityPage'
import EntitylistPage from './components/shared/EntityListPage'

import DrawerContent from './components/DrawerContent'

import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import AppBarTitle from './components/AppBarTitle';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  status: {
    danger: 'orange',
  },
});

const drawerWidth = 340;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class App extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    const mainEntities = ['dataset', 'organization', 'installation', 'node']
    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                  <Route path="/:type?/:key?/:section?" component={AppBarTitle} />
                </Typography>
              </Toolbar>
            </AppBar>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <Route path="/:type?/:key?/:section?" component={DrawerContent} />
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <Route path="/:type?/:key?/:section?" component={DrawerContent} />
              </Drawer>
            </Hidden>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path="/" render={(props) => <Home />} />

                {mainEntities.map(function(entity){
                  return <Route exact key={`${entity}Key`} path={`/${entity}/:key/:section?`} component={EntityPage} />
                })}
                {mainEntities.map(function(entity){
                  return <Route exact key={entity} path={`/${entity}`} render={(props) => <EntitylistPage path={entity} />} />
                })}

                <Route component={NoMatch} />
              </Switch>
            </main>
          </div>
        </MuiThemeProvider>
      </Router >
    );
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h3>
      404 - No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

export default withStyles(styles)(App);
