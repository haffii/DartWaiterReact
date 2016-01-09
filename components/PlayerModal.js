var React = require('react');
var Finishes = require('./Finishes');

var PlayerModal = React.createClass({
 getInitialState: function() {
    return {
    	scoreLeft:this.props.game,
    	history: [],
    	gameOn:false,
    	avgRoundScore:undefined,
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
  this.state.history.pop();
  this.setState({history:this.state.history, undo: true});
 },

 doFocus: function(){
 	if(this.props.turn != this.props.playerID){
 		this.props.onChangeTurn({id:this.props.playerID});
 	}
 },

shouldComponentUpdate: function(nextProps, nextState) {
  if(nextProps.gameOn !== this.props.gameOn && !nextProps.gameOn){
    this.setState({
      scoreLeft:this.props.game,
      history: [],
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
        var remaining = this.state.scoreLeft-this.props.score;
  		  if(remaining<= 1){
          if(remaining == 0 && this.props.isDouble){
            this.state.history.push(this.props.score);
            this.props.gameOver({id : this.props.playerID, avgRoundScore : this.state.avgRoundScore});
          }
          else{ 
            for(var i = 0; i<3;i++){
                if(this.state.history.length%3==0){
                  break;
                }
                else{
                  this.state.history.pop();
                }
            }
            for(var i = 0;i<3;i++){
              this.state.history.push(0);
            }
             this.props.onChangeTurn();
           }
          }
          else{       
            this.state.history.push(this.props.score);
            if(this.state.history.length%3==0){
              this.props.onChangeTurn();
            }
        }
      }	
  	}
    this.state.undo = false;
    var left = this.props.game;
    for(var i = 0; i<this.state.history.length;i++){
      left = left-this.state.history[i];
    }
    this.state.scoreLeft = left;


    var noRounds = Math.floor(this.state.history.length/3);
    this.state.noRounds = noRounds;
      if(noRounds>0){
        var avgRoundScore = 0;
        for(var i = 0; i<noRounds*3;i++){
          avgRoundScore+=this.state.history[i];
        }
        this.state.avgRoundScore = parseFloat(avgRoundScore/noRounds).toFixed(2);
      }
//avg round score------------------------------------------------
    if(noRounds*3<this.state.history.length){
      var current = [];
      for(var i = noRounds*3; i<this.state.history.length;i++){
        current.push(this.state.history[i]);
      }
      this.state.dartString = <p>This round : {current.join(", ")}</p>;
    }
    else if(this.state.history.length>0){
      var lastRound = [];
      for(var i = this.state.history.length-3; i<this.state.history.length;i++){
        lastRound.push(this.state.history[i]);
      } 
      this.state.dartString = <p>Last round : {lastRound.join(", ")}</p>
    }
    else{
      this.state.dartString ="";
    }
//------------------------------------------------------------------

  	if(this.props.turn == this.props.playerID && this.props.gameOn){
  		var ActiveOrNot = "snip1082 blue active";
  	}
  	else{
  		var ActiveOrNot = "snip1082 blue";
  	}
  	if(this.state.noRounds>0)var showRoundScore = <p>Avg score : {this.state.avgRoundScore}</p>;
  	var dartsLeft = 3-this.state.history.length%3;
  	if(this.props.name && this.props.gameOn){
  	return(
  		<figure className={ActiveOrNot}>
  			<div id="notimg" >
  				<h2>{this.state.scoreLeft}</h2>
  				<p>Darts left : {dartsLeft}</p>
  				{showRoundScore}
  				{this.state.dartString}
          <Finishes score ={this.state.scoreLeft} dartsLeft={dartsLeft}/>
  			</div>
  			<h3> <span>{this.props.name}</span></h3>
  			<div id="hoverDiv"><a onClick={this.doUndo}><i className="ion-ios-arrow-back"></i></a><a onClick={this.doFocus}><i className="ion-qr-scanner"></i></a></div>		    
    </figure>
  	)}
  	else{
  		return false;
  	}
 }
});
module.exports = PlayerModal;