var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ReactDOM = require('react-dom');
var Players = require('./Players');
var ScoreBoard = require('./ScoreBoard');
var DartBoard = require('./DartBoard');
var Contestants = require('./Contestants');
var MyModal = require('./MyModal');
var Finishes = require('./Finishes');
var App = React.createClass({
getInitialState: function() {
    return {
      players: [],
      score:[],
      roundScore:[],
      turn : 0,
      gameOn: false,
      gameOnElements:[],
      modalIsOpen:false,
      checkout:[]
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
  this.setState({checkout:<Finishes dartsLeft={3-this.state.roundScore.length} score={newScore}/>});
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
  //this.setState({modalIsOpen:true});
 	for(var i = 0; i<this.state.players.length;i++){
 		this.state.score.push([301]);
 	}
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
      <Grid>
        <Row>
          <Col md={12}> <h1 className="span12">Dart Waiter</h1></Col>
        </Row>
			  <Row>
          <Col xs={12} md={8}>
            <DartBoard gameOn = {this.state.gameOn} onHit = {this.addScore}/>
          </Col>			
          <Col md={12} md={4}>
            <Players onNameSubmit = {this.addPlayer} gameOn = {this.startGame}/>
            <ScoreBoard gameOn = {this.state.gameOn} score = {this.state.score} turn = {this.state.turn} roundScore = {this.state.roundScore} players = {this.state.players}/>
            {this.state.checkout}
          </Col>
        </Row>
        <MyModal modalIsOpen={this.state.modalIsOpen}/>
      </Grid>
		);
	}

});

module.exports = App;