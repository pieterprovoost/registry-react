import React from 'react';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import RegistrySuggest from '../shared/RegistrySuggest'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
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
    },
    textField: {
       
        width: '100%',
    },
    menu: {
        
        width: '100%',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
});

class InstallationKey extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);

        this.state = {
            resolved: false
        };


    }

    componentWillMount() {

        this.getData()
        this.getInstallationType()

    }

    getInstallationType() {
        var that = this;
        axios('http://api.gbif.org/v1/enumeration/basic/InstallationType').then((result) => {
            that.setState({ installationTypes: result.data })
        })
    }

    getData() {
        var that = this;
        const { match: { params: { key } } } = this.props;
        var installation;
        axios(`https://api.gbif.org/v1/installation/${key}`)
            .then((result) => {
                installation = result.data;
                return axios('http://api.gbif.org/v1/organization/' + result.data.organizationKey)
            })
            .then(function (res) {
                installation.organization = res.data
                that.setState({ resolved: true, data: installation })
            })
    }
    handleChange = name => event => {
        var data = { ...this.state.data }
        data[name] = event.target.value
        this.setState({
            data: data,
        });
        console.log(data)
    };

    handleOrganizationChange = org => {
        var data = { ...this.state.data }
        data.organization = org
        data.organizationKey = org.key
        this.setState({
            data: data,
        });
        console.log(data)
    }
    setDisabled = val => {
        var data = { ...this.state.data }
        data.disabled = val
        this.setState({
            data: data,
        });
        console.log(data)

    }
    render() {
        const { resolved } = this.state;
        const { classes } = this.props;

        if (!resolved) {
            return (
                <main>
                    Loading...
                </main>
            )
        } else {

            const { data } = this.state;
            return (
                <form className={classes.container} noValidate autoComplete="off">
                    <div className={classes.root}>
                        <Grid container spacing={8}>
                            <Grid item xs={0} md={2}/>
                            <Grid item xs={12} md={8}>
                                <Paper className={classes.paper}>
                                    <TextField
                                        id="title"
                                        label="Title"
                                        className={classes.textField}
                                        value={this.state.data.title}
                                        onChange={this.handleChange('title')}
                                        margin="normal"
                                    />
                                    <RegistrySuggest onChange={this.handleOrganizationChange} selected={data.organization} type={'organization'} />
                                    <TextField
                                        id="description"
                                        label="Description"
                                        className={classes.textField}
                                        multiline={true}

                                        value={this.state.data.description}
                                        onChange={this.handleChange('description')}
                                        margin="normal"
                                    />
                                    {this.state.installationTypes &&
                                        <TextField
                                            id="select-type"
                                            select
                                            label="InstallationType"
                                            className={classes.textField}
                                            value={data.type}
                                            onChange={this.handleChange('type')}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}
                                            helperText="Please select installation type"
                                            margin="normal"
                                        >
                                            {this.state.installationTypes.map(option => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    }
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.data.disabled}
                                                onChange={(e, checked) => this.setDisabled(checked)}
                                            />
                                        }
                                        label="Disabled"
                                    />
                                </Paper>

                            </Grid>
                            <Grid item xs={0} md={2}/>



                        </Grid>
                    </div>



                </form>
            )
        }


    }
}

export default withStyles(styles)(InstallationKey);