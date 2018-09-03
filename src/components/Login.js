import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import RegistryFormWrapper from './shared/RegistryFormWrapper'
import history from '../history'


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

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.login = this.login.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    login() {
        const { username, password } = this.state;
        sessionStorage.setItem('gbifpw', password);
        sessionStorage.setItem('gbifusr', username);
        history.push('/')
    }
    render() {
        const { classes } = this.props;
        return (
            <RegistryFormWrapper>
                <Paper className={classes.root}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid
                            container 
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                        <TextField
                                id="name"
                                label="Username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                margin="normal"
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                            />
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.login}>Login</Button>
                        </Grid>
                    </form>
                </Paper>
            </RegistryFormWrapper>

        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);


