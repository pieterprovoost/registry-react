import React, { Component } from 'react';
import _ from 'lodash';
import RegistrySuggest from '../../shared/RegistrySuggest'

class SuggestField extends Component {
  constructor(props) {
    super(props);
    this.handleRelationChange = this.handleRelationChange.bind(this);
  }

  handleRelationChange = (item, name) => {
    console.log('change');
    console.log(item);
    this.props.setFieldValue(name, item.key, true);
    this.props.setFieldTouched(name, true, true);
  };

  render() {
    const { name } = this.props;
    console.log(this.props.errors);
    return (
      <div>
        <RegistrySuggest
          onChange={selectedItem => this.handleRelationChange(selectedItem, name)}
          selectedKey={this.props.values[name]}
          type={this.props.type}
          placeholder={this.props.label}
        />
        {this.props.errors[name] && <p>{this.props.errors[name]}</p>}
      </div>
    );
  }
}

export default SuggestField;