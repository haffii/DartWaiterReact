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
var Overlay = require('react-bootstrap').Overlay;
var ScoreAnimation = require('./ScoreAnimation');
var App = React.createClass({
  getInitialState: function() {
    return {
      turn : 0,
      gameOn: false,
      players:[],
      score : undefined,
      isDouble:false,
      gameOver:false,
      winner:undefined,
      positionX:0,
      positionY:0,
      avgRoundScore:0
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
      winner:undefined,
      positionX:0,
      positionY:0
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
    this.setState({score:score, isDouble:this.state.isDouble,positionY:value.positionY, positionX:value.positionX});
  },
  addPlayer: function(name){
   this.state.players.push(name.name);
   this.setState({players:this.state.players});
  },
  startGame: function(){  
    this.setState({gameOn:true});
  },
  changeTurn: function(value){
    if(value != undefined){
      return this.setState({turn:value.id});
    };
    this.state.score = undefined;
    if(this.state.turn == this.state.players.length-1)this.setState({turn:0});
    else{
      this.setState({turn:this.state.turn+1});
    }
  },
  gameOver: function(result){
    this.setState({winner : this.state.players[result.id], gameOver: true, avgRoundScore:result.avgRoundScore})
  },
	render(){
    var PlayerModals = [];
    var playerStyle;
    var mdModal = 0;
    var xsModal = 0;
    //styling stuff ---------------------
   /* if(this.state.gameOn && this.state.players.length<3){
      playerStyle = {
        marginTop:'15%'
      }
    }*/
    //-----------------------------------
    if(this.state.players.length==1){xsModal=12;mdModal=4;}
    else{xsModal=6;mdModal=2;};
    for(var i in this.state.players){
      PlayerModals.push(<Col style={playerStyle} xs={xsModal} md={mdModal}><PlayerModal key = {i} name = {this.state.players[i]} playerID = {i}
       turn = {this.state.turn} score = {this.state.score} onChangeTurn = {this.changeTurn} gameOn={this.state.gameOn}
        isDouble = {this.state.isDouble} gameOver={this.gameOver}/> </Col>);
    }
    if(!this.state.gameOn)var headline = <Row><Col md={12}> <h1>Dart Waiter</h1></Col></Row>
     	return (
        <Grid>
  			  <Row>
            <Col xs={11} md={8}>
                  <DartBoard gameOn = {this.state.gameOn} onHit = {this.addScore}/>
                  <ScoreAnimation score = {this.state.score} gameOn = {this.state.gameOn} positionX={this.state.positionX} positionY = {this.state.positionY}/>
            </Col>			
            
            <Col xs={11} md={4}> 
              {headline}
              <Players showInput = {this.state.gameOn} onNameSubmit = {this.addPlayer} gameOn = {this.startGame} />
            </Col>
              {PlayerModals}
            
            <WinModal avgRoundScore={this.state.avgRoundScore} show={this.state.gameOver} name = {this.state.winner} newGame = {this.newGame}/>
          </Row>            
          </Grid>
  		);
  }

});

module.exports = App;