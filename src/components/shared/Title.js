import React, { Component } from 'react';
import axios from 'axios';
const baseEndpoint = require('../../config/config').dataApi;

class Title extends Component {
  constructor(props) {
    super(props);
    this.getTitle = this.getTitle.bind(this);
    this.state = {
      title: ''
    }
  }

  componentDidMount() {
    this.getTitle();
  }

  componentWillUnmount() {
    // Cancel fetch callback?
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.type !== this.props.type) || (prevProps.id !== this.props.id)) {
      console.log('updated');
      this.getTitle();
    }
  }
 
  getTitle() {
    const {type} = this.props;
    if(this.props.id && this.props.id !=='new' && this.props.type !== 'user'){
      axios(`${baseEndpoint}${this.props.type}/${this.props.id}`)
      .then(
        (res) => {
              this.setState({title: res.data.title, error: false});

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            this.setState({title: 'unknown', error: true});
        }
      )
    } else if(this.props.type === 'user' && this.props.id !=='new'){
      this.setState({title: this.props.id, error: false});
    } else if(this.props.id ==='new' ){
      this.setState({title: `New ${this.props.type}`});
    }  else {
      this.setState({title: this.props.type});
    }
    
  }
  render() {
    let title = this.state.error ? <span className="discreet">unknown</span> : this.state.title;
    return (
      <span>{title}</span>
    );
  }
}

export default Title;