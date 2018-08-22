import React from 'react';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//import AxiosAutocomplete from './AutoSuggest'
import OrganizationSuggest from './OrganizationSuggest'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    menu: {
        width: 200,
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
        const { match: { params: { installationKey } } } = this.props;
        var installation;
        axios(`https://api.gbif.org/v1/installation/${installationKey}`)
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
    };
    render() {
        const { resolved } = this.state;
        const { classes } = this.props;

        if (!resolved) {
            return (
                <main>
                    'Loading'
                </main>
            )
        } else {

            const { data } = this.state;
            return (
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="title"
                        label="Title"
                        className={classes.textField}
                        value={this.state.data.title}
                        onChange={this.handleChange('title')}
                        margin="normal"
                    />
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

                <OrganizationSuggest organization={data.organization} />

                </form>
            )
        }


    }
}

export default withStyles(styles)(InstallationKey);