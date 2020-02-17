import { updateGameData, randomColors, countPoints } from '../actions/index.js';

export const gameData = (socket, dispatch, gameToken) => (
  state = {
    playerId: null,
    turn: 0,
    colorsInBag: [],
    workshopsColor: [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ],
    rejectedSquares: {
      blue: 0,
      yellow: 0,
      red: 0,
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

    case 'RANDOM_COLORS': {
      console.log('random colors');

      const { colorsInBag, workshopsColor, players } = state;
      const possibleColors = ['blue', 'yellow', 'red', 'black', 'white'];
      const numOfWorkshops = players.length * 2 + 1;

      if (
        !workshopsColor.find(workshop => workshop.join() !== [false, false, false, false].join())
      ) {
        possibleColors.forEach(color => {
          for (let i = 0; i < 20; i++) colorsInBag.push(color);
        });
      }

      for (let i = 0; i < numOfWorkshops; i++) {
        const col = [];
        for (let j = 0; j < 4; j++) {
          col.push(colorsInBag.splice(Math.floor(Math.random() * colorsInBag.length), 1)[0]);
        }
        workshopsColor.push(col);
      }

      workshopsColor.splice(0, numOfWorkshops);

      socket.emit('gameData', gameToken, {
        colorsInBag,
        workshopsColor
      });

      return { ...state };
    }
    case 'COUNT_POINTS': {
      const { players } = state;
      const usedColors = [
        'yellow',
        'red',
        'black',
        'white',
        'blue',
        'yellow',
        'red',
        'black',
        'white'
      ];

      players.forEach(({ queue, board }) => {
        queue.forEach((queueItem, index) => {
          board[index][usedColors.findIndex(c => c == queueItem.color) - index] = queueItem.color;
        });
      });

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
      const { workshopsColor, players, playerId, turn } = state;
      const numOfWorkshops = players.length * 2;
      const player = players[playerId];

      console.log('negative squares: ', player.negativeSquares);

      if (!player.isChoosedSquareToCollect && turn % players.length === playerId) {
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
      const { players, rejectedSquares, playerId, turn } = state;
      const player = players[playerId];

      if (!player.isChoosedSquareToCollect && turn % players.length === playerId) {
        player.storedSquares.color = colorOfSquare;
        player.storedSquares.number = rejectedSquares[colorOfSquare];
        rejectedSquares[colorOfSquare] = 0;
        player.isChoosedSquareToCollect = true;
      }

      console.log(player.storedSquares.color, player.storedSquares.number);

      return { ...state };
    }

    case 'CHOOSE_ROW': {
      const { players, playerId, workshopsColor, rejectedSquares } = state;
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

      const isRoundEnded =
        !workshopsColor.find(workshop => workshop.join() !== [false, false, false, false].join()) &&
        !Object.entries(rejectedSquares).find(square => square[1] !== 0);

      if (isRoundEnded) {
        setTimeout(() => {
          dispatch(randomColors());
          dispatch(countPoints());
        }, 0);
      }

      socket.emit('gameData', gameToken, {
        rejectedSquares,
        players,
        workshopsColor,
        turn: ++state.turn
      });

      return { ...state };
    }

    default:
      return state;
  }
};
