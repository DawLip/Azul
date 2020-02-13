import { updateGameData } from '../actions/index.js';

export const gameData = (socket, dispatch, gameToken) => (
  state = {
    playerId: null,
    workshopsColor: [
      ['blue', 'black', 'blue', 'white'],
      ['red', 'red', 'blue', 'white'],
      ['red', 'red', 'blue', 'black'],
      ['red', 'red', 'black', 'yellow'],
      ['white', 'red', 'blue', 'white']
    ],
    rejectedSquares: {
      blue: 5,
      yellow: 0,
      red: 2,
      black: 0,
      white: 0
    },
    players: [
      {
        name: 'player1',
        points: 0,
        negativePoints: 0,
        negativeSquares: 0,
        storedSquares: {
          color: '',
          number: 0
        },
        isChoosedSquareToCollect: false,
        board: [
          [false, true, false, true, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false]
        ],
        queue: [
          {
            numberOfSquares: 0,
            color: ''
          },
          {
            numberOfSquares: 0,
            color: 'red'
          },
          {
            numberOfSquares: 3,
            color: 'blue'
          },
          {
            numberOfSquares: 0,
            color: ''
          },
          {
            numberOfSquares: 2,
            color: 'white'
          }
        ]
      },
      {
        name: 'player2',
        points: 0,
        negativePoints: 0,
        negativeSquares: 0,
        storedSquares: {
          color: '',
          number: 0
        },
        isChoosedSquareToCollect: false,
        board: [
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false]
        ],
        queue: [
          {
            numberOfSquares: 0,
            color: ''
          },
          {
            numberOfSquares: 0,
            color: ''
          },
          {
            numberOfSquares: 0,
            color: ''
          },
          {
            numberOfSquares: 0,
            color: ''
          },
          {
            numberOfSquares: 0,
            color: ''
          }
        ]
      }
    ]
  },
  { type, workshopIndex, colorOfSquare, rowIndex, gameData }
) => {
  switch (type) {
    case 'SOCKETIO_INIT': {
      socket.emit('room', gameToken);
      socket.on('gameData', gameData => gameData |> updateGameData |> dispatch);

      return state;
    }

    case 'UPDATE_GAME_DATA': {
      console.log('update game data', gameData);
      return { ...state, ...gameData };
    }

    case 'INIT_START_GAME': {
      socket.emit('start game', gameToken);
      return { ...state };
    }
    case 'CHOOSE__WORKSHOP': {
      const { workshopsColor } = state;
      const choosedWorkshop = workshopsColor.splice(workshopIndex, 1).flat();
      const lastChoosedWorksop = workshopsColor.splice(workshopsColor.splice.length - 1, 1).flat();

      workshopsColor.push(lastChoosedWorksop);
      workshopsColor.push(choosedWorkshop);

      return { ...state };
    }

    case 'CHOOSE_SQUARE_TO_COLLECT_W': {
      const { workshopsColor, players, playerId } = state;
      const numOfWorkshops = players.length * 2;
      const player = players[playerId];

      console.log(player.negativeSquares);

      if (!player.isChoosedSquareToCollect) {
        const numOfChoosedSquares = workshopsColor[numOfWorkshops].filter(
          workshopColor => workshopColor === colorOfSquare
        ).length;

        const usedColors = ['blue', 'yellow', 'red', 'black', 'white'];
        const rejectedSquares = workshopsColor
          .splice(workshopsColor.length - 1, 1)
          .flat()
          .filter(color => color !== colorOfSquare);

        workshopsColor.push([false, false, false, false]); //replace choosed workshop

        usedColors.forEach(color => {
          state.rejectedSquares[color] += rejectedSquares.filter(
            rejectedSquare => rejectedSquare === color
          ).length;
        });

        player.storedSquares.number = numOfChoosedSquares;
        player.storedSquares.color = colorOfSquare;
        player.isChoosedSquareToCollect = true;
      }

      return { ...state };
    }

    case 'CHOOSE_SQUARE_TO_COLLECT_S': {
      const { players, rejectedSquares, playerId } = state;
      const player = players[playerId];

      if (!player.isChoosedSquareToCollect) {
        player.storedSquares.color = colorOfSquare;
        player.storedSquares.number = rejectedSquares[colorOfSquare];
        rejectedSquares[colorOfSquare] = 0;
        player.isChoosedSquareToCollect = true;
      }

      console.log(player.storedSquares.color, player.storedSquares.number);

      return { ...state };
    }

    case 'CHOOSE_ROW': {
      const { players, playerId, workshopsColor } = state;
      const player = players[playerId]; //active player
      let { storedSquares } = player;
      const choosedRow = player.queue[rowIndex];

      if (choosedRow.numberOfSquares === 0 || choosedRow.color === storedSquares.color) {
        choosedRow.color = storedSquares.color;
        choosedRow.numberOfSquares += storedSquares.number;
        if (choosedRow.numberOfSquares > rowIndex + 1) {
          choosedRow.numberOfSquares = rowIndex + 1;
          player.negativeSquares +=
            storedSquares.number - rowIndex - 1 + choosedRow.numberOfSquares;
        }
      } else {
        player.negativeSquares += storedSquares.number;
      }
      console.log(player.negativeSquares);

      if (player.negativeSquares > 0) {
        if (player.negativeSquares <= 2) player.negativePoints = player.negativeSquares;
        else if (player.negativeSquares <= 5)
          player.negativePoints = (player.negativeSquares - 2) * 2 + 2;
        else player.negativePoints = (player.negativeSquares - 5) * 3 + 8;
      } else player.negativePoints = 0;

      storedSquares.color = '';
      storedSquares.number = 0;
      player.isChoosedSquareToCollect = false;

      return { ...state };
    }

    default:
      return state;
  }
};
