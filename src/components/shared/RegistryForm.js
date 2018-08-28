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

const baseEndpoint = 'https://api.gbif.org/v1/';

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
    checkBoxHelperText: {
        marginTop: '-6px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
});



class RegistryForm extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.getFormField = this.getFormField.bind(this);
        this.state = {
            resolved: false
        };

    }

    componentWillMount() {

        this.getData()

    }

    getData() {
        var that = this;
        const { path } = this.props;
        axios(`${baseEndpoint}${path}`)
            .then((result) => {
                that.setState({ resolved: true, data: result.data })
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
        data[field].splice(index,1); 
        this.setState({
            data: data,
        });
         console.log(data)
    }
    getFormField(config) {
        const { classes } = this.props;
        const { data } = this.state;
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
                />
            }
            case "textArray": {
                return <ChipInput
                key={config.field}
                value={this.state.data[config.field]}
                onAdd={(chip) => this.handleAddChip(chip, config.field)}
                onDelete={(chip, index) => this.handleDeleteChip(chip, index, config.field)}
              />
            }
            case "relation": {
                return <RegistrySuggest key={config.field} onChange={selectedItem => this.handleRelationChange(selectedItem, config.field)} selectedKey={data[config.field]} type={config.name} placeholder={config.field} />
            }
            case "enum": {
                return <RegistryEnumSelect key={config.field} value={data[config.field]} type={config.name} onChange={this.handleChange(config.field)} label={config.field} helperText={config.helperText}/>
            }
            case "boolean": {
                return <FormControl key={`${config.field}_control`}><FormControlLabel
                    key={`${config.field}_label`}
                    control={
                        <Checkbox
                            checked={this.state.data[config.field]}
                            onChange={(e, checked) => this.setBoolean(checked, config.field)}
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
        const { resolved } = this.state;
        const { classes } = this.props;

        if (!resolved) {
            return (
                <main>
                    Loading...
                </main>
            )
        } else {

            const { config } = this.props;
            const formElements = config.schema.map(this.getFormField);
            return (
                <form className={classes.container} noValidate autoComplete="off">
                    <div className={classes.root}>
                        <Grid container spacing={8}>
                            <Grid item xs={false} md={2} />
                            <Grid item xs={12} md={8}><FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedA}
                                        onChange={this.handleChange('checkedA')}
                                        value="checkedA"
                                    />
                                }
                                label="Edit"
                            /></Grid>
                            <Grid item xs={false} md={2} />
                            <Grid item xs={false} md={2} />
                            <Grid item xs={12} md={8}>
                                <Paper className={classes.paper}>
                                    {formElements}
                                </Paper>

                            </Grid>
                            <Grid item xs={false} md={2} />
                        </Grid>
                    </div>
                </form>
            )
        }


    }
}

export default withStyles(styles)(RegistryForm);