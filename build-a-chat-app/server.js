import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;


const server = http.createServer((req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

wss.on('connection', (socket, req) => {
  const username = new URL(req.url, 'http://localhost').searchParams.get(
    'username',
  );

  // Avisar a todos que un usuario se conectó.
  const joinedMessage = JSON.stringify({
    type: 'system',
    text: `${username} joined`,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(joinedMessage);
    }
  });

  // Recibir y difundir mensajes de chat.
  socket.on('message', (message) => {
    const { username, text } = JSON.parse(message.toString());

    const chatMessage = JSON.stringify({
      type: 'chat',
      username,
      text,
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(chatMessage);
      }
    });
  });

  // Avisar cuando un usuario se desconecta.
  socket.on('close', () => {
    const leftMessage = JSON.stringify({
      type: 'system',
      text: `${username} left`,
    });

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(leftMessage);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log('Chat server running at http://localhost:3001');
});

