import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Identifier extends Component {

  state = {
    value: this.props.match.params.section || 'root',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const tabElements = tabs.map(name => {
      return <Tab key={name} value={name} label={name} to={ `/organization/${this.props.match.params.organizationKey}/${name}`} component={NavLink} />
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
            <Tab value="root" label="Publisher" to={ `/organization/${this.props.match.params.organizationKey}`} component={NavLink} />
            {tabElements}
          </Tabs>
        </AppBar>
        {value === 'root' && <TabContainer>Publisher {this.state.value} </TabContainer>}
        {value === 'contact' && <TabContainer>Contacts {this.state.value}</TabContainer>}
        {value === 'endpoint' && <TabContainer>Endpoints</TabContainer>}
        {value === 'identifier' && <TabContainer>Identifiers</TabContainer>}
        {value === 'tag' && <TabContainer>Machine tags</TabContainer>}
        {value === 'comment' && <TabContainer>Comments</TabContainer>}
        {value === 'hosted' && <TabContainer>Hosted datasets</TabContainer>}
        {value === 'published' && <TabContainer>Published datasets</TabContainer>}
        {value === 'installation' && <TabContainer>Installations</TabContainer>}
      </div>
    );
  }
}

Identifier.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Identifier);


/*
Editable type interface
Components should
  update/delete/create themselves, based on a config about url.
  optional not update, but have a callback for completing the action.
  Always have  calback for completed actions.
  Configure which is available (CREATE; UPDATE; DELETE;)
  Handle edit mode, but option to trigger from props?

Form builder
  [
    {
      displayName, required, regex, component, fields, componentProps
      //eg firstName, true, null, Input, {}
      //eg 
    }
  ]

https://www.npmjs.com/package/formik er måske værd at se på?

  The form elements should update the state.
*/