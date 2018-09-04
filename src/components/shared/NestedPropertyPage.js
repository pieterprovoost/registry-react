import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import RegistryForm from '../shared/RegistryForm'
import NestedPropertyList from '../shared/NestedPropertyList'
import CustomizedSnackbar from './CustomizedSnackbar';
const baseEndpoint = require('../../config/config').dataApi;



const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 20,
    padding: 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

class NestedPropertyPage extends React.Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.onFormSave = this.onFormSave.bind(this);
    this.getItemText = this.getItemText.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.state = {
      resolved: false,
      data: [],
      showForm: false,
      snackbar: {
        variant: 'success',
        message: 'test',
        open: false
      }
    };

  }
  componentWillMount() {
    this.getData()
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
  getData() {
    var that = this;
    const { path, readOnly } = this.props;
    if (readOnly) {
      let splitted = path.split('/');
      return axios(`${baseEndpoint}${splitted[0]}/${splitted[1]}`)
        .then((result) => {
          that.setState({ showForm: false, resolved: true, data: result.data[splitted[2] + 's'] })
        })
    } else {
      return axios(`${baseEndpoint}${path}`)
        .then((result) => {
          that.setState({ showForm: false, resolved: true, data: result.data })
        })
    }
  }
  onFormSave(id) {
    var that = this;
    this.getData().then(function () {
      const { data } = that.state;
      for (var i = 0; i < data.length; i++) {
        if (data[i].key === id) {
          that.setState({ snackbar: { variant: 'success', message: that.getItemText(data[i]), open: true } })
          break;
        }
      }

    });

  }
  onDeleteItem(item) {
    var that = this;
    this.getData().then(function () {
      let txt = `${that.getItemText(item)} deleted successfully`;
      that.setState({ snackbar: { variant: 'warning', message: txt, open: true } })
    })
  }
  toggleForm() {
    this.setState({ showForm: !this.state.showForm })
  }
  render() {
    const { classes, path, config, readOnly } = this.props;
    const { data, showForm, snackbar } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}
            container
            direction="row"
            justify="flex-end"
            alignItems="center">
            {!showForm && !readOnly && <Button variant="contained" color="primary" className={classes.button} onClick={this.toggleForm}>Add new</Button>}
          </Grid>
          <Grid item xs={false} md={2} />
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}>
            {showForm && <RegistryForm config={config} path={path} onCancel={this.toggleForm} onSave={this.onFormSave}></RegistryForm>}
          </Grid><Grid item xs={false} md={2} />
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <NestedPropertyList data={data} path={path} config={config} onChange={this.onFormSave} onDeleteItem={this.onDeleteItem} readOnly={readOnly}></NestedPropertyList>
            </Paper>

          </Grid>
          <Grid item xs={false} md={2} />
        </Grid>
       {snackbar.open && <CustomizedSnackbar message={snackbar.message} variant={snackbar.variant} open={snackbar.open}></CustomizedSnackbar>}
      </div>
    );
  }
}

NestedPropertyPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedPropertyPage);


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