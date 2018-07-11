import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {content: '', username: 'Bob'}

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
      this.props.onNewPost(this.state.username ? this.state.username : 'Nobody', this.state.content)
      this.props.socket.onopen( (event) => {
        socket.send(this.state.content);
      });
    }
  }

  // componentDidUpdate(prevProps) {
  //   if(this.)
  // }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name}  onChange={this.onUser}  defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.onContent} onKeyPress={this.handleKeyPress}/>
      </footer>
    );
  }
}

export default ChatBar;


