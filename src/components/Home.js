import React from 'react';
import RegistryFormWrapper from './shared/RegistryFormWrapper';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';

import FormHandler from './Identifiers/FormHandler'
import testConfig1 from './Identifiers/testConfig1';
import testConfig2 from './Identifiers/testConfig2';

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
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (value, more, evenmore) => {
        console.log(value);
        console.log(more);
        console.log(evenmore);
    };

    render() {
        const { classes } = this.props
        const usr = sessionStorage.getItem('gbifusr');

        const element = (
            <RegistryFormWrapper>
                <Paper className={classes.root}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        Welcome {usr}
                    </Grid>

                </Paper>
                {usr === 'mhoefft' && 
                <Paper className={classes.root}>
                    <FormHandler onSubmit={this.handleChange} onCancel={this.handleChange} config={testConfig2} endpoint='https://registry.gbif-dev.org/installation' id='7857582d-033e-4c54-92e1-330638596cef' />
                </Paper>
                }
            </RegistryFormWrapper>
        );
        return element;
    }

}

export default withStyles(styles)(Home);

