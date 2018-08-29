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

const _ = require('lodash')

const baseEndpoint = require('../../config/config').dataApi;


const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 20,
    padding: 20,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EntityListPage extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);

    this.state = {
      data: [],
      page: 0,
      offset: 0,
      rowsPerPage: 25,
      rowsPerPageOptions: [25, 50, 100],
      count: 0
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

  getData() {
    const that = this;
    const { endpoint, path } = this.props;
    const { offset, rowsPerPage, filter, page } = this.state;
    var url = (endpoint) ? `${baseEndpoint}${endpoint}` : `${baseEndpoint}${path}?limit=${rowsPerPage}&offset=${rowsPerPage * page}`;

    if (filter && !endpoint) {
      url += '&' + queryString.stringify(filter);
    }
    axios(url).then((result) => {
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
      }).catch(function(){
        return result
      })
    })
      .then(function (res) {
        that.setState({
          data: res.data.results,
          count: res.data.count,
          rowsPerPage: res.data.limit,
          offset: res.data.offset,
          page: res.data.offset / res.data.limit,
          rowsPerPageOptions: [25, 50, 100]
        });
      })
  }


  render() {
    const { classes, path } = this.props;
    const { data, rowsPerPage, page, count, rowsPerPageOptions } = this.state;
    const hasOrganization = (path === 'installation' || path === 'dataset')
    const columns = (hasOrganization) ?  [path, 'organization', 'created', 'modified'] : [path,  'created', 'modified'];
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
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
                      <NavLink to={{ pathname: `/${path}/${n.key}`}} exact={true} activeClassName="active">{n.title}</NavLink>

                    </TableCell>
                    {hasOrganization && <TableCell><NavLink to={{ pathname: `/organization/${n.organization.key}`}} exact={true} activeClassName="active">{n.organization.title}</NavLink></TableCell>}
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
          </Table>
        </div>
      </Paper>
    );
  }
}

EntityListPage.propTypes = {
  path: PropTypes.oneOf(['dataset', 'organization', 'installation', 'node', 'hostedDataset', 'publishedDataset', 'constituents']).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntityListPage);