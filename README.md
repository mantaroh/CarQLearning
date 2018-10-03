# QLearning for the Car information

This project will build the QLearning environemnt to the Car. The used information
is the OBD and GPS.

Target environment is Linux(Maybe, raspbian).

# Architecture

 * Communicate with linux and OBD via Bluetooth(ELM327).
   (You can buy the ELM327 via [Amazon](https://www.amazon.com/gp/product/B0746H9Y9Z/).)
 * We separate this client into frontend and backend. (For detail, see the repository)
 * The backend of server(node.js) will get the OBD2 information.
 * The frontend (react web or react native0 will get OBD information via backend and get GPS via native code.
 * THe frontend will send this two information(i.e., OBD and GPS) to the learning server.
 * Learning server will store this two information and learn from this information and reward information.
 * Reward is the status. like, "Stopping"/"Drive"/"Refueling"..etc
 * We will learn this state by using simulation data.

# T.B.D

 See the [wiki](../../wiki).

# Sample

 * Speed meter from OBD2 connector
 ![Image of Speed meter](https://github.com/mantaroh-y/CarQLearning/blob/master/images/speedmeter.gif)
