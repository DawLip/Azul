import React from 'react';

import { Link } from 'react-router-dom';

import './mainMenu.sass';
import './mainMenuMedia.sass';

class MainMenu extends React.Component {
	state = {
		gameTokenInput: ''
	};

	render() {
		const { gameTokenInput } = this.state;
		const rnd = Math.random()
			.toString(36)
			.substring(2, 10);

		return (
			<div className="menu">
				<div className="menu__background"></div>
				<div className="menu__rotate">
					<i className="fas fa-mobile-alt menu__rotateWarning"></i>
					<p className="menu__rotateWarning">Rotate Your Device</p>
				</div>
				<h1 className="menu__title">Azul</h1>
				<div className="menu__main">
					<button className="menu__button">
						<Link to={`/game/${rnd}`}>Create game</Link>
					</button>
					<div className="menu__line"></div>

					<button className="menu__button">
						<Link to={`/game/${gameTokenInput}`}>Join</Link>
					</button>
					<input
						className="menu__input"
						type="text"
						value={gameTokenInput}
						onChange={e => this.setState({ gameTokenInput: e.target.value })}
					/>
				</div>
			</div>
		);
	}
}

export { MainMenu };
