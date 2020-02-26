import React from 'react';

import { connect } from 'react-redux';
import { randomColors, createPlayer } from '../../../actions';

import Workshops from '../workshops/Workshops.jsx';
import Board from '../board/Board.jsx';
import Bottom from '../bottom/Bottom.jsx';
import RotateWarning from '../rotateWarning/RotateWarning.jsx';

import './interface.sass';

class Game extends React.Component {
  componentWillMount = () => {
    this.props.createPlayer();
    if (!this.props.gameData.playerId) {
      this.props.randomColors();
    }
  };

  render() {
    console.log('interface', this.props.gameData.playerId);

    return (
      <div className="wrapper">
        <main className="main">
          <Workshops />
          <Board playerId={this.props.gameData.playerId} />
          <Bottom />
        </main>
        <RotateWarning />
      </div>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { randomColors, createPlayer };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
