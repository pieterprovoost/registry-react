import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';



class NestedPropertyList extends React.Component {
   
  getItemText(elm){
      const { config } = this.props;
      switch(config.name){
          case 'contact': {
              return `${elm.firstName} ${elm.lastName} (${elm.type})`
          }
          case 'identifier': {
            return `${elm.identifier} (${elm.type})`
        }
        case 'endpoint': {
            return `${elm.url} (${elm.type})`
        }
          default: {
              return elm[config.schema[0].field]
          }
      }
  }  

  render() {
   const { data, config } = this.props;
    return (
              <List>
                {data.map(elm => {
                  return <ListItem key={elm.key}>
                    <ListItemText primary={this.getItemText(elm)} secondary={`Created ${moment(elm.createdAt).format('LL')} by ${elm.createdBy}`} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                })}

              </List>

            
    );
  }
}



export default NestedPropertyList;

