import React, {Component} from 'react';


function Message(props) {

    if(props.notification){
        return (
            <main className="messages">
              <div className="message">
                  <span className="message-username">{props.message.username}</span>
                  <span className="message-content">{props.message.content}</span>
              </div>
              <div className="message system">
                  {props.notification}
              </div>
          </main>
        );
    } else {
        return (
            <div>
              <div className="message">
                  <span className="message-username">{props.message.username}</span>
                  <span className="message-content">{props.message.content}</span>
              </div>
            </div>)
    }

}

export { Message };
