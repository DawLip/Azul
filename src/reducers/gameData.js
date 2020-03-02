import { updateGameData, randomColors, countPoints } from '../actions/index.js';

export const gameData = (socket, dispatch, gameToken) => (
  state = {
    playerId: null,
    turn: 0,
    colorsInBag: [],
    nextRoundFirstPlayer: 0,
    workshopsColor: [],
    rejectedSquares: {
      blue: 0,
      yellow: 0,
      red: 0,
      green: 0,
      white: 0,
      firstPlayer: 1
    },
    players: [{ name: 'p1' }, { name: 'p2' }]
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

    case 'CREATE_PLAYER': {
      const { players, workshopsColor } = state;

      for (let i = 0; i < players.length * 2 + 1; i++) {
        workshopsColor.push([false, false, false, false]);
      }

      players.forEach((player, index) => {
        players[index] = {
          ...player,
          points: 0,
          negativePoints: 0,
          negativeSquares: 0,
          storedSquares: {
            color: '',
            number: 0
          },
          isChoosedSquareToCollect: false,
          board: [
            ['blue', false, false, false, false],
            [false, false, false, false, false],
            [false, false, 'blue', false, false],
            [false, false, false, 'blue', false],
            [false, false, false, false, 'blue']
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
        };
      });

      return { ...state };
    }

    case 'RANDOM_COLORS': {
      const { colorsInBag, workshopsColor, players } = state;
      const possibleColors = ['blue', 'yellow', 'red', 'green', 'white'];
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
      const { players, nextRoundFirstPlayer, rejectedSquares } = state;
      const colors = [
        ['blue', 'yellow', 'red', 'green', 'white'],
        ['white', 'blue', 'yellow', 'red', 'green'],
        ['green', 'white', 'blue', 'yellow', 'red'],
        ['red', 'green', 'white', 'blue', 'yellow'],
        ['yellow', 'red', 'green', 'white', 'blue']
      ];

      players.forEach(player => {
        const { queue, board } = player;
        const pointsToAdd = [];

        console.log('------------------');

        queue.forEach((queueItem, rowIndex) => {
          if (queue[rowIndex].numberOfSquares === rowIndex + 1) {
            const colIndex = colors[rowIndex].findIndex(color => color === queueItem.color);
            board[rowIndex][colIndex] = queueItem.color;

            let neighborRowIndex = rowIndex - 1;
            let neighborColIndex = colIndex;
            pointsToAdd.push('');
            let isChanging = true;
            let wasChanging = false;
            let squaresInRow = 0;
            let squaresInCol = 0;

            //check to up
            while (isChanging) {
              if (
                board[neighborRowIndex]?.[neighborColIndex] !== undefined &&
                board[neighborRowIndex]?.[neighborColIndex] != false
              ) {
                wasChanging = true;
                console.log('add up');
                pointsToAdd.push('');
                squaresInRow++;
                neighborRowIndex--;
              } else isChanging = false;
            }
            isChanging = true;
            neighborRowIndex = rowIndex + 1;

            //check to down
            while (isChanging) {
              if (
                board[neighborRowIndex]?.[neighborColIndex] !== undefined &&
                board[neighborRowIndex]?.[neighborColIndex] != false
              ) {
                wasChanging = true;
                console.log('add down');
                pointsToAdd.push('');
                squaresInRow++;
                neighborRowIndex++;
              } else isChanging = false;
            }
            isChanging = true;
            neighborRowIndex = rowIndex;
            neighborColIndex = colIndex - 1;

            //check to left
            while (isChanging) {
              if (
                board[neighborRowIndex]?.[neighborColIndex] !== undefined &&
                board[neighborRowIndex]?.[neighborColIndex] != false
              ) {
                console.log('add left');
                pointsToAdd.push('');
                squaresInCol++;
                neighborColIndex--;
                if (wasChanging) {
                  wasChanging = false;
                  pointsToAdd.push('');
                }
              } else isChanging = false;
            }
            isChanging = true;
            neighborColIndex = colIndex + 1;

            //check to right
            while (isChanging) {
              if (
                board[neighborRowIndex]?.[neighborColIndex] !== undefined &&
                board[neighborRowIndex]?.[neighborColIndex] != false
              ) {
                console.log('add right');

                pointsToAdd.push('');
                neighborColIndex++;
                squaresInCol++;
                if (wasChanging) {
                  wasChanging = false;
                  pointsToAdd.push('');
                }
              } else isChanging = false;
            }

            //adding points for full column/row/color
            if (squaresInCol === 4) {
              pointsToAdd.push('', '');
            }
            if (squaresInRow === 4) {
              for (let i = 0; i < 7; i++) {
                pointsToAdd.push('');
              }
            }
            if (board.flat().filter(color => color === queueItem.color).length === 5) {
              for (let i = 0; i < 10; i++) {
                pointsToAdd.push('');
              }
            }

            queue[rowIndex].numberOfSquares = 0;
            queue[rowIndex].color = '';
          }
        });

        //check if game end
        board.forEach(row => {
          if (row.filter(cell => cell).length === 5) state.status = 'ended';
        });

        player.points += pointsToAdd.length - player.negativePoints;
        player.negativePoints = 0;
        player.negativeSquares = 0;
      });

      state.turn = nextRoundFirstPlayer;
      rejectedSquares.firstPlayer = 1;

      socket.emit('gameData', gameToken, { players, status: state.status });

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

      if (
        !player.isChoosedSquareToCollect &&
        turn % players.length === playerId &&
        workshopsColor[workshopsColor.length - 1][0]
      ) {
        const numOfChoosedSquares = workshopsColor[numOfWorkshops].filter(
          workshopColor => workshopColor === colorOfSquare
        ).length;

        const usedColors = ['blue', 'yellow', 'red', 'green', 'white'];
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

      if (rejectedSquares.firstPlayer) {
        rejectedSquares.firstPlayer = 0;
        player.negativeSquares++;
        state.nextRoundFirstPlayer = playerId;
      }

      if (
        !player.isChoosedSquareToCollect &&
        turn % players.length === playerId &&
        rejectedSquares[colorOfSquare]
      ) {
        player.storedSquares.color = colorOfSquare;
        player.storedSquares.number = rejectedSquares[colorOfSquare];
        rejectedSquares[colorOfSquare] = 0;
        player.isChoosedSquareToCollect = true;
      }

      console.log(player.storedSquares.color, player.storedSquares.number);

      return { ...state };
    }

    case 'CHOOSE_ROW': {
      const { players, playerId, workshopsColor, rejectedSquares, colorsInBag } = state;
      const player = players[playerId]; //active player
      let { storedSquares } = player;
      const choosedRow = player.queue[rowIndex];
      const colors = [
        ['blue', 'yellow', 'red', 'green', 'white'],
        ['white', 'blue', 'yellow', 'red', 'green'],
        ['green', 'white', 'blue', 'yellow', 'red'],
        ['red', 'green', 'white', 'blue', 'yellow'],
        ['yellow', 'red', 'green', 'white', 'blue']
      ];
      const isSquareFinished =
        player.board[rowIndex][colors[rowIndex].findIndex(color => color === storedSquares.color)];

      if (storedSquares.number) {
        let negativeSquaresToAdd = 0;
        if (
          !isSquareFinished &&
          (choosedRow.numberOfSquares === 0 || choosedRow.color === storedSquares.color)
        ) {
          choosedRow.color = storedSquares.color;
          const beforeChoosedRowNumberOfSquares = choosedRow.numberOfSquares;
          choosedRow.numberOfSquares += storedSquares.number;

          if (choosedRow.numberOfSquares > rowIndex + 1) {
            choosedRow.numberOfSquares = rowIndex + 1;

            negativeSquaresToAdd =
              storedSquares.number -
              (rowIndex + 1 - beforeChoosedRowNumberOfSquares) -
              (rowIndex + 1) +
              choosedRow.numberOfSquares;
          }
        } else {
          negativeSquaresToAdd = storedSquares.number;
        }
        player.negativeSquares += negativeSquaresToAdd;

        for (let i = 0; i < negativeSquaresToAdd; i++) {
          colorsInBag.push(storedSquares.color);
        }

        if (player.negativeSquares > 0) {
          if (player.negativeSquares <= 2) player.negativePoints = player.negativeSquares;
          else if (player.negativeSquares <= 5)
            player.negativePoints = (player.negativeSquares - 2) * 2 + 2;
          else player.negativePoints = (player.negativeSquares - 5) * 3 + 8;
        } else player.negativePoints = 0;

        if (choosedRow.numberOfSquares >= rowIndex + 1) {
          for (let i = 0; i < rowIndex; i++) {
            colorsInBag.push(choosedRow.color);
          }
        }

        storedSquares.color = '';
        storedSquares.number = 0;
        player.isChoosedSquareToCollect = false;

        const isRoundEnded =
          !workshopsColor.find(
            workshop => workshop.join() !== [false, false, false, false].join()
          ) && !Object.entries(rejectedSquares).find(square => square[1] !== 0);

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
          turn: ++state.turn,
          colorsInBag
        });
      }
      return { ...state };
    }

    default:
      return state;
  }
};
