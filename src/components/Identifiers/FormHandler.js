import React, { Component } from 'react';
import FormBuilder from './FormBuilder';
import axios from 'axios';
import _ from 'lodash';

class FormHandler extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.getContent = this.getContent.bind(this);
        this.updateContent = this.updateContent.bind(this);

        this.state = {
            loading: !!props.id
        };
    }


    componentWillMount() {
        if (this.props.id) {
            this.getContent(this.props.id);
        }
    }

    getContent(id) {
        var that = this;
        let gbifusr = sessionStorage.getItem('gbifusr');
        let gbifpw = sessionStorage.getItem('gbifpw');
        const axConfig = {
            auth: {
                username: gbifusr,
                password: gbifpw
            }
        }
        axios(`${this.props.endpoint}/${id}`, axConfig)
            .then((response) => {
                that.setState({ loading: false, values: response.data })
            })
    }

    updateContent(id, values) {
        var that = this;
        let gbifusr = sessionStorage.getItem('gbifusr');
        let gbifpw = sessionStorage.getItem('gbifpw');
        const axConfig = {
            auth: {
                username: gbifusr,
                password: gbifpw
            }
        }
        let formValues = _.extend({}, this.state.values, values);
        axios.put(`${this.props.endpoint}/${id}`, formValues, axConfig)
            .then(() => {
                this.getContent(id);
            })
    }

    onSubmit = (values) => {
        console.log('update or create data');
        this.updateContent(this.props.id, values);
    };

    onCancel = () => {
        console.log('user cancelled form update/create');
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.loading && <FormBuilder onSubmit={this.onSubmit} onCancel={this.onCancel} values={this.state.values} config={this.props.config} disabled={true} />}
                {this.state.loading && <div>Loading</div>}
            </React.Fragment>
        );
    }
}

export default FormHandler;

// this could be a generic formhandler that could be replaced with custom ones as needed.
// wanted usage: <FormHandler config id? endpoint callbacks? />

/* 
Input components: So general input components that is wrapped so they all abide to the same interface
Formbuilder: interface onSubmit, onCancel, startValues
FormHandler: interface onSubmit, onCancel, config, id
EntityHandler: creates tabs and forms for an entity. Menu items link to this component (this could be replaced with other implemtnation of an entity)

you could be replaced with your own as long as the interface remains.

*/
