import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Title from './shared/Title'

const styles = theme => ({
});

class AppBarTitle extends Component {

  render() {
    const {match: {params}} = this.props;
    let title = 'Registry';
    if (params.type ) {
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
