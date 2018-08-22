import React from 'react';
import axios from "axios";

class InstallationKey extends React.Component {
    constructor(props) {
        super(props);

 
        
    }
    
    componentWillMount () {
      //  const { match: { params: {installationKey} } } = this.props;
      //  console.log(JSON.stringify(this.props.params))
      const { match: { params: {installationKey} } } = this.props;
      this.setState({installationKey: installationKey})
     /* axios(`https://api.gbif.org/v1/installation/${installationKey}`).then((result) => {
        that.setState({installationKey: installationKey, data: result.data})
      }) */
      
    }


   
    render() {
        const { match: { params: {installationKey} } } = this.props;
        console.log(installationKey);
     //  const {data: {title}} = this.state;
        return (
        <main>
            {installationKey}
        </main>
        )
    }
  }

export default InstallationKey;