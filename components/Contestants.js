var React = require('react');

var Contestants = React.createClass({
	getInitialState: function() {
    return {
    	players:[]
    };
  },
componentWillReceiveProps: function(data){
		var contestants = this.props.players;
		var temp = [];
		for(var i = 0; i<contestants.length;i++){
			temp.push(<th><span id={i} onClick = {this.handleClick} className="glyphicon glyphicon-remove"></span>{contestants[i]}</th>);
		}
		this.setState({players:<tr>{temp}</tr>});
},
handleClick: function(event){
	this.props.onPlayerChange({pos:event.target.id});
},
 	render(){
 		//{this.state.players}
 		if(this.props.gameOn){
 			return false;
 		}
		return (
			<table className = "table">
			<thead>
				{this.state.players}
			</thead>
			</table>
			)

	}
});
module.exports = Contestants;