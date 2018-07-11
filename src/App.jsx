import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws:localhost:3001", "protocolOne");

    this.state = {currentUser: {name: ""},
                  messages: [{username: "bob", content: "hello"}] }
    this.message = {};

    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(content, username) {
    this.message.username = username;
    this.message.content = content;
    this.setState({
      messages: [...this.state.messages, {username: username, content: content}]
    })
  }



  componentDidMount() {


   this.socket.onopen =  (event) => {
    this.socket.send(JSON.stringify(this.message));
   };


    // <Websocket url='http://localhost:3001'/>
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList messages={this.state.messages}/>

        <ChatBar onNewPost={this.onNewPost} currentUser={this.state.currentUser} socket={this.socket}/>


      </div>


    );
  }
}
export default App;
