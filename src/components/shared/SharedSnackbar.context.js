import React, { Component } from 'react';
import CustomizedSnackbar from './CustomizedSnackbar'
const SharedSnackbarContext = React.createContext();

export class SharedSnackbarProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      message: '',
      variant: 'success'
    };
  }

  
  openSnackbar = (message, variant) => {
    this.setState({
      message,
      isOpen: true,
      variant
    });
  };

  closeSnackbar = () => {
    this.setState({
      message: '',
      isOpen: false,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <SharedSnackbarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: this.state.isOpen,
          message: this.state.message,
          variant: this.state.variant

        }}
      >
        <CustomizedSnackbar />
      
        {children}
      </SharedSnackbarContext.Provider>
    );
  }
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;