import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer";

class App extends Component {
  constructor(props) {
    super(props);

    this.appRef = React.createRef();
    this.state = {
      win: null,
      webSocket: null,
      speed: 0,
    };
  }

  componentDidMount() {
    let win = this.appRef.current.ownerDocument.defaultView;
    let webSocket = new win.WebSocket("ws://127.0.0.1:5001");
    webSocket.addEventListener("open", event => {
      console.log("connected.");
      webSocket.addEventListener("message", event => {
        console.log("eventdata[" + event.data + "]");
        this.setState({
          speed: event.data,
        });
      });
      // for test
      webSocket.send("test");
    });
    this.setState({ win, webSocket });
  }

  render() {
    return (
        <div className="App" ref={this.appRef} style={{width: "500px", height: "300px", background: "#EFEFEF"}}>
        <ReactSpeedometer
      fluidWidth
      minValue={0}
      maxValue={200}
      value={this.state.speed}
        />
        </div>
    );
  }
}

export default App;
