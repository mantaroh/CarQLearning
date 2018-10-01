var server = require('ws').Server;
var webSocketServer = new server({port:5001});

var OBDReader = require('bluetooth-obd');

function sendToClient(msg) {
  // I'm not sure that this is correct checking for connection
  if (webSocketServer && webSocketServer.clients) {
    webSocketServer.clients.forEach(client => {
      client.send(msg);
    });
  }
}

webSocketServer.on('connection', ws => {
  console.log('connection open..');
  var reader = new OBDReader();

  reader.on('connected', () => {
    this.addPoller("vss");
    this.addPoller("rpm");
    this.startPolling(500); // 500ms
  });

  reader.on('dataReceived', data => {
    console.log(data);
    sendToClient(data);
  });
  reader.autoconnect('obd2');

  // This is test purpose
  ws.on('message', message => {
    console.log("Received: "+message);

    if (message === 'test') {
      setInterval(() => {
        let vss = Math.floor(Math.random() * 200);
        sendToClient(vss);
      }, 500);
    }
  });

  ws.on('close',() => {
    console.log('I lost a client');
    if (reader.connected) {
      reader.disconnect();
    }
  });
});
