import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './views/LandingView';

export default (req, res) => {
	if(process.env.NODE_ENV === 'development') {
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>Rick And Morty</title>
				</head>
				<body>
					<div id='app'></div>
					<script src='bundle.js'></script>
				</body>
			</html>
		`);
	} else if(process.env.NODE_ENV === 'production') {
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>Rick And Morty</title>
					<link rel='stylesheet' href='bundle.css'>
				</head>
				<body>
					<div id='app'>${renderToString(
								<App />
					)}</div>
					<script src='bundle.js'></script>
				</body>
			</html>
		`);
	}
};
