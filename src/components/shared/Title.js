import React, { Component } from 'react';
import axios from 'axios';

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
    if(this.props.id){
      axios(`//api.gbif.org/v1/${this.props.type}/${this.props.id}`)
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
    } else {
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