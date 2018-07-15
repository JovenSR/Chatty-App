const express = require('express');
const ws      = require('ws');
const uuidv1 = require('uuid/v1');
const PORT = 3001;
let userCount = 0;

const app = express()
 .use(express.static('public'))
 .listen(
   PORT, '0.0.0.0', 'localhost',
   () => console.log(`Listening on ${PORT}`)
 );

let contents = '';

const wss = new ws.Server({ server: app });

//sends message back to clients if that client is still open
function broadcastMessage(message) {
 for (let client of wss.clients) {
   if(client.readyState === ws.OPEN) {
        client.send(message);
    }
  }
}

//handles incoming messages, parses them, and then sends contents to broadcastMesssage
function handleMessage(message) {
  var an_id = uuidv1();
  var obj = JSON.parse(message);
  obj['id'] = an_id;

  switch(obj['type']) {
   case "postMessage":
     obj['type'] = 'incomingMessage';
     console.log('incomingMessage');
     break;

   case "postNotification":
     obj['type'] = 'incomingNotification';
     console.log('incomingNotification')
     obj['message'] = obj.username + ' has changed their name to ' + obj.newName;
     obj['username'] = obj.newName;
     break;

   default:
     console.log('default')
  }

  contents = JSON.stringify(obj);
  broadcastMessage(contents);
}

function handleConnection(client) {
  console.log('New Connection!');
  userCount++;
  broadcastMessage(JSON.stringify({userCount, type: "usersOnline"}));
  console.log('there is a new connection there are this many users' ,userCount);
  client.on('message', handleMessage);
}

wss.on('connection', handleConnection);

//updates online user count without refreshing the page if another client closes
wss.on('connection', socket => {
  socket.once('close', () => {
    userCount--;
    broadcastMessage(JSON.stringify({userCount, type: "usersOnline"}));

  })
})


