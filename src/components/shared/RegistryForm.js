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
import ChipInput from 'material-ui-chip-input'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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
        let editMode = !this.props.id
        this.state = {
            resolved: !this.props.id,
            editMode: editMode,
            data: {}
        };

    }

    componentWillMount() {
       if(this.props.id){
        this.getData()
       } 
    }

    getData() {
        var that = this;
        const { path, id } = this.props;
        axios(`${baseEndpoint}${path}/${id}`)
            .then((result) => {
                that.setState({ resolved: true, data: result.data })
            })
    }
    setEditMode = enabled => {
        this.setState({
            editMode: enabled,
        });
    };

    exitEditMode = () => {
       if(this.props.id){
        this.getData();
        this.setState({
            editMode: false,
        });
       }
       if(this.props.onCancel){
        this.props.onCancel()
       }
    }

    handleChange = name => event => {
        var data = { ...this.state.data }
        data[name] = event.target.value
        this.setState({
            data: data,
        });
        console.log(data)
    };

    handleRelationChange = (selectedItem, field) => {
        var data = { ...this.state.data }
        data[field] = selectedItem.key
        this.setState({
            data: data,
        });
        console.log(data)

    }
    setBoolean = (val, field) => {
        var data = { ...this.state.data }
        data[field] = val
        this.setState({
            data: data,
        });
        console.log(data)
    }
    handleAddChip = (val, field) => {
        var data = { ...this.state.data }
        data[field].push(val);
        this.setState({
            data: data,
        });
        console.log(data)
    }
    handleDeleteChip = (val, index, field) => {
        var data = { ...this.state.data }
        data[field].splice(index, 1);
        this.setState({
            data: data,
        });
        console.log(data)
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
                    value={this.state.data[config.field]}
                    onChange={this.handleChange(config.field)}
                    multiline={config.multiline || false}
                    margin="normal"
                    disabled={!editMode}
                    helperText={config.helperText}

                />
            }
            case "textArray": {
                return <ChipInput
                    key={config.field}
                    fullWidth={true}
                    label={`${config.field}(s)`}
                    value={this.state.data[config.field]}
                    onAdd={(chip) => this.handleAddChip(chip, config.field)}
                    onDelete={(chip, index) => this.handleDeleteChip(chip, index, config.field)}
                    disabled={!editMode}
                />
            }
            case "relation": {
                return <RegistrySuggest
                    key={config.field}
                    onChange={selectedItem => this.handleRelationChange(selectedItem, config.field)}
                    selectedKey={data[config.field]}
                    type={config.name}
                    placeholder={config.field}
                    disabled={!editMode} />
            }
            case "enum": {
                return <RegistryEnumSelect
                    key={config.field}
                    value={data[config.field]}
                    type={config.name}
                    onChange={this.handleChange(config.field)}
                    label={config.field}
                    helperText={config.helperText}
                    disabled={!editMode} />
            }
            case "boolean": {
                return <FormControl key={`${config.field}_control`}><FormControlLabel
                    key={`${config.field}_label`}
                    control={
                        <Checkbox
                            checked={this.state.data[config.field]}
                            onChange={(e, checked) => this.setBoolean(checked, config.field)}
                            disabled={!editMode}
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
        const { resolved, editMode } = this.state;
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
                      { id && <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.editMode}
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
                                <Button variant="contained" color="primary" className={classes.button}>
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