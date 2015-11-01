var React = require('react');
var Row = require('./Row');
var PlayerInput = require('./PlayerInput');
var ScoreBoard = React.createClass({

	getInitialState: function() {
    return {
      players: [],
      columns : [],
      scoreHistory:[],
      turn:0,
      tableBody:[]
    };
  },
	handlePlayerSubmit: function(value) {
		var info = {name:value.name, id: this.state.players.length};
		this.state.players.push(info);
		var temp = [];

		for(var i = 0; i<this.state.players.length; i++){

      temp.push(<th key={i}>{this.state.players[i].name}</th>);
		}
		this.setState({columns: <tr>{temp}</tr>});
		this.state.scoreHistory.push([301]);
    this.setState({tableBody:<Row data = {this.state.scoreHistory} strikeThrough="true"/>}) 
  },
  updateWhosTurn: function(){
    var temp = [];
    for(var i = 0; i<this.state.players.length; i++){
      var thID = "";
      if(this.state.turn === i){
        thID = "active";
      }
      temp.push(<th id={thID} key={i}>{this.state.players[i].name}</th>);
    
    }<span class="glyphicon glyphicon-asterisk"></span>
    this.setState({columns: <tr>{temp}</tr>});
  },
  checkWin: function(oldScore,newScore){
    if(oldScore-newScore<0 || oldScore-newScore === 1){
      return oldScore;
    }
    else if(oldScore-newScore === 0){
      return oldScore-newScore;
    }
    else{
      return oldScore-newScore;
    }
  },
  handleScoreSubmit: function(value) {
    var sh = this.state.scoreHistory;
    var tn  = this.state.turn;
    var oldScore = sh[tn][sh[tn].length-1];
    var newScore = this.checkWin(oldScore,value.score); 
  		if(this.state.players.length == tn+1){
  			sh[tn].push(newScore);
  			this.state.turn=0;
  		}
  		else{
  			sh[tn].push(newScore);
  		  this.state.turn+=1;
  		}
  		var strengur = [];
  		for(var i = 0; i<sh[0].length; i++){
  			var inner = [];
         var last = false;
  			for(var x = 0; x < sh.length; x++){
  				inner.push(sh[x][i]);
  			}
        if(sh[0].length-2 == i )
  			   last = true;

        strengur.push(<Row key = {i} data = {inner} turn={tn} last = {last} strikeThrough={i==sh[0].length-1}/>);
  		}
  		this.setState({tableBody:strengur})
      this.updateWhosTurn();
  },
	render(){

		return (
			<div>
			<PlayerInput onNameSubmit={this.handlePlayerSubmit} onScoreSubmit={this.handleScoreSubmit} onGameStart={this.updateWhosTurn}/>
			<table className="table">
				<thead>
					{this.state.columns}					
				</thead>
				<tbody>
					{this.state.tableBody}
				</tbody>
			</table>
			</div>
		);
	}

});

module.exports = ScoreBoard;
