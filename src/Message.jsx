import React, {Component} from 'react';


class Message extends Component {
  render() {
    return (
      <main class="messages">
        <div class="message">
          <span class="message-username">Anonymous1</span>
          <span class="message-content">I won't be impressed with technology until I can  download food.</span>
        </div>
        <div class="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default Message;


