import React, {Component} from 'react';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

// import UserList from './components/UserList';
// import CreateUser from './components/CreateUser';
import AdminPortal from './components/AdminPortal';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3000/graphql',
});

const authLink = setContext((_, {headers}) => {

  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };

});

// apollo client setup
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/**
 * The root component.
 */
class App extends Component {

  /**
   * Renders the App.
   * @return {*}
   */
  render() {

    return (
      <ApolloProvider client={client}>
        <div id="main">
          {this.renderContext()}
        </div>
      </ApolloProvider>
    );

  }

  /**
   * Renders different components depending on whether or not the user is logged
   * in.
   * @return {*}
   */
  renderContext() {

    if (this.isLoggedIn()) {

      return (
        <div>
          <NavBar />
          <AdminPortal />
        </div>
      );

    } else {

      return (<SignIn />);

    }

  }

  /**
   * Gets whether or not the user is logged in.
   * @return {Boolean}
   */
  isLoggedIn() {

    return (
      localStorage.getItem('user_name') &&
      localStorage.getItem('user_id') &&
      localStorage.getItem('token') &&
      localStorage.getItem('token_id')
    );

  }

}

export default App;
