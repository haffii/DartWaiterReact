var React = require('react');
var tripleOut = require('./tripleOut.json');
var doubleOut = require('./doubleOut.json');
var Finishes = React.createClass({
  getInitialState: function() {
    return {
      body:[]
    };
  },
render(){
  var hit = false;
	if(this.props.dartsLeft===3){
    for(var i in tripleOut){
      if(tripleOut[i].score == this.props.score){
        this.state.body = <p>Checkout : {tripleOut[i].Checkout}</p>;
        hit = true;
      }
    }
  }
  else if(this.props.dartsLeft===2){
    for(var i in doubleOut){
      if(doubleOut[i].score == this.props.score){
        console.log("here : ",this.props.score,doubleOut[i].score);
         this.state.body = <p>Checkout : {doubleOut[i].checkout}</p>;
         hit = true;
      }
    }
  }
  if(!hit){
    return false;
  }
  else{
	 return (
	 	<div>
			{this.state.body}
		</div>
		);
  }
}
});
module.exports = Finishes;