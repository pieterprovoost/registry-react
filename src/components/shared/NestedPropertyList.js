import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RegistryForm from '../shared/RegistryForm'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios';
const baseEndpoint = require('../../config/config').dataApi;

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  typography: {
    margin: theme.spacing.unit,
  }
});

class NestedPropertyList extends React.Component {

  constructor(props) {
    super(props)
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = { item: null }
  }

  getItemText(elm) {
    const { config } = this.props;
    switch (config.name) {
      case 'contact': {
        return `${elm.firstName} ${elm.lastName} (${elm.type})`
      }
      case 'identifier': {
        return `${elm.identifier} (${elm.type})`
      }
      case 'endpoint': {
        return `${elm.url} (${elm.type})`
      }
      default: {
        return elm[config.schema[0].field]
      }
    }
  }

  editItem = item => {
    this.setState({ item: item })
  }
  deleteItem = item => {
    var that = this;
    const { path } = this.props;
    let gbifusr = sessionStorage.getItem('gbifusr');
    let gbifpw = sessionStorage.getItem('gbifpw');
    const axConfig = {
      auth: {
        username: gbifusr,
        password: gbifpw
      }
    }
    axios.delete(`${baseEndpoint}${path}/${item.key}`, axConfig)
      .then(function (res) {
        that.props.onDeleteItem(item)
      })
  }
  onCancelForm = () => {
    this.setState({ item: null })

  }
  onSave = (id) => {
    let itemId = this.state.item.key
    this.setState({ item: null })
    if (id) {
      this.props.onChange(id)
    } else {
      this.props.onChange(itemId)
    }
  }

  render() {
    const { data, config, classes, path, readOnly } = this.props;

    const { item } = this.state;
    if (item !== null) {
      return <RegistryForm id={item.key} data={item} path={path} config={config} onCancel={this.onCancelForm} onSave={this.onSave}></RegistryForm>
    }
    else if (data.length > 0) {
      return (
        <List>
          {data.map(elm => {
            return <ListItem key={elm.key}>
              <ListItemText primary={this.getItemText(elm)} secondary={`Created ${moment(elm.createdAt).format('LL')} by ${elm.createdBy}`} />
              {!readOnly && <ListItemSecondaryAction>
                {config.updatable && <IconButton aria-label="Edit" value={elm} onClick={(e) => this.editItem(elm)}>
                  <EditIcon />
                </IconButton>}
                <IconButton aria-label="Delete" value={elm} onClick={(e) => this.deleteItem(elm)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>}
            </ListItem>
          })}
        </List>
      );
    } else {
      return <Grid container
        direction="row"
        justify="center"
        alignItems="center"><Typography className={classes.typography}>No data</Typography></Grid>
    }

  }
}

NestedPropertyList.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default withStyles(styles)(NestedPropertyList);


