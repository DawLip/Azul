import React from 'react';

import { connect } from 'react-redux';
import { socketioInit } from '../../../actions';

class GameIsEnded extends React.Component {
  render() {
    return <p>KONIEC GRY</p>;
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { socketioInit };

export default connect(mapStateToProps, mapDispatchToProps)(GameIsEnded);
