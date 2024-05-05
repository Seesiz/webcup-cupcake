const WebSocket = require('ws');

// Créer un serveur WebSocket
const wss = new WebSocket.WebSocketServer({ port: 8080 });
const utilisateursEnLigne = new Set();
const opponents = {}

wss.on('connection', function connection(ws) {
  // Ajouter le client à la liste des utilisateurs en ligne

  // Lorsqu'un message est reçu
  ws.on('message', function incoming(buffer) {
    let content = buffer.toString('utf8')
    if (content) {
      let message = JSON.parse(content);
      console.log("message: " + content)
      console.log("type: " + message.type)
      if (message.type === ":open") {
        ws.user = message.data;
        console.log('message:', message);
        utilisateursEnLigne.add(ws)
        findOpponent(ws, utilisateursEnLigne)
      } else if (message.type === ':deck') {
        onDeck(message);
      } else if (message.type === ':start') {
        onStart(message)
      }
    }
  });

  // Lorsque le client se déconnecte
  ws.on('close', function close() {
    // Supprimer le client de la liste des utilisateurs en ligne
    utilisateursEnLigne.delete(ws);
  });
});

const onStart = (message) => {
  console.log("on deck")
  decideUser(message, (opponent_) => {
      console.log("user1_", JSON.stringify(opponent_.user1.ws.user))
      opponent_.user1.started = true
      start(opponent_)
    },
    (opponent_) => {
      opponent_.user2.started = true
      start(opponent_)
    })
}

const start = (opponent_) => {
  if (opponent_.user1.started && opponent_.user2.started) {
    opponent_.user2.ws.send(JSON.stringify({
      type: ':start'
    }))
    opponent_.user1.ws.send(JSON.stringify({
      type: ':start'
    }))
  }
}

const onDeck = (message) => {
  console.log("on deck")
  decideUser(message, (opponent_) => {
      console.log("user1_", JSON.stringify(opponent_.user1.ws.user))
      opponent_.user1.skills = [
        ...opponent_.user1.skills,
        message.data.skill
      ]
      opponent_.user1.started = opponent_.user1.skills.length >= 4;
      opponent_.user2.ws.send(JSON.stringify({
        type: ':deck',
        data: {
          deck: opponent_.user1.skills,
          reverse: message.data.reverse
        }
      }))
      start(opponent_)
  },
  (opponent_) => {
      console.log("user2_", JSON.stringify(opponent_.user2.ws.user))
      opponent_.user2.skills = [
        ...opponent_.user2.skills,
        message.data.skill
      ]
      opponent_.user2.started = opponent_.user2.skills.length >= 4;
      opponent_.user1.ws.send(JSON.stringify({
        type: ':deck',
        data: {
          deck: opponent_.user2.skills,
          reverse: message.data.reverse
        }
      }))
      start(opponent_)
  })
}

const decideUser = (message, user_1_action= (opponent_) => {}, user_2_action=(opponent_)=> {}) => {
  try {
    let opponent_ = opponents[message.key]
    console.log("oppenent_", opponent_)
    console.log("sender", message.sender)
    if (opponent_.user1.ws.user.id === message.sender) {
      user_1_action(opponent_)
    } else {
      user_2_action(opponent_)
    }
  } catch (err) {
    console.log(err)
  }
}

const findOpponent = (ws, utilisateursEnLigne) => {
  console.log("users", utilisateursEnLigne.size)
  let isBreak = false;
  utilisateursEnLigne.forEach(wsUser => {
    if (!isBreak) {
      if (!(wsUser.user.id === ws.user.id || wsUser.user.league !== ws.user.league)) {
        let opponent = wsUser;
        let key = `${ws.user.id}-${opponent.user.id}`
        let user = {
          type: ":found",
          data: {
            opponent: ws.user,
            turn: true,
            key: key
          }
        }
        opponent.send(JSON.stringify(user))
        user = {
          type: ":found",
          data: {
            opponent: opponent.user,
            turn: false,
            key: key
          }
        }
        ws.send(JSON.stringify(user));
        utilisateursEnLigne.delete(ws);
        utilisateursEnLigne.delete(opponent);
        opponents[key] = {
          user1: {
            ws: ws,
            skills: [],
            started: false
          },
          user2: {
            ws: opponent,
            skills: [],
            started: false
          },
        }
        isBreak = true;
        console.log("found");
      }
    }
  })
}
