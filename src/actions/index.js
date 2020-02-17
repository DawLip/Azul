export const socketioInit = gameToken => ({
  type: 'SOCKETIO_INIT',
  gameToken
});

export const hostInit = () => ({
  type: 'HOST_INIT'
});

// game data -----------------------------------
export const updateGameData = gameData => ({
  type: 'UPDATE_GAME_DATA',
  gameData
});

export const initStartGame = id => ({
  type: 'INIT_START_GAME',
  id
});

// game ------------------------------------------
export const chooseWorkshop = i => ({
  type: 'CHOOSE__WORKSHOP',
  workshopIndex: i
});

// for workshop
export const chooseSquareToCollectW = color => ({
  type: 'CHOOSE_SQUARE_TO_COLLECT_W',
  colorOfSquare: color
});

// for rejectedSquare
export const chooseSquareToCollectS = color => ({
  type: 'CHOOSE_SQUARE_TO_COLLECT_S',
  colorOfSquare: color
});

export const chooseRow = i => ({
  type: 'CHOOSE_ROW',
  rowIndex: i
});

export const randomColors = () => ({
  type: 'RANDOM_COLORS'
});

export const countPoints = () => ({
  type: 'COUNT_POINTS'
});
