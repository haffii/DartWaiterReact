var React = require('react');

var Players = React.createClass({
 getInitialState: function() {
    return {
      players:[],
      name: "",
      gameOn: false
    };
  },
 handleChange: function(event) {
    this.setState({name: event.target.value});
  },
  handleSubmit: function(event) {
  event.preventDefault();

  if(this.state.name.trim() !=="" && this.state.players.length<2){
  	this.state.players.push(this.state.name);
  	this.props.onNameSubmit({name: this.state.name});
   }
   this.setState({name:""});
  },

  gameStartSubmit: function(){
  	if(this.state.players.length){
  		this.setState({gameOn:true});
  		this.props.gameOn({value:true})
  	}
  },
  shouldComponentUpdate: function(nextProps, nextState) {
  if(nextProps.showInput !== this.props.showInput && !nextProps.showInput){
    this.setState({
     players:[],
      name: "",
      gameOn: false
    });
  }
return true;
},
render(){
  if(!this.props.showInput){
	 return (
	 	<div>
    <form  onSubmit={this.handleSubmit}>
			<div className="input-group">
				<input autoFocus className="form-control" type="text" value={this.state.name} placeholder = "Name" onChange={this.handleChange} />
				<span className="input-group-btn">
          <button type="submit" className="btn btn-primary" ><span className="glyphicon glyphicon-plus"></span></button> 
          <button type="button" className="btn btn-success" onClick={this.gameStartSubmit}><span className="glyphicon glyphicon-play"></span></button>
        </span>
  		</div>	
		</form>	
		</div>
			);
  }
  else{
    return false;}
}
});
module.exports = Players;