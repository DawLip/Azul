import React from 'react';

import { connect } from 'react-redux';
// import { createPawns, playerMove, selectPawn, checkMoveOption } from '../../actions';

import './bottom.sass';

class Bottom extends React.Component {
  render() {
    return (
      <section className="bottom">
        <div className="bottom__enemyContainer">
          <div className="bottom__enemyNameContainer">
            <p className="bottom__enemyName">Player1</p>
          </div>

          <div className="bottom__enemyBoardContainer">
            <div className="bottom__enemyBoard">
              <div className="bottom__enemySquare bottom__square--blue"></div>
              <div className="bottom__enemySquare bottom__square--yellow"></div>
              <div className="bottom__enemySquare bottom__square--red"></div>
              <div className="bottom__enemySquare bottom__square--black"></div>
              <div className="bottom__enemySquare bottom__square--white"></div>
              <div className="bottom__enemySquare bottom__square--white"></div>
              <div className="bottom__enemySquare bottom__square--blue"></div>
              <div className="bottom__enemySquare bottom__square--yellow"></div>
              <div className="bottom__enemySquare bottom__square--red"></div>
              <div className="bottom__enemySquare bottom__square--black"></div>
              <div className="bottom__enemySquare bottom__square--black"></div>
              <div className="bottom__enemySquare bottom__square--white"></div>
              <div className="bottom__enemySquare bottom__square--blue"></div>
              <div className="bottom__enemySquare bottom__square--yellow"></div>
              <div className="bottom__enemySquare bottom__square--red"></div>
              <div className="bottom__enemySquare bottom__square--red"></div>
              <div className="bottom__enemySquare bottom__square--black"></div>
              <div className="bottom__enemySquare bottom__square--white"></div>
              <div className="bottom__enemySquare bottom__square--blue"></div>
              <div className="bottom__enemySquare bottom__square--yellow"></div>
              <div className="bottom__enemySquare bottom__square--yellow"></div>
              <div className="bottom__enemySquare bottom__square--red"></div>
              <div className="bottom__enemySquare bottom__square--black"></div>
              <div className="bottom__enemySquare bottom__square--white"></div>
              <div className="bottom__enemySquare bottom__square--blue"></div>
            </div>

            <div className="bottom__enemyCollectedSquaresContainer">
              <div className="bottom__enemyNegativePointsContainer">
                <p className="bottom__enemyNegativePoints">-6</p>
              </div>

              <div className="bottom__collectedSquaresRow">
                <div className="bottom__enemyCollectedSquares"></div>
              </div>

              <div className="bottom__collectedSquaresRow">
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
              </div>

              <div className="bottom__collectedSquaresRow">
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
              </div>

              <div className="bottom__collectedSquaresRow">
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
              </div>

              <div className="bottom__collectedSquaresRow">
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
                <div className="bottom__enemyCollectedSquares"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom__playersContainer">
          <div className="bottom__players">
            {this.props.gameData.players.map(player => (
              <p className="bottom__player">
                <span className="bottom__playerPoints">{player.points}</span>
                {player.name}
              </p>
            ))}
          </div>

          <div className="bottom__changePlayer">
            <div className="bottom__menuBtn">
              <i className="fas fa-bars"></i>
            </div>

            <div className="bottom__changePlayerBtn">
              <i className="fas fa-caret-right"></i>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bottom);
