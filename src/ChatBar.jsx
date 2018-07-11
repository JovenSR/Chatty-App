import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {content: '', username: ''}

    this.onContent = this.onContent.bind(this);
    this.onUser = this.onUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  onUser(event) {
    this.setState({
      username: event.target.value
    });
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleKeyPress(event) {
    if(event.key === "Enter") {
      this.props.onNewPost(this.state.username, this.state.content)
      this.props.socket.onopen( (event) => {
        socket.send(this.state.content);
      });
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.username} onInput={this.onUser}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onInput={this.onContent} onKeyPress={this.handleKeyPress}/>
      </footer>
    );
  }
}

export default ChatBar;


