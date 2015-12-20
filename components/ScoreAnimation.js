var React = require('react');
var Spring = require('react-motion').Spring;
var Motion = require('react-motion').Motion;
var ReactDom = require('react-dom');
//var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ScoreAnimation = React.createClass({
 getInitialState: function() {
    return {
      flip:0
    };
  },
  shouldComponentUpdate: function(nextProps, nextState) {
  if(this.props.gameOn && (this.props.positionX != nextProps.positionX)||(this.props.positionY != nextProps.positionY))return true;
  else{return false};
  },
  render(){
    
  	var h1Style = {
    WebkitAnimationName: 'fade', /* Chrome, Safari, Opera */
    WebkitAnimationDuration: '2s', /* Chrome, Safari, Opera */
    animationName: 'fade',
    animationDuration: '2s',
  	position: 'absolute',
    left:this.props.positionX-200,
    top:this.props.positionY-150,
    margin: 'auto',
    fontWeight: 'bold',
    opacity: 0,
    zIndex: -1
	};
  var h1Style2 = {
    WebkitAnimationName: 'fade2', /* Chrome, Safari, Opera */
    WebkitAnimationDuration: '2s', /* Chrome, Safari, Opera */
    animationName: 'fade2',
    animationDuration: '2s',
    position: 'absolute',
    left:this.props.positionX-200,
    top:this.props.positionY-150,
    color:'red',
    margin:'auto',
    fontWeight: 'bold',
    opacity: 0,
    zIndex: -1
  };
this.state.flip = this.state.flip+1;
  if(this.state.flip%2 == 0 && this.props.gameOn){
  	return(
  		<h1 style={h1Style} >{this.props.score}</h1>    
      );
  }
  else if (this.state.flip%2 == 1 && this.props.gameOn) {
    return(<h1 style={h1Style2} >{this.props.score}</h1>);
  }
  else{
    return false;
  }
  }
  });
module.exports = ScoreAnimation;