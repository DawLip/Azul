import io from "socket.io-client"
const socket = io.connect('/game');

import { combineReducers } from "redux";

import { gameData } from "./gameData";

import { createStore } from 'redux';

const store = createStore(() => { });
const gameToken = window.location.pathname.split("/")[2];

({
	gameData: gameData(socket, store.dispatch, gameToken)
}) |> combineReducers |> store.replaceReducer


export { store }