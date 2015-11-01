var React = require('react');

var Row = React.createClass({

	render(){
		var stuff = this.props.data;
		var strike = this.props.strikeThrough;
		var turn = this.props.turn;
		var last = this.props.last;
		var cols = [];
		for(var i = 0; i<stuff.length; i++){
			if(!strike){
				if(last && i>turn)
					cols.push(<td>{stuff[i]}</td>);

				else{
					cols.push(<td><s>{stuff[i]}</s></td>);
				}
			}
			else{
				cols.push(<td>{stuff[i]}</td>);
			}
		}
		return (
			<tr>
				{cols}
			</tr>
		);
	}

});
module.exports = Row;