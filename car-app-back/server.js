var server = require("ws").Server;
var webSocketServer = new server({port:5001});
var OBDReader = require("serial-obd");

const PORT = "/dev/tty.ODBII-Port";
const RATE = 115200;

function sendToClient(msg) {
  // I"m not sure that this is correct checking for connection
  if (webSocketServer && webSocketServer.clients) {
    webSocketServer.clients.forEach(client => {
      client.send(msg);
    });
  }
}

var reader = new OBDReader(PORT, { baudRate: RATE});

reader.on("connected", function(data) {
  console.log("OBD2 connected");
  // Read the speed and engine rpm.
  this.addPoller("vss");
  this.addPoller("rpm");
  this.startPolling(500); // 500ms
});

reader.on("dataReceived", data => {
  if (data.name && (data.name === "rpm" || data.name === "vss")) {
    sendToClient(JSON.stringify(data));
  }
});

console.log("Try to connect to the serial port");
reader.connect();

webSocketServer.on("connection", ws => {
  console.log("client connected");
  // This is test purpose
  ws.on("message", message => {
    console.log("Received: "+message);

    if (message === "test") {
      setInterval(() => {
        let vss = Math.floor(Math.random() * 200);
        let rpm = Math.floor(Math.random() * 4000);
        sendToClient(JSON.stringify({ name: "vss", value: vss }));
        sendToClient(JSON.stringify({ name: "rpm", value: rpm }));
      }, 500);
    }
  });

  ws.on("close",() => {
    console.log("I lost a client");
    if (reader.connected) {
      reader.disconnect();
    }
  });
});
