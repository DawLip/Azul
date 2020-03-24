import socket from 'socket.io';

const games = {};
const nickNames = ['Bob', 'Tom', 'Rick', 'Darius'];

export default server => {
  const io = socket(server);
  const game = io.of('/game');

  game.on('connection', socket => {
    socket.on('room', room => {
      socket.join(room);

      // create game
      if (!games[`X${room}`])
        games[`X${room}`] = {
          status: 'in lobby',
          playersIds: [],
          players: []
        };
      const numberOfPlayers = games[`X${room}`].playersIds.length;

      if (numberOfPlayers < 4) {
        // add player
        const playerId = games[`X${room}`].playersIds[numberOfPlayers - 1] + 1 || 0;

        games[`X${room}`].playersIds.push(playerId);
        games[`X${room}`].players.push({ name: nickNames[playerId] });

        socket.in(room).broadcast.emit('gameData', games[`X${room}`]);
        socket.emit('gameData', {
          ...games[`X${room}`],
          room,
          playerId
        });
      } else {
        socket.emit('gameData', {
          status: 'too many players'
        });
      }
    });

    socket.on('start game', room => {
      console.log(`start game - ${room}`);

      socket.in(room).emit('gameData', { status: 'started' });
      socket.emit('gameData', { status: 'started' });
    });

    socket.on('gameData', (room, gameData) => {
      console.log(`update gameData: ${gameData}`);

      socket.in(room).emit('gameData', gameData);
    });
  });
};
