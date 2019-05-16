import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'





class App extends React.Component {
  state= {
    answer: ''
  }


  postMessage= (event) => {
    event.preventDefault();
    console.log(event.target.textInput.value);
    axios.get('http://localhost:8080/?input=' + event.target.textInput.value).then(response => {
      console.log(response);
      this.setState({

        answer: response.data
      })
    })
  }
  
  render() {
    return (
    <div>
      <h1>Demotivator</h1>
      <h2>{this.state.answer}</h2>
      <form name="textForm" onSubmit={this.postMessage}>
        <input type='text' name="textInput"></input>
        <button>Submit</button>
      </form>
    </div>
  );
  }
  
}

export default App;
