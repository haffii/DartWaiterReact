var React = require('react');

var ScoreBoard = React.createClass({
getInitialState: function() {
    return {
      names:[],
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
    for(var i = 0; i<playerArr.length;i++){
       inner.push(<th>{playerArr[i]}</th>)
      }
      this.state.names = <tr>{inner}</tr>
    if(this.props.gameOn){
      inner = [];
      console.log(scoreArr.length);
      for(var i = 0; i<scoreArr[0].length;i++){
        for(var x = 0; x<scoreArr.length;x++){
          inner.push(<td>{scoreArr[x][i]}</td>);
        }
        this.state.rows.push(<tr>{inner}</tr>);
        inner = [];
      }
      
    }
    this.state.rows=this.state.rows;

		return (
			<table className="table">
      <thead>
       {this.state.names}
      </thead>
      <tbody>
        {this.state.rows}
      </tbody>
      </table>
			)

	}
});
module.exports = ScoreBoard;