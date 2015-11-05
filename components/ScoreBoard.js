var React = require('react');

var ScoreBoard = React.createClass({
getInitialState: function() {
    return {
      rows:[],
    };
  },
	render(){
    var playerArr = this.props.players;
    var inner = [];
    var scoreArr = this.props.score;
    var turn = this.props.turn;
    var roundScore = this.props.roundScore;
    this.state.rows = [];

    if(!this.props.gameOn){
      for(var i = 0; i<playerArr.length;i++){
        this.state.rows.push(<tr><th>{playerArr[i]}</th></tr>);
        }
    }
    else{
    for(var i = 0; i<playerArr.length;i++){
      inner.push(<th>{playerArr[i]} :</th>);
      for(var x = 0; x<scoreArr[i].length;x++){
        if(x ==scoreArr[i].length-1){
          inner.push(<td>{scoreArr[i][x]}</td>)
        }
        else{
          inner.push(<td><s>{scoreArr[i][x]}</s></td>)
        }
          
      }
      this.state.rows.push(<tr>{inner}</tr>);
      inner = [];
    }
  }
    this.state.rows=this.state.rows;

		return (
			<table className="table">{this.state.rows}</table>
			)

	}
});
module.exports = ScoreBoard;