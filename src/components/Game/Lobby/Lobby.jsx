import React from 'react';

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { initStartGame } from "../../../actions";

import './Lobby.sass';
import './LobbyMedia.sass';

const Player = ({ isPlayer }) => <div className={`lobby__playerSquare ${isPlayer ? "lobby__playerSquare--is_player" : ""}`}><a></a></div>

class Lobby extends React.Component {
	startGame = () => {
		this.props.initStartGame(this.props.gameData.id)
	}

	render() {
		const { gameData } = this.props
		const numOfPlayers = gameData.players?.length || 0
		const maxNumOfPlayers = 8
		const players = []

		for (let i = 0; i < maxNumOfPlayers; i++) {
			players.push(<Player key={i} isPlayer={numOfPlayers > i} />)
		}

		return (
			<div className="lobby">
				<h1 className="lobby__title">Players in lobby:</h1>
				<div className="lobby__playerRectangle">
					{players}
				</div>
				<div className="lobby__bottom">
					{gameData.playerId === 0 && <button className="lobby__button">kick</button>}
					<h2 className="lobby__link">Token: GH643HJ8</h2>
					{gameData.playerId === 0 && <button className="lobby__button" onClick={this.startGame}>start</button>}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ gameData }) => ({ gameData })
const mapDispatchToProps = { initStartGame };
export default connect(mapStateToProps, mapDispatchToProps)(Lobby);