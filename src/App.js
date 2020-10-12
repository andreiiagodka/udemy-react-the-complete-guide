import React, { Component } from 'react';
import './App.css';
import Validation from './components/Validation/Validation';
import Char from './components/Char/Char';

class App extends Component {
  state = { enteredText: '' }

  getEnteredText = (event) => {
    this.setState({ enteredText: event.target.value })
  }

  removeLetter = (charIndex) => {
    const splittedText = this.state.enteredText.split('')
    splittedText.splice(charIndex, 1)
    const newText = splittedText.join('')
    this.setState({ enteredText: newText })
  }

  render() {
    return (
      <div>
        <input 
          type="text"
          value={this.state.enteredText}
          onChange={this.getEnteredText}
        />
        <p>Entered text length: {this.state.enteredText.length}</p>
        <Validation length={this.state.enteredText.length}/>
        {
          this.state.enteredText.split('').map((letter, index) => {
            return (
              <Char 
                key={index}
                letter={letter}
                clicked={() => this.removeLetter(index)}
              />
            )
          })
        }
      </div>
    )
  }
}

export default App;
