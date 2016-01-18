var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ReactDOM = require('react-dom');
var DartBoard = require('./DartBoard');
var PlayerInput = require('./PlayerInput');
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
      avgRoundScore:0,
      game:301,
      tabletPlayers: 12,
      tabletBoard: 12
    };
  },
  updateDimensions: function() {
    var board=12;
    var players=12;
    if(screen.height<screen.width)
    {
      board=8;
      players=4;
    }
    this.setState({
      tabletBoard:board,
      tabletPlayers:players
    })
    
    },
    componentWillMount: function() {
        this.updateDimensions();
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.updateDimensions);
    },
  newGame: function(value){
    var command = value.name;
    var playersValue = [];
    var gameStatus = false;
    if(value.name == "rematch")playersValue=this.state.players;
    this.setState({
      turn : 0,
      gameOn: gameStatus,
      players:playersValue,
      score : undefined,
      isDouble:false,
      gameOver:false,
      winner:undefined,
      positionX:0,
      positionY:0,
      game:301
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
  startGame: function(value){
    this.setState({gameOn:true,game:value.game});
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
    this.setState({winner : this.state.players[result.id], gameOver: true, avgRoundScore:result.avgRoundScore});
  }, 
	render(){
    var PlayerModals = [];
    var playerStyle;
    var mdModal = 0;
    var xsModal = 0;
    //styling stuff ---------------------
   /* if(this.state.gameOn && this.state.players.length<3){
      playerStyle = {
        marginTop:'5%'
      }
    }*/
    //-----------------------------------
    if(this.state.players.length<3){xsModal=12;mdModal=12;}
    else{xsModal=6;mdModal=6;};
    for(var i in this.state.players){
      if(this.state.gameOn){
      PlayerModals.push(<Col id="playerModalCol" xs={xsModal} md={mdModal}><PlayerModal key = {i} name = {this.state.players[i]} playerID = {i}
       turn = {this.state.turn} score = {this.state.score} onChangeTurn = {this.changeTurn} gameOn={this.state.gameOn}
        isDouble = {this.state.isDouble} gameOver={this.gameOver} game={this.state.game}/> </Col>);
    }
    }
     	return (
        <Grid>
  			  <Row>
            <Col xs={this.state.tabletBoard} id="dartboardParent" sm={this.state.tabletBoard} md={this.state.tabletBoard} >
                  <DartBoard id="dartboard" gameOn = {this.state.gameOn} onHit = {this.addScore}/>
                  <ScoreAnimation score = {this.state.score} gameOn = {this.state.gameOn} positionX={this.state.positionX} positionY = {this.state.positionY}/>
            </Col>			
            
            <Col xs={this.state.tabletPlayers} id="playersParent" sm={this.state.tabletPlayers} md={this.state.tabletPlayers}> 
              <PlayerInput players = {this.state.players} showInput = {this.state.gameOn} onNameSubmit = {this.addPlayer} gameOn = {this.startGame} />
              {PlayerModals}
            </Col>
              
            
            <WinModal avgRoundScore={this.state.avgRoundScore} show={this.state.gameOver} name = {this.state.winner} newGame = {this.newGame}/>
          </Row>            
          </Grid>
  		);
  }

});

module.exports = App;