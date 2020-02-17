import React from 'react';

import { connect } from 'react-redux';
import { randomColors } from '../../../actions';

import Workshops from '../workshops/Workshops.jsx';
import Board from '../board/Board.jsx';
import Bottom from '../bottom/Bottom.jsx';
import RotateWarning from '../rotateWarning/RotateWarning.jsx';

import './interface.sass';

class Game extends React.Component {
  componentDidMount = () => {
    if (!this.props.gameData.playerId) {
      this.props.randomColors();
    }
  };

  render() {
    return (
      <div className="wrapper">
        <main className="main">
          <Workshops />
          <Board />
          <Bottom />
        </main>
        <RotateWarning />
      </div>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { randomColors };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
