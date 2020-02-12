
import socket from 'socket.io'
const games = {}

export default (server) => {
	const io = socket(server)
	const game = io.of('/game')

	game.on('connection', socket => {

		socket.on('room', room => {
			socket.join(room)

			// create game
			if (!games[`X${room}`]) games[`X${room}`] = {
				status: "in lobby",
				playersIds: []
			}

			// add player
			const playerId = games[`X${room}`].playersIds[games[`X${room}`].playersIds.length - 1] + 1 || 0

			games[`X${room}`].playersIds.push(playerId)

			socket.in(room).emit('gameData', games[`X${room}`])
			socket.emit('gameData', {
				...games[`X${room}`],
				room,
				playerId
			})

		});

		socket.on('start game', room => {
			console.log(`start game - ${room}`);

			socket.in(room).emit('gameData', { status: "started" })
			socket.emit('gameData', { status: "started" })
		})
	});
}