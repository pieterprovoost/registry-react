import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import OrganizationTitle from './organization/OrganizationTitle';
import Title from './shared/Title'

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
    } else if(params.type && params.key){
        title = <Title id={params.key} type={params.type}/>;
    }

    return (
      <div>
        {title}
      </div>
    );
  }
}

export default withStyles(styles)(AppBarTitle);
