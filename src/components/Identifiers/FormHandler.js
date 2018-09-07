import React, { Component } from 'react';
import FormBuilder from './FormBuilder';

class FormHandler extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onSubmit = (values) => {
        console.log('update or create data');
        console.log(values);
    };

    onCancel = () => {
        console.log('user cancelled form update/create');
    }

    render() {
        return (
            <FormBuilder onSubmit={this.onSubmit} onCancel={this.onCancel} />
        );
    }
}

export default FormHandler;
