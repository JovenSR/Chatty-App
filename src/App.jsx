import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = new WebSocket("ws:localhost:3001", "protocolOne");

    this.state = {currentUser:  "Bob",
                  messages: [] }
    this.message = {};

    this.onNewPost = this.onNewPost.bind(this);

    this.newUsername = this.newUsername.bind(this);
  }


  onNewPost(username, content, messagetype) {
   if(this.state.currentUser !== username){
     let obj = {
       username: this.state.currentUser,
       newName: username,
       content: content,
       type: 'postNotification'
     }
      this.socket.send(JSON.stringify(obj));
    } else {
      this.message['username'] = username;
      this.message.content = content;
      this.message.type = messagetype
      this.socket.send(JSON.stringify(this.message));
     }

  }

  newUsername(username) {
    this.setState({currentUser: username})
  }

  componentDidMount() {

    this.socket.onmessage = (event) => {
      let object = JSON.parse(event.data);
      if(object.type === 'incomingMessage'){
        this.setState({ messages: [...this.state.messages,
                                  {username: object['username'],
                                  content: object['content'],
                                  id: object['id']}
                                  ]
        })
      } else {
        this.setState({ messages: [...this.state.messages,
                                  {username: object['username'],
                                  content: object['content'], id: object['id'],
                                  notification: object['message']
                                  }]
        })
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
        <ChatBar onNewPost={this.onNewPost} currentUser={this.state.currentUser} socket={this.socket} newUsername={this.newUsername}/>
      </div>
    );
  }
}
export default App;
