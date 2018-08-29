import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import RegistryForm from '../shared/RegistryForm'
const baseEndpoint = 'https://api.gbif.org/v1/';


const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
});
const config = {
  name: "identifier",
  schema: [
    {
      field: "identifier",
      type: "text",
      editable: true
    },
    {
      field: "type",
      type: "enum",
      name: "IdentifierType",
      editable: true
    }
  ]
}
class Identifier extends React.Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.state = {
      resolved: false,
      data: [],
      showForm: false
    };

  }
  componentWillMount() {
    this.getData()
  }
  getData() {
    var that = this;
    const { path } = this.props;
    axios(`${baseEndpoint}${path}`)
      .then((result) => {
        that.setState({ resolved: true, data: result.data })
      })

  }
  toggleForm (){
    this.setState({showForm: !this.state.showForm})
  }
  render() {
    const { classes, path } = this.props;
    const { data, showForm } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}
            container
            direction="row"
            justify="flex-end"
            alignItems="center">
            {!showForm &&<Button variant="contained" color="primary" className={classes.button} onClick={this.toggleForm}>Add new</Button>}
          </Grid>
          <Grid item xs={false} md={2} />
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}>
          {showForm && <RegistryForm config={config} path={path}></RegistryForm>}
          </Grid><Grid item xs={false} md={2} />
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <List>
                {data.map(elm => {
                  return <ListItem key={elm.key}>
                    <ListItemText primary={`${elm.identifier} (${elm.type})`} secondary={`Created ${moment(elm.createdAt).format('LL')} by ${elm.createdBy}`} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                })}

              </List>

            </Paper>

          </Grid>
          <Grid item xs={false} md={2} />
        </Grid>
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