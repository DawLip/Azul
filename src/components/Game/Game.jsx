import React from 'react';

import { connect } from 'react-redux';
import { socketioInit } from '../../actions';

import Interface from './Interface/Interface.jsx';
import GameStarted from './GameStarted/GameStarted.jsx';
import Lobby from './Lobby/Lobby.jsx';
import GameIsEnded from './GameIsEnded/GameIsEnded.jsx';
import TooManyPlayers from './TooManyPlayers/TooManyPlayers.jsx';

class Game extends React.Component {
  componentDidMount = () => {
    this.props.socketioInit(this.props.match.params.id);
  };

  render() {
    const { isGameStarted, status } = this.props.gameData;

    if (isGameStarted) return <GameStarted />;
    else if (status === 'started') return <Interface />;
    else if (status === 'ended') return <GameIsEnded />;
    else if (status === 'too many players') return <TooManyPlayers />;
    return <Lobby />;
  }
}

const mapStateToProps = ({ gameData, units }) => ({ gameData, units });
const mapDispatchToProps = { socketioInit };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
