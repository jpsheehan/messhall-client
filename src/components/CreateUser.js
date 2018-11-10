import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

import {createUserMutation} from '../queries';

/**
 * The component for creating new Users
 */
class CreateUser extends Component {

  /**
   * Creates a new CreateUser component
   * @param {Object} props The properties of the component
   */
  constructor(props) {

    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      role: 'user',
      email: '',
      password: '',
      passwordRepeat: '',
    };

  }

  /**
   * The callback when the submit button is pressed.
   * @param {Event} event The browser event.
   */
  submitForm(event) {

    event.preventDefault();

    if (this.state.password !== this.state.passwordRepeat) {

      // the passwords do not match!
      alert('The passwords must match!');

    } else {

      // the passwords match
      this.props.createUserMutation({
        variables: this.state,
      });

    }

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (

      <div className="section">
        <h5>Create User</h5>
        <div>
          <form id='create-book' onSubmit={this.submitForm.bind(this)}>

            <div className='input-field'>
              <select className='browser-default' defaultValue='user'
                onChange={(e) => this.setState({role: e.target.value})}>
                <option value="" disabled>Select Role</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className='input-field'>
              <label>First Name:</label>
              <input type='text'
                onChange={(e) => this.setState({firstName: e.target.value})} />
            </div>

            <div className="input-field">
              <label>Last Name:</label>
              <input type='text'
                onChange={(e) => this.setState({lastName: e.target.value})} />
            </div>

            <div className='input-field'>
              <label>Email:</label>
              <input type='email'
                onChange={(e) => this.setState({email: e.target.value})} />
            </div>

            <div className='input-field'>
              <label>Password:</label>
              <input type='password'
                onChange={(e) => this.setState({password: e.target.value})} />
            </div>

            <div className='input-field'>
              <label>Repeat Password:</label>
              <input type='password' onChange={
                (e) => this.setState({passwordRepeat: e.target.value})} />
            </div>

            <button className='btn waves-effect waves-light'>
              Create
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>

    );

  }

}

CreateUser.propTypes = {
  createUserMutation: PropTypes.any,
};

export default compose(
    graphql(createUserMutation, {name: 'createUserMutation'}),
)(CreateUser);
