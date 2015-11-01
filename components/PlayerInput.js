var React = require('react');
var PlayerInput = React.createClass({

  getInitialState: function() {
    return {
      value: null,
      score:"",
      gameOn: false,
      notEmpty:false		
    };
  },
  
		
  handleChange: function(event) {
    this.setState({value: event.target.value});

  },
  handleScoreChange: function(event) {
    this.setState({score: event.target.value});
    
  },
  handleSubmit: function(event){
  	event.preventDefault();
  	if(this.state.value.trim() !==""){
  		this.props.onNameSubmit({name: this.state.value.trim()});
  		this.setState({value: ""});
  		this.state.notEmpty = true;
  	}
  	this.getDOMNode()[0].focus();
  	return;
  },
  handleScoreSubmit: function(event){
  	event.preventDefault();
  	var scoreNow = this.state.score;
  	if(scoreNow !=="" && scoreNow!==undefined && scoreNow >=0 && scoreNow < 181){
  		this.props.onScoreSubmit({score: this.state.score});
  		this.setState({score: ""});
  	}
  	this.getDOMNode()[0].focus();
  	return;
  },
  gameStartSubmit: function(event){
	if(this.state.notEmpty){
		this.props.onGameStart();
		this.setState({gameOn: true});
		this.setState({focus:true});
	}
	this.getDOMNode()[0].focus();
},

	render(){
		if(this.state.gameOn){

			return (
			<form  onSubmit={this.handleScoreSubmit}>
				<div className="input-group">
				<input className="form-control" type="number" value={this.state.score} placeholder = "Score" onChange={this.handleScoreChange} />
				<span className="input-group-btn">
				<button type="submit" className="btn btn-primary" > <span className="glyphicon glyphicon-plus"></span> Add score</button> 
				</span>
  			</div>	
			</form>	);
		}
		else{
			return (
			<form  onSubmit={this.handleSubmit}>
				<div className="input-group">
				<input autoFocus className="form-control" type="text" value={this.state.value} placeholder = "Name" onChange={this.handleChange} />
				<span className="input-group-btn">
                     <button type="submit" className="btn btn-primary" ><span className="glyphicon glyphicon-plus"></span> Add player</button> 
                     <button type="button" className="btn btn-success" onClick={this.gameStartSubmit}><span className="glyphicon glyphicon-play"></span> Start game</button>
                 </span>
  			</div>	
			</form>	
			);
		}
	}

});

module.exports = PlayerInput;
