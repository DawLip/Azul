import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { initStartGame } from '../../../actions';

import './Lobby.sass';
import './LobbyMedia.sass';

const Player = ({ isPlayer }) => (
  <div className={`lobby__playerSquare ${isPlayer ? 'lobby__playerSquare--is_player' : ''}`}>
    <a></a>
  </div>
);

class Lobby extends React.Component {
  startGame = () => {
    this.props.initStartGame(this.props.gameData.id);
  };

  render() {
    const { gameData } = this.props;
    const numOfPlayers = gameData.playersIds?.length || 0;
    const maxNumOfPlayers = 8;
    const players = [];

    for (let i = 0; i < maxNumOfPlayers; i++) {
      players.push(<Player key={i} isPlayer={numOfPlayers > i} />);
    }

    return (
      <div class="lobby">
        <div class="lobby__rotate">
          <i class="fas fa-mobile-alt lobby__rotateWarning"></i>
          <p class="lobby__rotateWarning">Obróć urządzenie</p>
        </div>
        <button class="lobby__exit">
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <h1 class="lobby__title">Lobby</h1>
        <div class="lobby__wrapper">
          <h3 class="lobby__players">Players</h3>
          <div class="lobby__player">
            <p class="lobby__nick">
              Boomer <span class="lobby__nick--you">(you)</span>
            </p>
            <button class="lobby__changeName">
              <i class="fas fa-user-edit"></i>
            </button>
          </div>
          <div class="lobby__player">
            <p class="lobby__nick">Djuk</p>
            <button class="lobby__kick">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div class="lobby__player">
            <p class="lobby__nick">JKaraśa</p>
            <button class="lobby__kick">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div class="lobby__player">
            <p class="lobby__nick">Lipson</p>
            <button class="lobby__kick">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
        </div>
        <div class="lobby__buttons">
          <button class="lobby__cpButton">Copy Token</button>
          <button class="lobby__cpButton">Copy Link</button>
          <button class="lobby__readyButton" onClick={this.startGame}>
            Ready
          </button>
        </div>
      </div>
      /* <div className="lobby">
          <h1 className="lobby__title">Players in lobby:</h1>
          <div className="lobby__playerRectangle">{players}</div>
          <div className="lobby__bottom">
            {gameData.playerId === 0 && <button className="lobby__button">kick</button>}
            <h2 className="lobby__link">Token: GH643HJ8</h2>
            {gameData.playerId === 0 && (
              <button className="lobby__button" onClick={this.startGame}>
                start
              </button>
            )}
          </div>
        </div> */
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { initStartGame };
export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
