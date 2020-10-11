import React, { Component } from 'react';
import './App.css';
import UserInput from './components/UserInput/UserInput';
import UserOutput from './components/UserOutput/UserOutput';


class App extends Component {
  state = { username: 'Andrey' }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  render() {
    return (
      <div>
        <UserInput 
          name={this.state.username} 
          onChangeHandler={this.handleUsernameChange.bind(this)}
        />
        <UserOutput 
          name={this.state.username} 
        />
      </div>
    );
  }
}

export default App;
