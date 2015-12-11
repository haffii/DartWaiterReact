var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ReactDOM = require('react-dom');
var DartBoard = require('./DartBoard');
var Players = require('./Players');
var PlayerModal = require('./PlayerModal');
var Alert = require('react-bootstrap/lib/Alert');
var WinModal = require('./WinModal');
var App = React.createClass({
  getInitialState: function() {
    return {
      turn : 0,
      gameOn: false,
      players:[],
      score : undefined,
      isDouble:false,
      gameOver:false,
      winner:undefined

    };
  },
  newGame: function(){
    this.setState({
      turn : 0,
      gameOn: false,
      players:[],
      score : undefined,
      isDouble:false,
      gameOver:false,
      winner:undefined

    });
  },
  addScore: function(value){
    var letter = value.score[0];
    var mult = 0;
    this.state.isDouble = false;
    if(letter == 's'){
      mult = 1;
    }
    else if(letter == 'd'){
      mult = 2;
      this.state.isDouble = true;
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
    this.setState({score:score, isDouble:this.state.isDouble});
  },
  addPlayer: function(name){
   this.state.players.push(name.name);
   this.setState({players:this.state.players});
  },
  startGame: function(){  
    this.setState({gameOn:true});
  },
  changeTurn: function(value){
    if(this.value != undefined){
      this.setState({turn:this.value.id});
    }
    this.state.score = undefined;
    if(this.state.turn == this.state.players.length-1)this.setState({turn:0});
    else{
      this.setState({turn:this.state.turn+1});
    }
  },
  gameOver: function(result){
    this.setState({winner : this.state.players[result.id], gameOver: true})
  },
	render(){
  	return (
        <Grid>
          <Row>
            <Col md={12}> <h1>Dart Waiter</h1></Col>
          </Row>
  			  <Row>
            <Col xs={12} md={8}>
              <DartBoard gameOn = {this.state.gameOn} onHit = {this.addScore}/>
            </Col>			
            <Col xs={12} md={4}>
              <Players showInput = {this.state.gameOn} onNameSubmit = {this.addPlayer} gameOn = {this.startGame} />
              <PlayerModal name = {this.state.players[0]} playerID = {0} turn = {this.state.turn} score = {this.state.score} onChangeTurn = {this.changeTurn}
               gameOn={this.state.gameOn} isDouble = {this.state.isDouble} gameOver={this.gameOver} />

              <PlayerModal name = {this.state.players[1]} playerID = {1} turn = {this.state.turn} score = {this.state.score} onChangeTurn = {this.changeTurn} 
              gameOn={this.state.gameOn} isDouble = {this.state.isDouble} gameOver={this.gameOver}/>
            </Col>
            <WinModal show={this.state.gameOver} name = {this.state.winner} newGame = {this.newGame}/>
          </Row>            
          </Grid>
  		);
  }

});

module.exports = App;