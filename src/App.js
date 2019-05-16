import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    messages: []
  };

  postMessage = event => {
    let allMessages = this.state.messages;

    
    allMessages.push({
      text: event.target.textInput.value,
      gif: ''
    })

    this.setState({
      messages: allMessages
    });

    event.preventDefault();
    console.log(event.target.textInput.value);
    axios
      .get("http://localhost:8080/?input=" + event.target.textInput.value)
      .then(response => {
        console.log(response);

        let messageObject;
        if(response.data.length > 1) {
          messageObject = {
            text: response.data[0].text,
            gif: response.data[1].source
          }
        } else {
          messageObject = {
            text: response.data[0].text,
          }
        }
        

        allMessages.push(messageObject);
        
        this.setState({
          messages: allMessages,
        });
      });
    event.target.textInput.value = ''
  };

  render() {
    return (
      <div className="main">
        <div className="title">
          <h1>Demotivator</h1>
        </div>
        <div className="messageBox">
          {
            this.state.messages.map((item, index) => {
              if(index % 2 == 0) {
                return (
                  <h2 className='request' key={index}>{item.text}</h2>
                )
              } else {

                console.log(item.gif);
                return(
                  <div key={index} className="gifText">
                    <h2 >{item.text}</h2 >
                    <img src={item.gif}/>
                  </div>
                )
              }
            })
          }
        </div>
        
        <div className="form">
        
          <form name="textForm" onSubmit={this.postMessage}>
            <input type="text" name="textInput" />
            <br />
            <button>Risk it ! </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
