import React from 'react';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RegistrySuggest from '../shared/RegistrySuggest'
import RegistryEnumSelect from '../shared/RegistryEnumSelect'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import history from '../../history'
import RegistryTextArrayInput from './RegistryTextArrayInput'
import _ from 'lodash';

const baseEndpoint = require('../../config/config').dataApi;

const styles = theme => ({
    root: {
        flexGrow: 1
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
    checkBoxHelperText: {
        marginTop: '-6px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class RegistryForm extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.getFormField = this.getFormField.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
        let isNestedProperty = (this.props.id && this.props.data) || this.props.config.isNestedProperty;
        let editMode = !this.props.id || this.props.id === 'new' || isNestedProperty
        this.state = {
            resolved: !this.props.id || this.props.id === 'new' || isNestedProperty,
            editMode: editMode,
            data: this.props.data || this.getDefaultEntity(),
            isNestedProperty: isNestedProperty
        };

    }

    componentWillMount() {
        if (!this.props.data && this.props.id && this.props.id !== 'new') {
            this.getData()
        }
    }

    getDefaultEntity() {
        const { config } = this.props;
        switch (config.name) {
            case 'user': {
                return { roles: [], settings: {} }
            }
            case 'dataset': {
                return { citation: {} }
            }
            default: {
                return {};
            }
        }
    }

    getData() {
        var that = this;
        const { config, id } = this.props;
        let gbifusr = sessionStorage.getItem('gbifusr');
        let gbifpw = sessionStorage.getItem('gbifpw');
        const axConfig = {
            auth: {
                username: gbifusr,
                password: gbifpw
            }
        }
        axios(`${config.endpoint}${id}`, axConfig)
            .then((result) => {
                that.setState({ resolved: true, data: result.data })
            })
    }

    setEditMode = enabled => {
        this.setState({
            editMode: enabled,
            version: Math.random()
        });
    };

    exitEditMode = () => {
        if (this.props.id && this.props.id !== 'new' && !this.state.isNestedProperty) {
            this.getData();
        } else if (this.props.id && this.props.id === 'new' && !this.state.isNestedProperty) {
            history.push(`/${this.props.path}`);
        }
        // editMode switch doesn´t toogle if only editMode is flipped, the version will make it update. 
        this.setState({ editMode: false, version: Math.random() })

        if (this.props.onCancel) {
            this.props.onCancel()
        }
    }

    handleFormElmChange = config => event => {
        var data = { ...this.state.data }
        _.set(data, config.field, event.target.value)
        this.setState({
            data: data,
        });
        console.log(data)
    };

    handleChange = (value, field) => {
        var data = { ...this.state.data }
        _.set(data, field, value)
        this.setState({
            data: data,
        });
        console.log(data)

    }

    saveData = () => {
        var that = this;
        const { path, id, onSave, config } = this.props;
        const { data, isNestedProperty } = this.state;
        const putEndpoint = (isNestedProperty) ? `${baseEndpoint}${path}${id}` : `${config.endpoint}${id}`;
        const postEndpoint = (isNestedProperty) ? `${baseEndpoint}${path}` : config.endpoint;
        let endpoint = (id && id !== 'new') ? putEndpoint : postEndpoint;
        let method = (id && id !== 'new') ? 'put' : 'post';
        let gbifusr = sessionStorage.getItem('gbifusr');
        let gbifpw = sessionStorage.getItem('gbifpw');
        const axConfig = {
            auth: {
                username: gbifusr,
                password: gbifpw
            }
        }
        axios[method](endpoint, data, axConfig)
            .then(function (res) {
                if (!isNestedProperty && id === 'new') {
                    history.push(`/${path}/${res.data}`);
                } else if (!isNestedProperty && id !== 'new') {
                    that.setState({ editMode: false })
                    onSave(res.data)
                } else if (isNestedProperty && onSave) {
                    onSave(res.data)
                }

            })
            .catch(function (err) {
                alert("ERROR: " + err.message)
            })

    }

    getFormField(config) {
        const { classes } = this.props;
        const { data, editMode } = this.state;
        switch (config.type) {
            case "text": {
                return <TextField
                    key={config.field}
                    id={config.field}
                    label={config.field}
                    className={classes.textField}
                    value={_.get(this.state.data, config.field, '')}
                    onChange={this.handleFormElmChange(config)}
                    multiline={config.multiline || false}
                    margin="normal"
                    disabled={!editMode || !config.editable}
                    helperText={config.helperText}

                />
            }
            case "textArray": {
                return <RegistryTextArrayInput
                    key={config.field}
                    config={config}
                    value={this.state.data[config.field]}
                    onChange={value => this.handleChange(value, config.field)}
                    disabled={!editMode || !config.editable} />
            }
            case "relation": {
                return <RegistrySuggest
                    key={config.field}
                    onChange={selectedItem => this.handleChange(selectedItem, config.field)}
                    selectedKey={_.get(this.state.data, config.field, '')}
                    type={config.name}
                    placeholder={config.field}
                    disabled={!editMode || !config.editable}
                />
            }
            case "enum": {
                return <RegistryEnumSelect
                    key={config.field}
                    multiple={config.multiple}
                    value={_.get(this.state.data, config.field, '')}
                    type={config.name}
                    onChange={this.handleFormElmChange(config)}
                    label={config.field}
                    helperText={config.helperText}
                    disabled={!editMode || !config.editable}
                />
            }
            case "boolean": {
                return <FormControl key={`${config.field}_control`}><FormControlLabel
                    key={`${config.field}_label`}
                    control={
                        <Checkbox
                            checked={_.get(this.state.data, config.field, false)}
                            onChange={(e, checked) => this.handleChange(checked, config.field)}
                            disabled={!editMode || !config.editable}
                        />
                    }
                    label={config.field}
                />
                    {config.helperText && <FormHelperText key={`${config.field}_help`} className={classes.checkBoxHelperText}>{config.helperText}</FormHelperText>}
                </FormControl>
            }
        }
    }

    render() {
        const { resolved, editMode, isNestedProperty } = this.state;
        const { classes } = this.props;

        if (!resolved) {
            return (
                <main>
                    Loading...
                </main>
            )
        } else {

            const { config, id } = this.props;
            const formElements = config.schema.map(this.getFormField);
            return (
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid>
                        {(id && id !== 'new' && !isNestedProperty && !config.readOnly) && <FormControlLabel
                            control={
                                <Switch
                                    key={this.state.version}
                                    checked={editMode}
                                    onChange={(e, checked) => this.setEditMode(checked)}
                                />
                            }
                            label="Edit"
                        />}
                        <Paper className={classes.paper}>
                            {formElements}
                            {editMode && <Grid
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="center"
                            >
                                <Button variant="contained" className={classes.button} onClick={this.exitEditMode}>
                                    Cancel
                                        </Button>
                                <Button variant="contained" color="primary" className={classes.button} onClick={this.saveData}>
                                    Submit
                                        </Button></Grid>}

                        </Paper>
                    </Grid>
                </form>
            )
        }


    }
}

export default withStyles(styles)(RegistryForm);