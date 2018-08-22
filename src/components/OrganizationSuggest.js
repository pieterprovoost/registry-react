import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'

function debounce(fn, time) {
  let timeoutId
  return wrapper
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
}

const baseEndpoint = 'http://api.gbif.org/v1/organization?q='


function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
    label="Publisher"
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.key}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.title}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};



const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});



class OrganizationSuggest extends React.Component {
    constructor(props) {
      super(props)
      this.state = {items: []}
    }
  
    fetchRepository = debounce(value => {
      axios
        .get(baseEndpoint + value)
        .then(response => {
          const items = response.data.results; 
          this.setState({items})
        })
        .catch(error => {
          console.log(error)
        })
    }, 300)
  
    render() {
        const { classes } = this.props;
        const { organization } = this.props;
      return (
        <div className={classes.root}>
        <Downshift id="downshift-simple">
          {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  placeholder: 'Search publishers',
                      onChange: event => {
                        const value = event.target.value
                        if (!value) {
                          return
                        }
                        // call the debounce function
                        this.fetchRepository(value)
                      },
                    
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {this.state.items.map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.title }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
  
      </div>
      )
    }
  }


  OrganizationSuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrganizationSuggest);