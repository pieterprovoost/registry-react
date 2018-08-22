import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import OrganizationTitle from './organization/OrganizationTitle';

const styles = theme => ({
});

class AppBarTitle extends Component {

  render() {
    const {match: {params}} = this.props;
    let title = 'Registry';
    if (params.type === 'organization') {
      title = 'Publisher search';
      if (params.key) {
        title = <OrganizationTitle id={params.key} />;
      }
    }
    return (
      <div>
        {title}
      </div>
    );
  }
}

export default withStyles(styles)(AppBarTitle);
