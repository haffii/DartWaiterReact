var React = require('react');
var Players = require('./Players');
var ScoreBoard = require('./ScoreBoard');
var DartBoard = require('./DartBoard');
var Contestants = require('./Contestants');
var App = React.createClass({
getInitialState: function() {
    return {
      players: [],
      score:[],
      roundScore:[],
      turn : 0,
      gameOn: false,
      gameOnElements:[]
    };
  },
 addPlayer: function(name){
 	 this.state.players.push(name.name);
 	 this.setState({players:this.state.players});
 },
 addScore: function(value){
 	var letter = value.score[0];
 	var mult = 0;
 	if(letter == 's'){
 		mult = 1;
 	}
 	else if(letter == 'd'){
 		mult = 2;
 	}
 	else if(letter == 't'){
 		mult = 3;
 	}
 	else{
 		mult = 0;
 	}
 	var score = mult * value.score.substring(1);
 	if(isNaN(score)) {
 		score = 0;
 	}
 	this.state.roundScore.push(score);
 	this.setState({roundScore:this.state.roundScore});
 	console.log(this.state.turn);
 	this.updateScore();
 },
 checkWin: function(oldScore,newScore){
    if(oldScore-newScore<0 || oldScore-newScore === 1){
    	//todo endround if dart left
      return oldScore;
    }
    else if(oldScore-newScore === 0){
      return oldScore-newScore;
    }
    else{
      return oldScore-newScore;
    }
  },
 updateScore: function(){
 	var totScore = 0;
 	var turn = this.state.turn;
 	for(var i = 0; i<this.state.roundScore.length;i++){
 		totScore += this.state.roundScore[i];
 	}
 	var oldScore = this.state.score[turn][this.state.score[turn].length-1];
 	var newScore = this.checkWin(oldScore,totScore);
 	if(this.state.roundScore.length == 3){
 		this.state.score[turn].push(newScore);
 		this.setState({score:this.state.score});
 		this.setState({roundScore:[]});
 		if(this.state.turn == this.state.players.length-1){
 			this.state.turn = 0;
 		}
 		else{
 			this.state.turn+=1;			
 		}
 		this.setState({turn:this.state.turn});
 	}
 },
 startGame: function(value){
 	this.setState({gameOn:true});
 	for(var i = 0; i<this.state.players.length;i++){
 		this.state.score.push([300]);
 	}
 	return this.setState({gameOnElements:<row> <td><ScoreBoard score = {this.state.score} turn = {this.state.turn} roundScore = {this.state.roundScore} players = {this.state.players}/></td><td><DartBoard onHit = {this.addScore} gameOn = {this.gameOn}/></td></row>})	
 },
 			
 editPlayers: function(players){
 	var state = this.state;
 	var pos = players.pos;
 	 this.setState(players => {
            state.players.splice(pos, 1);
            return {items: state.players};
        });
  },
	render(){
	return (
			<div className="row">
      <h1>Dart Waiter</h1>
      <div id = "lefty" className="col-xs-6 col-sm-3"><DartBoard gameOn = {this.state.gameOn} onHit = {this.addScore}/></div>
			<div id= "righty" className="col-xs-6 col-sm-3">
        <Players onNameSubmit = {this.addPlayer} gameOn = {this.startGame}/>
        <ScoreBoard gameOn = {this.state.gameOn} score = {this.state.score} turn = {this.state.turn} roundScore = {this.state.roundScore} players = {this.state.players}/>
      </div>
      </div>

		);
	}

});

module.exports = App;