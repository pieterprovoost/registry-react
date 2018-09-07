import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePaginationActionsWrapped from '../shared/TablePaginationActionsWrapped'
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import axios from "axios";
import queryString from 'query-string';
import { NavLink } from "react-router-dom";
import RegistryFormWrapper from './RegistryFormWrapper';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

const _ = require('lodash')

const baseEndpoint = require('../../config/config').dataApi;
const adminEndpoint = require('../../config/config').userAdminApi;
const subrouteMappings = require('../../config/config').subrouteMappings;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  table: {
    minWidth: 500,
  },
  buttonGrid : {
    marginBottom: '20px'
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class EntityListPage extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    const { path } = this.props;
    this.state = {
      data: [],
      page: 0,
      offset: 0,
      rowsPerPage: 25,
      rowsPerPageOptions: [25, 50, 100],
      count: 0,
      hasOrganization: (path === 'installation' || path === 'dataset')
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page: page }, this.getData);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, this.getData);
  };

  componentWillMount() {
    this.getData()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.path !== nextProps.path) {
      this.setState({
        data: [],
        page: 0,
        offset: 0,
        rowsPerPage: 25,
        rowsPerPageOptions: [25, 50, 100],
        count: 0
      }, this.getData);
    }
  }
  attachOrganizations(result) {
    const { path } = this.props;
    let promises = [];
    _.each(result.data.results, function (r) {
      let key = (path === 'installation') ? 'organizationKey' : 'publishingOrganizationKey'
      promises.push(axios(`${baseEndpoint}organization/` + r[key])
        .then(function (res) {
          r.organization = res.data
        }))
    })
    return Promise.all(promises).then(function () {
      return result;
    })
  }
  getData() {
    const that = this;
    const { endpoint, path } = this.props;
    const { rowsPerPage, filter, page } = this.state;
    
    var url = (endpoint) ? `${baseEndpoint}${endpoint}` : `${baseEndpoint}${path}?limit=${rowsPerPage}&offset=${rowsPerPage * page}`;
    if(path === 'user'){
      url = `${adminEndpoint}search?limit=${rowsPerPage}&offset=${rowsPerPage * page}&q=`
    }
    if (filter && !endpoint) {
      url += '&' + queryString.stringify(filter);
    }
    let gbifusr = sessionStorage.getItem('gbifusr');
    let gbifpw = sessionStorage.getItem('gbifpw');
    const axConfig = {
        auth: {
            username: gbifusr,
            password: gbifpw
        }
    }
    this.setState({loading: true})
    axios(url, axConfig).then((result) => {
      if (this.state.hasOrganization) {
        return that.attachOrganizations(result).catch(function () {
          return result
        })
      } else { 
        return result 
      }
    })
      .then(function (res) {
        that.setState({
          data: res.data.results,
          count: res.data.count,
          rowsPerPage: res.data.limit,
          offset: res.data.offset,
          page: res.data.offset / res.data.limit,
          rowsPerPageOptions: [25, 50, 100],
          loading: false
        });
      })
      .catch(function(err){
        that.setState({error: err, loading: false})
      })
  }
  getItemText(elm) {
    const { path } = this.props;
    switch (path) {
      case 'user': {
        return `${elm.lastName}, ${elm.firstName}`
      }
      default: {
        return elm.title
      }
    }
  }

  render() {
    const { classes, path } = this.props;
    const entity = subrouteMappings[path] || path;
    const { data, rowsPerPage, page, count, rowsPerPageOptions, hasOrganization, loading } = this.state;
    const columns = (hasOrganization) ? [entity, 'organization', 'created', 'modified'] : [entity, 'created', 'modified'];
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);
    
    
    return (
      <RegistryFormWrapper>
        <Grid item 
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            className={classes.buttonGrid}>
            <Button variant="contained" href={`/${entity}/new`} color="primary" className={classes.button} >Add new</Button>
          </Grid>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
        {loading && <Grid item 
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.buttonGrid}>
            <CircularProgress className={classes.progress} size={50}/>
          </Grid>}
        {!loading &&  <Table className={classes.table}>
            <TableHead>
              <TableRow key={1}>
                {columns.map((n, i) => {
                  return (<TableCell key={i}>{n}</TableCell>);
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow key={n.key}>
                    <TableCell component="th" scope="row">
                     { entity !== 'user' && <NavLink to={{ pathname: `/${entity}/${n.key}` }} exact={true} activeClassName="active">{this.getItemText(n)}</NavLink>}
                     { entity === 'user' && <NavLink to={{ pathname: `/${entity}/${n.userName}` }} exact={true} activeClassName="active">{this.getItemText(n)}</NavLink>}

                    </TableCell>
                    {hasOrganization && <TableCell><NavLink to={{ pathname: `/organization/${n.organization.key}` }} exact={true} activeClassName="active">{n.organization.title}</NavLink></TableCell>}
                    <TableCell><Moment format="LL">{n.created}</Moment></TableCell>
                    <TableCell ><Moment format="LL">{n.modified}</Moment></TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={rowsPerPageOptions}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>}
        </div>
      </Paper>
      </RegistryFormWrapper>
    );
  }
}

EntityListPage.propTypes = {
  path: PropTypes.oneOf(['dataset', 'organization', 'installation', 'node', 'user', 'hostedDataset', 'publishedDataset', 'constituents', 'pendingEndorsement']).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntityListPage);