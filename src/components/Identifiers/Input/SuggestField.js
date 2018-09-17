import React, { Component } from 'react';
import RegistrySuggest from '../../shared/RegistrySuggest'

class SuggestField extends Component {
  constructor(props) {
    super(props);
    this.handleRelationChange = this.handleRelationChange.bind(this);
  }

  handleRelationChange = (item, name) => {
    this.props.setFieldValue(name, item, true);
    this.props.setFieldTouched(name, true, true);
  };

  render() {
    const { name } = this.props;
    let showError = this.props.errors[name] && this.props.touched[name];
    console.log(this.props.values[name]);
    console.log(this.props.type);
    return (
      <div>
        <RegistrySuggest
          onChange={selectedItem => this.handleRelationChange(selectedItem, name)}
          selectedKey={this.props.values[name]}
          type={this.props.type}
          placeholder={this.props.label}
          disabled={this.props.disabled}
        />
        {showError && <p>{this.props.errors[name]}</p>}
      </div>
    );
  }
}

export default SuggestField;