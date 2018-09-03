import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import RegistryForm from '../shared/RegistryForm'
import RegistryFormWrapper from '../shared/RegistryFormWrapper'
import NestedPropertyPage from '../shared/NestedPropertyPage'
import EntitylistPage from '../shared/EntityListPage'


//const config = require('../../config/forms/organization')

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
});



class EntityPage extends Component {

    constructor(props) {
        super(props);
        const {pathname} = this.props.location;
        const config = require(`../../config/forms/${pathname.split('/')[1]}`)
        this.state = {
            value: this.props.match.params.section || 'root',
            config: config
          }

    };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, config } = this.state;
    const { match: { params: { key } } } = this.props;
    const tabs = config.nestedReadOnly.concat(config.nested.concat(config.relations)) ;

    const tabElements = tabs.map(name => {
      return <Tab key={name} value={name} label={name} to={`/${config.name}/${this.props.match.params.key}/${name}`} component={NavLink} />
    });
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab value="root" label={config.name} to={`/${config.name}/${this.props.match.params.key}`} component={NavLink} />
            {key !== 'new' && tabElements}
          </Tabs>
        </AppBar>
        {value === 'root' && <TabContainer><RegistryFormWrapper><RegistryForm config={config} path={`${config.name}`} id={this.props.match.params.key}></RegistryForm></RegistryFormWrapper></TabContainer>}
        {config.nestedReadOnly.map(function (type) {
          return (value === type) ? <TabContainer key={type}><NestedPropertyPage  config={require(`../../config/forms/${type}`)} path={`${config.name}/${key}/${type}`} readOnly={true}></NestedPropertyPage></TabContainer> : "";
        })}
        {config.nested.map(function (type) {
          return (value === type) ? <TabContainer key={type}><NestedPropertyPage  config={require(`../../config/forms/${type}`)} path={`${config.name}/${key}/${type}`} ></NestedPropertyPage></TabContainer> : "";
        })}
        {config.relations.map(function (type) {
          return (value === type) ? <TabContainer key={type}><EntitylistPage endpoint={`${config.name}/${key}/${type}`} path={type}></EntitylistPage></TabContainer> : "";
        })}

      </div>
    );
  }
}

EntityPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntityPage);