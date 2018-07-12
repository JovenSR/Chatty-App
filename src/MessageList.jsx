import React, {Component} from 'react';
import {Message} from './Message.jsx';


class MessageList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const messages = this.props.messages;
    const renderedMessages = messages.map((message , index) =>
      (<Message key={index} message={message} notification={message.notification} />));

  return (
    <div>
        <main className="messages">
        {renderedMessages}
        </main>
    </div>
    )

  }
}

export default MessageList;