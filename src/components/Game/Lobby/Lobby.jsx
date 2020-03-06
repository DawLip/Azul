import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { initStartGame, changePlayerName } from '../../../actions';

import './Lobby.sass';
import './LobbyMedia.sass';

class Lobby extends React.Component {
	startGame = () => {
		this.props.initStartGame(this.props.gameData.id);
	};

	render() {
		const { players, playerId } = this.props.gameData;
		// const numOfPlayers = gameData.playersIds?.length || 0;

		return (
			<div className="lobby">
				<div className="lobby__rotate">
					<i className="fas fa-mobile-alt lobby__rotateWarning"></i>
					<p className="lobby__rotateWarning">Obróć urządzenie</p>
				</div>
				<button className="lobby__exit">
					<i className="fas fa-sign-out-alt"></i>
				</button>
				<h1 className="lobby__title">Lobby</h1>
				<div className="lobby__wrapper">
					<h3 className="lobby__players">Players</h3>
					{
						players?.map((player, index) => (
							<div className="lobby__player">
								<p className="lobby__nick">
									<input
										className="lobby__changeNameBtn"
										value={player.name} onChange={(e) => this.props.changePlayerName(e.target.value, index)}
										disabled={!(player.name === players[playerId].name)}
									/>
									{player.name === players[playerId]?.name && <span className="lobby__nick--you">(you)</span>}
								</p>
							</div>
						))
					}

				</div>
				<div className="lobby__buttons">
					{playerId === 0 && (
						<button className="lobby__readyButton" onClick={this.startGame}>
							start
              </button>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = { initStartGame, changePlayerName };
export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
