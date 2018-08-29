import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


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



class RegistryForm extends React.Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.container} >
                <div className={classes.root}>
                    <Grid container spacing={8}>
                        <Grid item xs={false} md={2} />
                        <Grid item xs={12} md={8}></Grid>
                        <Grid item xs={false} md={2} />
                        <Grid item xs={false} md={2} />
                        <Grid item xs={12} md={8}>
                                {this.props.children}
                        </Grid>
                        <Grid item xs={false} md={2} />
                    </Grid>
                </div>
            </div>
        )

    }
}

export default withStyles(styles)(RegistryForm);