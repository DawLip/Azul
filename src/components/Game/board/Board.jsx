import React from 'react';

import { connect } from 'react-redux';
import { chooseRow } from '../../../actions';

import './board.sass';

class Board extends React.Component {
  render() {
    console.log(this.props.playerId);

    const { players } = this.props.gameData;
    const colors = [
      'blue',
      'yellow',
      'red',
      'black',
      'white',
      'white',
      'blue',
      'yellow',
      'red',
      'black',
      'black',
      'white',
      'blue',
      'yellow',
      'red',
      'red',
      'black',
      'white',
      'blue',
      'yellow',
      'yellow',
      'red',
      'black',
      'white',
      'blue'
    ];
    const collectedSquares = [];

    for (let i = 0; i < 5; i++) {
      collectedSquares.push(
        <div className="board__collectedSquaresRow" onClick={() => this.props.chooseRow(i)}>
          {(() => {
            const collectedSquares = [];
            for (let j = 0; j <= i; j++) {
              collectedSquares.push(
                <div
                  className={`board__collectedSquares ${
                    players[this.props.playerId].queue[i].color &&
                    players[this.props.playerId].queue[i].numberOfSquares > j
                      ? `board__collectedSquares--${players[this.props.playerId].queue[i].color}`
                      : ''
                  }`}
                ></div>
              );
            }
            return collectedSquares;
          })()}
        </div>
      );
    }

    return (
      <>
        <section className="board">
          <div className="board__playerBoard">
            {players[this.props.playerId].board.flat().map((isActive, index) => (
              <div
                className={`
                board__square board__square--${colors[index]} 
                ${isActive ? 'board__square--active' : ''}
                `}
              ></div>
            ))}
          </div>

          <div className="board__collectedSquaresContainer">
            <div
              className={`board__negativePointsContainer ${
                players[this.props.playerId].storedSquares.number
                  ? `board__square--${players[this.props.playerId].storedSquares.color}`
                  : ''
              }`}
            >
              <p className="board__negativePoints">{`${
                players[this.props.playerId].negativePoints ? '-' : ''
              }${players[this.props.playerId].negativePoints}`}</p>
            </div>
            {collectedSquares}
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { chooseRow };

export default connect(mapStateToProps, mapDispatchToProps)(Board);
