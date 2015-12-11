var React = require('react');
var tripleOut = require('./tripleOut.json');
var doubleOut = require('./doubleOut.json');
var singleOut = require('./singleOut.json');
var Finishes = React.createClass({
  getInitialState: function() {
    return {
      body:[]
    };
  },
render(){
  var hit = false;
  if(this.props.dartsLeft>=1){
    for(var i in singleOut){
      if(singleOut[i].score == this.props.score){
         this.state.body = <p>Checkout : {singleOut[i].checkout}</p>;
         hit = true;
         break;
      }
    }
  }
  if(!hit && this.props.dartsLeft>=2){
    for(var i in doubleOut){
      if(doubleOut[i].score == this.props.score){
         this.state.body = <p>Checkout : {doubleOut[i].checkout}</p>;
         hit = true;
          break;
      }
    }
  }
	if(!hit && this.props.dartsLeft==3){
    for(var i in tripleOut){
      if(tripleOut[i].score == this.props.score){
        this.state.body = <p>Checkout : {tripleOut[i].checkout}</p>;
        hit = true;
        break;
      }
    }
  }
  
  if(!hit){
    return false;
  }
  else{
	 return (
	 	<div id="finish">
			{this.state.body}
		</div>
		);
  }
}
});
module.exports = Finishes;