import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

import Landing from './components/Landing';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import ManagerPortal from './components/ManagerPortal';
import AdminPortal from './components/AdminPortal';
import ForgotPassword from './components/ForgotPassword';

// use the new material ui typography variants
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// setup the GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3000/graphql',
  // uri: 'https://messhall.azurewebsites.net/graphql',
});

// setup the authorization header
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
        <BrowserRouter>
          <div id="main">
            <Route path="/" component={NavBar} />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/admin" component={AdminPortal} />
              <Route path="/manager" component={ManagerPortal} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );

  }

}

export default App;
