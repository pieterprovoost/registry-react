import React, { Component } from 'react';
import _ from 'lodash';
import ChipInput from 'material-ui-chip-input';

class ChipField extends Component {
  constructor(props) {
    super(props);
    this.handleAddChip = this.handleAddChip.bind(this);
    this.handleDeleteChip = this.handleDeleteChip.bind(this);
    this.getFirst = this.getFirst.bind(this);
  }

  handleAddChip = (chip, name) => {
    let values = this.props.values[name];
    values.push(chip);
    this.props.setFieldValue(name, values, true);
    this.props.setFieldTouched(name, true, true);
  };

  handleDeleteChip = (index, name) => {
    let values = this.props.values[name];
    values.splice(index, 1);
    this.props.setFieldValue(name, values, true);
    this.props.setFieldTouched(name, true, true);
  };

  getFirst = (list) => {
    return _.isString(list) ? list : _.first(list, (e)=>{return !_.isEmpty(e)});
  };

  render() {
    const { name } = this.props;
    let firstError = this.getFirst(this.props.errors[name]);
    return (
      <ChipInput
        fullWidth={true}
        blurBehavior="add"
        margin="normal"
        label={this.props.label}
        value={this.props.values[name]}
        onAdd={(chip) => this.handleAddChip(chip, name)}
        error={firstError && this.props.touched[name]}
        helperText={firstError}
        onDelete={(chip, index) => this.handleDeleteChip(index, name)}
        disabled={this.props.disabled}
      />
    );
  }
}

export default ChipField;