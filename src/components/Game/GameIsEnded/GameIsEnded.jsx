import React from 'react';

import { connect } from 'react-redux';
import { socketioInit } from '../../../actions';

class GameIsEnded extends React.Component {
  render() {
    const { players } = this.props.gameData;
    const playersPoints = [];
    players.forEach(player => {
      playersPoints.push(
        <p>
          {player.name}: {player.points} punktów
        </p>
      );
    });
    return (
      <>
        <p>KONIEC GRY</p>
        <div>{playersPoints}</div>
      </>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { socketioInit };

export default connect(mapStateToProps, mapDispatchToProps)(GameIsEnded);
