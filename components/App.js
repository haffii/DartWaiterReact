var React = require('react');
var ScoreBoard = require('./ScoreBoard');
var DartBoard = require('./DartBoard');
var App = React.createClass({
	
	render(){

		return (
			<div>
				<h1>Dart Waiter</h1>
				<ScoreBoard/>
				<DartBoard/>
			</div>

		);
	}

});

module.exports = App;