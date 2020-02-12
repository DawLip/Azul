import React from 'react';

import { connect } from 'react-redux';
// import { createPawns, playerMove, selectPawn, checkMoveOption } from '../actions';

import Workshops from '../workshops/Workshops.jsx';
import Board from '../board/Board.jsx';
import Bottom from '../bottom/Bottom.jsx';
import RotateWarning from '../rotateWarning/RotateWarning.jsx';

import './interface.sass';

class Game extends React.Component {
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

const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
