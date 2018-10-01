# QLearning for the Car information

This project will build the QLearning environemnt to the Car. The used information
is the ODB2 and GPS.

Target environment is Linux(Maybe, raspbian).

# Architecture

 * Communicate with linux and ODB2 via Bluetooth(ELM327).
   (You can buy the ELM327 via [Amazon](https://www.amazon.com/gp/product/B0746H9Y9Z/).)
 * We separate this client into frontend and backend. (For detail, see the repository)
 * Linux machine will get the GPS location.
 * These two information is input.
 * Reward is the status. like, "Stopping"/"Drive"/"Refueling"..etc
 * We will learn this state by using simulation data.

# T.B.D

 See the wiki.
