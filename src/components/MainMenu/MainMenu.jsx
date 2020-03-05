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

      //-----------------

      //   <div className="main-menu">
      //   	<header className="main-menu__header">
      //   		<h1 className="main-menu__title">Battles of times</h1>
      //   	</header>
      //   	<main className="main-menu__main">
      //   		<Link to={`/game/${rnd}`}>
      //   			<button className="main-menu__find">Find game</button>
      //   		</Link>
      //   		<Link to={`/game/${rnd}`}>
      //   			<button className="main-menu__create">Create game</button>
      //   		</Link>
      //   		<Link to={`/game/${gameTokenInput}`}>
      //   			<button className="main-menu__join">Join</button>
      //   		</Link>
      //   		<input className="main-menu__input" type="text" value={gameTokenInput} onChange={e => this.setState({ gameTokenInput: e.target.value })} />
      //   	</main>
      //   	<aside className="main-menu__social">
      //   		<div className="main-menu__settings">settings</div> {/* usunąć napis */}
      //   		<div className="main-menu__news">news</div> {/* usunąć napis */}
      //   		<div className="main-menu__a">
      //   			<a href="" className="main-menu__fb">fb</a> {/* zamienic na font awsome */}
      //   			<a href="" className="main-menu__yt">yt</a> {/* zamienic na font awsome */}
      //   		</div>
      //   	</aside>
      //   </div>
    );
  }
}

export { MainMenu };
