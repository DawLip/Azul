import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './reducers/index.js';

import Game from './components/Game/Game.jsx';
import { MainMenu } from './components/MainMenu';

import './style.sass';

const App = () => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path="/game/:id" render={(props) => <Game store={store} match={props.match} />} />
				<Route exact path="/" component={MainMenu} />
			</Switch>
		</Router>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
