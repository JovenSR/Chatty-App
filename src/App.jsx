import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws:localhost:3001", "protocolOne");

    this.state = {currentUser: {name: "Bob"},
                  messages: [] }
    this.message = {};

    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(username, content) {
    this.message.username = username;
    this.message.content = content;

  }



  componentDidMount() {


    this.socket.onopen =  (event) => {
      this.socket.send(JSON.stringify(this.message));
    };

    this.socket.onmessage = (event)   =>{
      var obj = JSON.parse(event.data);
      this.setState({
        messages : [...this.state.messages, {username: obj['username'],
          content: obj['content'], id: obj['id']}]
      })
    }


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
