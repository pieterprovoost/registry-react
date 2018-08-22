import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePaginationActionsWrapped from './TablePaginationActionsWrapped'
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import axios from "axios";
import queryString from 'query-string';
import { NavLink } from "react-router-dom";

const _ = require('lodash')


function getInstallations(filter, limit, offset) {

  //dispatcher.dispatch({type: "FETCH_DATA", filter, limit, offset});
  var limit = limit || 100;
  var offset = offset || 0;
  var url = 'http://api.gbif.org/v1/installation?limit=' + limit + "&offset=" + offset;
  if (filter) {
    url += '&' + queryString.stringify(filter);
  }
  return axios(url).then((result) => {
    let promises = [];
    _.each(result.data.results, function (r) {
      promises.push(axios('http://api.gbif.org/v1/organization/' + r.organizationKey)
        .then(function (res) {
          r.organization = res.data
        }))
    })
    return Promise.all(promises).then(function () {
      return result;
    })
  })

}


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Installation extends React.Component {
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

    // this.getOccurrences(this.state.rowsPerPage, this.state.page)
  }

  getData() {
    let that = this;
    getInstallations({}, this.state.rowsPerPage, this.state.page * this.state.rowsPerPage)
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
    const { classes } = this.props;
    const { data, rowsPerPage, page, count, rowsPerPageOptions } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);
    return (
      <main>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow key={1}>
                {['Installation', 'Organization', 'Created', 'Modified'].map((n, i) => {
                  return (<TableCell key={i}>{n}</TableCell>);
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow key={n.key}>
                    <TableCell component="th" scope="row">
                      <NavLink to={{ pathname: '/installation/'+n.key}} exact={true} activeClassName="active">{n.title}</NavLink>

                    </TableCell>
                    <TableCell>{n.organization.title}</TableCell>
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
      </main>
    );
  }
}

Installation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Installation);