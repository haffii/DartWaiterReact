var React = require('react');
var Finishes = require('./Finishes');

var PlayerModal = React.createClass({
 getInitialState: function() {
    return {
    	scoreLeft:301,
    	history: [],
    	round:[],
    	gameOn:false,
    	avgScore:undefined,
    	avgRoundScore:undefined,
    	noRounds:0,
    	undo:false,
    	dartString:""
    };
  },

 lastThree: function(listi){
 	var last = [];
  if(listi.length<=0)return last;

 	for(var i = listi.length-3; i<listi.length; i++){
 		last.push(listi[i]);
 	}
 	return last;
 },

 doUndo: function(){
  var undoValue = this.state.history[this.state.history.length-1];
  if(this.state.history.length<=0)return;
  this.state.history.pop();
  var newRounds = Math.floor(this.state.history.length/3)*3;
  var thisRound = [];
  for(var i = newRounds; i<this.state.history.length; i++){
  	thisRound.push(this.state.history[i]);
  }
  if(thisRound.length>0){
  	this.state.round = thisRound;
  }
  else{
  	 this.state.round = this.lastThree(this.state.history); 
  }
  //this.state.scoreLeft = this.state.scoreLeft+undoValue;
  this.setState({scoreLeft: this.state.scoreLeft+undoValue, undo: true, round: this.state.round});
 },

 doFocus: function(){
 	if(this.props.turn != this.props.playerID){
 		this.props.onChangeTurn({id:this.props.playerID});
 	}
 },
clearPlayer: function(){

},

shouldComponentUpdate: function(nextProps, nextState) {
  if(nextProps.gameOn !== this.props.gameOn && !nextProps.gameOn){
    this.setState({
      scoreLeft:301,
      history: [],
      round:[],
      gameOn:false,
      avgScore:undefined,
      avgRoundScore:undefined,
      noRounds:0,
      undo:false,
      dartString:""
    });
  }
return true;
},
  render(){
  	if(this.props.turn == this.props.playerID && this.props.gameOn && this.props.score != undefined){
  		if(!this.state.undo){
         this.state.history.push(this.props.score);
        this.state.round.push(this.props.score);
  			this.state.scoreLeft = this.state.scoreLeft-this.props.score;
  		  if(this.state.scoreLeft <= 1){
          if(this.state.scoreLeft == 0 && this.props.isDouble){
            this.props.gameOver({id : this.props.playerID});
          }
          else{
            this.state.scoreLeft = this.state.scoreLeft+this.props.score
          }
        }
      }	
  	}
     
      if(this.state.round.length == 3){
        this.state.round = [];
        this.props.onChangeTurn();
      }
      
      var avgScore = 0;
      for(var i in this.state.history){
        avgScore += this.state.history[i];
      }
    this.state.avgScore = parseFloat(avgScore/this.state.history.length).toFixed(2);
    var noRounds = Math.floor(this.state.history.length/3);
    this.state.noRounds = noRounds;
      if(noRounds>0){
        var avgRoundScore = 0;
        for(var i = 0; i<noRounds*3;i++){
          avgRoundScore+=this.state.history[i];
        }
        this.state.avgRoundScore = parseFloat(avgRoundScore/noRounds).toFixed(2);
      }
    if(noRounds*3<this.state.history.length){
      var current = [];
      for(var i = noRounds*3; i<this.state.history.length;i++){
        current.push(this.state.history[i]);
      }
      this.state.dartString = <p>This round : {current.join(", ")}</p>
    }
    else if(this.state.history.length>0){
      var lastRound = [];
      for(var i = this.state.history.length-3; i<this.state.history.length;i++){
        lastRound.push(this.state.history[i]);
      }
        
      
      this.state.dartString = <p>Last round : {lastRound.join(", ")}</p>
    }
  	if(this.props.turn == this.props.playerID && this.props.gameOn){
  		var ActiveOrNot = "snip1082 blue active";
  	}
  	else{
  		var ActiveOrNot = "snip1082 blue";
  	}
  	//if(this.state.history.length>0)var showAvg = <p>Avg dart score : {this.state.avgScore}</p>;
  	if(this.state.noRounds>0)var showRoundScore = <p>Avg round score : {this.state.avgRoundScore}</p>;
  	
  	if(this.props.name){

  	return(
  		<figure className={ActiveOrNot}>
  			<div id="notimg" >
  				<h2>{this.state.scoreLeft}</h2>
  				<p>Darts left : {3-this.state.round.length}</p>
  				{showRoundScore}
  				{this.state.dartString}
          <Finishes score ={this.state.scoreLeft} dartsLeft={3-this.state.round.length}/>
  			</div>
  			<h3> <span>{this.props.name}</span></h3>
  			<div id="hoverDiv"><a onClick={this.doUndo}><i className="ion-ios-arrow-back"></i></a><a onClick={this.doFocus}><i className="ion-arrow-expand"></i></a></div>		    
    </figure>
  	)}
  	else{
  		return false;
  	}
 }
});
module.exports = PlayerModal;