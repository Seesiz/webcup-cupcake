const WebSocket = require('ws');

// Créer un serveur WebSocket
const wss = new WebSocket.WebSocketServer({ port: 8080 });
const utilisateursEnLigne = new Set();

wss.on('connection', function connection(ws) {
  // Ajouter le client à la liste des utilisateurs en ligne

  // Lorsqu'un message est reçu
  ws.on('message', function incoming(buffer) {
    let content = buffer.toString('utf8')
    if (content) {
      let message = JSON.parse(content);
      if (message.type === ":open") {
        ws.user = message.data;
      }
      console.log('user:', message);
      utilisateursEnLigne.add(ws)

    }
  });

  // Lorsque le client se déconnecte
  ws.on('close', function close() {
    // Supprimer le client de la liste des utilisateurs en ligne
    utilisateursEnLigne.delete(ws);
  });
});
