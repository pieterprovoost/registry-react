import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'
const baseEndpoint = require('../../config/config').dataApi;

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
      margin="normal"
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem && suggestion.title;

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
  selectedItem: PropTypes.object,
  suggestion: PropTypes.shape({ title: PropTypes.string, key: PropTypes.string }).isRequired,
};



const styles = theme => ({
  root: {
    flexGrow: 1,

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
  inputRoot: {
    flexWrap: 'wrap'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});



class RegistrySuggest extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: [], selected: { key: '', title: '' } }
    this.endpoint = baseEndpoint + this.props.type + '?q='
  }
  componentWillMount() {
    if (this.props.selectedKey) {
      axios(baseEndpoint + this.props.type + '/' + this.props.selectedKey).then((result) => {
        this.setState({ selected: result.data })
      })
    }

  }
  updateSelected(selectedKey) {
    axios(baseEndpoint + this.props.type + '/' + selectedKey).then((result) => {
      this.setState({ selected: result.data })
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedKey !== nextProps.selectedKey) {
      this.updateSelected(nextProps.selectedKey);
    }
  }

  fetchRepository = debounce(value => {
    axios
      .get(this.endpoint + value + '*')
      .then(response => {
        const items = response.data.results;
        this.setState({ items })
      })
      .catch(error => {
        console.log(error)
      })
  }, 300)

  render() {
    const { classes, onChange, placeholder, disabled } = this.props;
    const { selected } = this.state;
   
    return (
      <div className={classes.root}>
        <Downshift id="downshift-simple"
          onChange={onChange}
          selectedItem={selected}
          itemToString={item => (item ? item.title : '')}
        >
          {({ getInputProps, getItemProps, isOpen, selectedItem, highlightedIndex }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label:placeholder,
                InputProps: getInputProps({
                  placeholder: placeholder || '',
                  disabled: disabled,
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
                      itemProps: getItemProps({ item: suggestion }),
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


RegistrySuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['dataset', 'organization', 'installation', 'node', 'network']).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  selected: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string
  }),
};

export default withStyles(styles)(RegistrySuggest);