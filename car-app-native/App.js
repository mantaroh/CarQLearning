import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import WS from 'react-native-websocket'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      speed: 0,
      position: "",
    };

    this.watchId = null;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const position = JSON.stringify(pos);
        this.setState({ position });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((pos) => {
      const position = JSON.stringify(pos);
      this.setState({ position });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello React Native</Text>
        <Text>{this.state.position}</Text>
         <Speedometer
           value={this.state.speed}
           totalValue={200}
           size={250}
           outerColor="#d3d3d3"
           internalColor="#ff0000"
           showText
           text={this.state.speed}
           textStyle={{ color: 'green' }}
           showLabels
           labelStyle={{ color: 'blue' }}
           showPercent
           percentStyle={{ color: 'red' }}
        />
        <WS
          ref={ref => {this.ws = ref}}
         // You need to change this address. We should be configuable this property.
//          url="ws://10.10.10.12:5001"
      url="ws://172.20.10.2:5001"
          onOpen={() => {
            console.log('Open!')
            this.ws.send('test')
          }}
          onMessage={(event) => {
            console.log(event.data);
            this.setState({
              speed: event.data
            });
          }}
          reconnect // Will try to reconnect onClose
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
