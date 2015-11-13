var React = require('react');
var RoundScore = React.createClass({
render(){
	 if(!this.props.gameOn){
	 	return false;
	 }
	 else{
	 return (
	 	<p>	
	 		{this.props.roundScore}	
	 	</p>
		);
	}
}
});
module.exports = RoundScore;