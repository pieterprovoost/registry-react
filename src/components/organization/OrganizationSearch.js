import React from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import qs from "qs";

const organizationUrl = '//api.gbif.org/v1/organization';


class OrganizationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);

    this.state = {
      results: [],
      limit: 20,
      offset: 0
    };
  }

  componentWillMount() {
    this.loadData()
  }

  loadData(filter) {
    let that = this;
    let query = _.merge({limit: this.state.limit, offset: this.state.offset}, filter);
    axios(organizationUrl + qs.stringify(query, { addQueryPrefix: true }))
      .then(function (res) {
        that.setState({
          results: res.data.results,
          count: res.data.count,
          limit: res.data.limit,
          offset: res.data.offset
        });
      })
  }


  render() {
    return (
      <div>
        <ul>
          {this.state.results.map(function(e){
            return (
              <li key={e.key}>
                <NavLink to={{ pathname: `/organization/${e.key}` }} exact={true} activeClassName="active">{e.title}</NavLink>
              </li>
            );
          })}
        </ul>
        <button onClick={() => {this.setState({offset: this.state.offset + this.state.limit}, this.loadData)} } >Offset + 20</button>
      </div>
    );
  }
}

export default OrganizationSearch;