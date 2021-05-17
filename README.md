# 7 Wonders Duel

This is meant to be a multiplayer online adaptation of the 7 Wonders Duel board game written in Javascript with Node.js, express, Socket.io and React.

## Working draft...

This codebase is **not** useable as is !

## How to play

First run `npm install` to install dependencies

### On your machine

If you just want to test the game on your machine, you can :
- Start the server locally : `npm run server`
    - It will start a local server on port 7777 
- Start the client locally : `npm run client`
    - It will serve a React application on port 8080
- You can access the game at `http://localhost:8080` in your browser (in multiple tabs if you want to simulate multiple players)

### On your local server

If you want to both start the server and serve the React client in a way that you can access the game from any device connected to your LAN, you may :

- Start the server with a custom port if 7777 does not suit you : `PORT=5555 npm run server`

- Find the LAN IP address of your server (such as `92.168.0.184`) using ipconfig, ifconfig or any other method (Google is your friend to use the appropriate tool depending on your OS)

- Run the client still on your machine but referencing its own IP address and port :

```bash
npm run client -- --serverHost=192.168.0.184 --serverPort=5555
```

- You can then access the game at `http://92.168.0.184:8080` (using your own LAN IP address) from any device in your LAN.

Note that you might encounter issues depending on your firewall configuration.