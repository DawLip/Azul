import React from 'react';

import { connect } from 'react-redux';
import { socketioInit } from '../../../actions';

import { Link } from 'react-router-dom';

import './GameIsEnded.sass';

class GameIsEnded extends React.Component {
	state = { idPreviewPlayer: 0 };
	render() {
		const { players } = this.props.gameData;
		let { idPreviewPlayer } = this.state;
		const playersOrder = [...players].sort((a, b) => b.points - a.points);
		const colors = [
			'blue',
			'yellow',
			'red',
			'green',
			'white',
			'white',
			'blue',
			'yellow',
			'red',
			'green',
			'green',
			'white',
			'blue',
			'yellow',
			'red',
			'red',
			'green',
			'white',
			'blue',
			'yellow',
			'yellow',
			'red',
			'green',
			'white',
			'blue'
		];

		const changeIdPreviewPlayer = char => {
			let change = 0;
			if (char === '+') {
				change = 1;
				if (idPreviewPlayer === players.length - 1) change = -players.length + 1;
			} else {
				change = -1;
				if (idPreviewPlayer === 0) change = players.length - 1;
			}
			this.setState({ idPreviewPlayer: idPreviewPlayer + change });
		};

		return (
			<div className="endOfMatch">
				<h1 className="endOfMatch__title">End Of Match</h1>

				<div className="endOfMatch__placement">
					<div className="endOfMatch__place">
						<p className="endOfMatch__points">{playersOrder[1].points}</p>
						<p className="endOfMatch__nick">{playersOrder[1].name}</p>
					</div>

					<div className="endOfMatch__firstAndFourth">
						<div className="endOfMatch__first">
							<p className="endOfMatch__points">{playersOrder[0].points}</p>
							<p className="endOfMatch__nick">{playersOrder[0].name}</p>
						</div>

						<div className="endOfMatch__fourth">
							{players.length === 4 && (
								<p className="endOfMatch__points">{playersOrder[3].points}</p>
							)}
							{players.length === 4 && <p className="endOfMatch__nick">{playersOrder[3].name}</p>}
						</div>
					</div>

					<div className="endOfMatch__place">
						{players.length > 2 && <p className="endOfMatch__points">{playersOrder[2].points}</p>}
						{players.length > 2 && <p className="endOfMatch__nick">{playersOrder[2].name}</p>}
					</div>
				</div>

				<div className="preview">
					<button className="preview__button" onClick={() => changeIdPreviewPlayer('-')}>
						{'<--'}
					</button>
					<p className="preview__nick">{players[this.state.idPreviewPlayer].name}</p>
					<button className="preview__button" onClick={() => changeIdPreviewPlayer('+')}>
						{'-->'}
					</button>

					<div className="preview__board">
						{players[idPreviewPlayer]?.board?.flat().map((isActive, index) => (
							<div
								className={`
                preview__tile preview__tile--${colors[index]} 
                ${isActive ? 'preview__tile--active' : ''}
                `}
							></div>
						))}
					</div>
				</div>

				<div className="endOfMatch__exit">
					<button className="endOfMatch__exitToMenu">	<Link to={`/`}>Exit To Menu</Link></button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { socketioInit };

export default connect(mapStateToProps, mapDispatchToProps)(GameIsEnded);
