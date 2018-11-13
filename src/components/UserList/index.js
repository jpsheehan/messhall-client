import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  TextField,
} from '@material-ui/core';

import {
  Error as ErrorIcon,
} from '@material-ui/icons';

import {getUsersQuery} from '../../queries';
import * as S from '../../strings';

/**
 * Displays a list of registered users
 */
class UserList extends Component {

  /**
   * Create a new UserList component
   * @param {Object} props The props for this component.
   */
  constructor(props) {

    super(props);
    this.state = {
      selectedIndex: -1,
      loading: false,
      searchTerm: [],
    };

  }

  /**
   * Handles the click event for a ListItem.
   * @param {Event} event The click event.
   * @param {Number} index The index of the list item.
   * @param {Object} user The user that has been selected.
   */
  handleListItemClick(event, index, user) {

    this.setState({selectedIndex: index});
    this.props.callback(user.id);

  }

  /**
   * Renders the list of users
   * @return {*}
   */
  renderListItems() {

    const data = this.props.data;

    if (data.loading === false) {

      // data has finished loading and is ready
      if (this.state.loading === true) {

        this.setState({loading: false});

      }

      if (data.users) {

        // data was loaded ok
        return data.users.filter((user) => {

          // use the search term to filter out users
          if (!this.state.searchTerm) {

            // if there is no search term, then we want all data
            return true;

          } else {

            if (
              user.name.toLowerCase().indexOf(this.state.searchTerm) > -1 ||
              this.state.searchTerm === user.id.toString().toLowerCase()
            ) {

              return true;

            } else {

              return false;

            }

          }

        }).map((user, index) => {

          return (
            <ListItem
              button
              key={index}
              selected={this.state.selectedIndex === index}
              onClick={(ev) => this.handleListItemClick(ev, index, user)}>
              <ListItemText>
                {user.name} ({user.id})
              </ListItemText>
            </ListItem>
          );

        });

      } else {

        // data could not load
        return (
          <ListItem>
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon>
            <ListItemText>
              {S.userListErrorLoading}
            </ListItemText>
          </ListItem>
        );

      }

    } else {

      // data is loading
      if (this.state.loading === false) {

        this.setState({loading: true});

      }

    }

  }

  /**
   * Handles what happens when the search bar value changes.
   * @param {Event} event
   */
  handleSearchChange(event) {

    const term = event.target.value.toLowerCase();
    this.setState({searchTerm: term});

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <div>
        {this.state.loading && <LinearProgress color='primary' />}
        <List component='nav'>
          <ListItem>
            <TextField
              id='user-list-search'
              label='Search users...'
              type='search'
              margin='normal'
              fullWidth
              disabled={this.state.loading}
              autoFocus
              onChange={(ev) => this.handleSearchChange(ev)} />
          </ListItem>
          {this.renderListItems()}
        </List>
      </div>
    );

  }

}

UserList.propTypes = {
  data: PropTypes.object,
  callback: PropTypes.func,
};

export default graphql(getUsersQuery)(UserList);
