import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Installation from '../installation/Installation'
import RegistryForm from '../shared/RegistryForm'
import Indentifier from '../Identifiers/Identifier'

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

const config = {
  "name": "organization",
  "schema": [
    {
      field: "title",
      type: "text",
      editable: true
    },
    {
      field: "address",
      type: "textArray",
      editable: true
    },
    {
      field: "endorsingNodeKey",
      type: "relation",
      name: "node",
      editable: true
    },
    {
      field: "description",
      type: "text",
      multiline: true,
      editable: true
    },
    {
      field: "email",
      type: "textArray",
      editable: true
    },
    {
      field: "homepage",
      type: "textArray",
      editable: true
    },
    {
      field: "country",
      type: "enum",
      name: "Country",
      editable: true
    }
  ],
  nestedSchemas: [
    {
      name: "endpoint",
      schema: [
        {
          field: "type",
          type: "enum",
          name: "EndpointType",
          editable: true
        },
        {
          field: "description",
          type: "text",
          editable: true
        },
        {
          field: "url",
          type: "text",
          editable: true
        }
      ]
    }
  ]
}

const tabs = [
  'contact', 'endpoint', 'identifier', 'tag', 'comment', 'hosted', 'published', 'installation'
];

class Organization extends Component {

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
      return <Tab key={name} value={name} label={name} to={`/organization/${this.props.match.params.organizationKey}/${name}`} component={NavLink} />
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
            <Tab value="root" label="Publisher" to={`/organization/${this.props.match.params.organizationKey}`} component={NavLink} />
            {tabElements}
          </Tabs>
        </AppBar>
        {value === 'root' && <TabContainer><RegistryForm config={config} path={`${config.name}/${this.props.match.params.organizationKey}`}></RegistryForm> </TabContainer>}
        {value === 'contact' && <TabContainer>Contacts {this.state.value}</TabContainer>}
        {value === 'endpoint' && <TabContainer>Endpoints</TabContainer>}
        {value === 'identifier' && <TabContainer><Indentifier path={`organization/${this.props.match.params.organizationKey}/identifier`}></Indentifier></TabContainer>}
        {value === 'tag' && <TabContainer>Machine tags</TabContainer>}
        {value === 'comment' && <TabContainer>Comments</TabContainer>}
        {value === 'hosted' && <TabContainer>Hosted datasets</TabContainer>}
        {value === 'published' && <TabContainer>Published datasets</TabContainer>}
        {value === 'installation' && <TabContainer><Installation endpoint={`organization/${this.props.match.params.organizationKey}/installation`}></Installation></TabContainer>}
      </div>
    );
  }
}

Organization.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Organization);