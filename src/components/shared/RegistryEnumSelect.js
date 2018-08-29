
import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
const ENUM_TYPES = require('../../enums/enumTypes.json');

const baseEndpoint = `${require('../../config/config').dataApi}enumeration/basic/`

const styles = theme => ({

    textField: {

        width: '100%',
    },
    menu: {

        width: '100%',
    },

});
class RegistryEnumSelect extends React.Component {
    constructor(props) {
        super(props);
        this.getTypes = this.getTypes.bind(this);

        this.state = {
            resolved: false
        };


    }
    componentWillMount() {
        this.getTypes()
    }

    getTypes() {
        const { type } = this.props;
        axios(`${baseEndpoint}${type}`).then((result) => {
            this.setState({ types: result.data, resolved: true })
        }).catch(function(err){
            console.log(err)
        })
    }

    render() {
        const { resolved, types } = this.state;
        const { classes, onChange, value, label, helperText, disabled } = this.props;

        if (!resolved) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {

            return (
                <TextField
                    id="select-type"
                    select
                    label={label}
                    className={classes.textField}
                    value={value || ""}
                    onChange={onChange}
                    disabled={disabled}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText={helperText}
                    margin="normal"
                >
                    {types.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

            )
        }


    }
}

RegistryEnumSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.oneOf(ENUM_TYPES).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

export default withStyles(styles)(RegistryEnumSelect);