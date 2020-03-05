import React from 'react';

import { connect } from 'react-redux';
import { socketioInit } from '../../../actions';

import './GameIsEnded.sass';

class GameIsEnded extends React.Component {
  render() {
    const { players } = this.props.gameData;
    const playersOrder = [...players].sort((a, b) => b.points - a.points);
    console.log(playersOrder);

    return (
      <div className="endOfMatch">
        <h1 className="endOfMatch__title">End Of Match</h1>
        <div className="endOfMatch__placement">
          <div className="endOfMatch__place">
            <p className="endOfMatch__points">69</p>
            <p className="endOfMatch__nick">Qler</p>
          </div>
          <div className="endOfMatch__firstAndFourth">
            <div className="endOfMatch__first">
              <p className="endOfMatch__points">666</p>
              <p className="endOfMatch__nick">Boomer</p>
            </div>
            <div className="endOfMatch__fourth">
              {players.length === 4 && <p className="endOfMatch__points">420</p>}
              {players.length === 4 && <p className="endOfMatch__nick">Djuk</p>}
            </div>
          </div>
          <div className="endOfMatch__place">
            {players.length > 2 && <p className="endOfMatch__points">1337</p>}
            {players.length > 2 && <p className="endOfMatch__nick">Lipa</p>}
          </div>
        </div>
        <div className="preview">
          <button className="preview__button"></button>
          <p className="preview__nick">Boomer</p>
          <button className="preview__button"></button>
          <div className="preview__board">
            <div className="preview__tile preview__tile--blue"></div>
            <div className="preview__tile preview__tile--yellow"></div>
            <div className="preview__tile preview__tile--red"></div>
            <div className="preview__tile preview__tile--green"></div>
            <div className="preview__tile preview__tile--white"></div>
            <div className="preview__tile preview__tile--white"></div>
            <div className="preview__tile preview__tile--blue"></div>
            <div className="preview__tile preview__tile--yellow"></div>
            <div className="preview__tile preview__tile--red"></div>
            <div className="preview__tile preview__tile--green"></div>
            <div className="preview__tile preview__tile--green"></div>
            <div className="preview__tile preview__tile--white"></div>
            <div className="preview__tile preview__tile--blue"></div>
            <div className="preview__tile preview__tile--yellow"></div>
            <div className="preview__tile preview__tile--red"></div>
            <div className="preview__tile preview__tile--red"></div>
            <div className="preview__tile preview__tile--green"></div>
            <div className="preview__tile preview__tile--white"></div>
            <div className="preview__tile preview__tile--blue"></div>
            <div className="preview__tile preview__tile--yellow"></div>
            <div className="preview__tile preview__tile--yellow"></div>
            <div className="preview__tile preview__tile--red"></div>
            <div className="preview__tile preview__tile--green"></div>
            <div className="preview__tile preview__tile--white"></div>
            <div className="preview__tile preview__tile--blue"></div>
          </div>
        </div>
        <div className="endOfMatch__exit">
          <button className="endOfMatch__exitToMenu">Exit To Menu</button>
          <button className="endOfMatch__playAgain">Play Again</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { socketioInit };

export default connect(mapStateToProps, mapDispatchToProps)(GameIsEnded);
