
import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const ENUM_TYPES = require('../../enums/enumTypes.json');

const baseEndpoint = `${require('../../config/config').dataApi}enumeration/basic/`

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = theme => ({

    textField: {

        width: '100%',
    },
    menu: {

        width: '100%',
    },
    formControl: {
        width: '100%',
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: theme.spacing.unit / 4,
      }

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
        const { classes, theme, onChange, value, label, helperText, disabled, multiple } = this.props;

        if (!resolved) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else if(!multiple) {

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
        } else {
            return (
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
                <Select
                  multiple
                  value={value || []}
                  onChange={onChange}
                  disabled={disabled}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {types.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={{
                        fontWeight:
                          value.indexOf(name) === -1
                            ? theme.typography.fontWeightRegular
                            : theme.typography.fontWeightMedium,
                      }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
        }


    }
}

RegistryEnumSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.oneOf(ENUM_TYPES).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
  };

export default withStyles(styles, { withTheme: true })(RegistryEnumSelect);