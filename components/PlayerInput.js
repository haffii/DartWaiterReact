var React = require('react');
var PlayerInput = React.createClass({
 getInitialState: function() {
    return {
      players:[],
      name: "",
      gameOn: false,
      game:301,
      class301:"current",
      class501:""
    };
  },
 handleChange: function(event) {
    this.setState({name: event.target.value});
  },
  handleSubmit: function(event) {
  event.preventDefault();

  if(this.state.name.trim() !==""){
  	this.state.players.push(this.state.name);
  	this.props.onNameSubmit({name: this.state.name});
   }
   this.setState({name:""});
  },
  handleGameChange: function(event){
    if(event.currentTarget.id==501){
      this.setState({
        class301:"",
        class501:"current",
        game:501
      })
    }
    else if(event.currentTarget.id==301){
      this.setState({
        class301:"current",
        class501:"",
        game:301
      })
    }
    //this.state.501Class
  },
  gameStartSubmit: function(){
  	if(this.state.players.length || this.props.players.length){
  		this.setState({gameOn:true});
  		this.props.gameOn({value:true,game:this.state.game});
  	}
  },
  shouldComponentUpdate: function(nextProps, nextState) {
  if(nextProps.showInput !== this.props.showInput && !nextProps.showInput){
    this.setState({
     players:this.props.players,
      name: "",
      gameOn: false
    });
  }
  return true;
},
render(){
  var items = [];
  for(var i = 0; i<this.state.players.length;i++){
    items.push(<li key={i}>{this.state.players[i]}</li>);
  }
   var divStyle = {overflow: "hidden", paddingRight: ".5em"}
   var inputStyle = {width:'100%'}
   var buttonStyle = {float:'left'}
   
  if(!this.props.showInput){
	 return (
    <div>
      <h1>Dart Waiter</h1>
<div className="snip1265">
  <div className="plan featured">
    <header>
<ul id="gamePicker" className="snip1275">
  <li onClick={this.handleGameChange} id="301" className={this.state.class301}><a>301</a></li>
  <li onClick={this.handleGameChange} id="501" className={this.state.class501}><a>501</a></li>
</ul>  
    <form  onSubmit={this.handleSubmit}>    
        <div style = {divStyle}>
        <input autoFocus style={inputStyle} id="playerInputField" className="form-control" type="text" value={this.state.name} placeholder = "Name" onChange={this.handleChange} />     
        </div>
    </form> 
   </header>
    <ul className="plan-features">
      {items}
    </ul>
    <div className="plan-select" ><a onClick={this.gameStartSubmit}>Start</a></div>
  </div>
</div>
</div>
			);
  }
  else{
    return false;}
}
});
module.exports = PlayerInput;