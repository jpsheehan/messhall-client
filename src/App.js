import React, { Component } from 'react';

import UserList from './components/UserList';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>App</h1>
        <UserList />
      </div>
    );
  }
}

export default App;
