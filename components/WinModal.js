 var React = require('react');
 var Modal = require('react-bootstrap').Modal;
 var Button = require('react-bootstrap').button;
 var WinModal = React.createClass({
  getInitialState: function() {
    return { 
    	showModal: false,
    	close:false
     };
  },

  close: function(event) {
    this.setState({ showModal: false,close:false });
    	this.props.newGame({name:event.target.id});
  },
render(){
  var style = {
    position: 'absolute',
    left:this.props.positionX-200,
    top:this.props.positionY-150,
  };
	if(!this.state.close){
		this.state.showModal = this.props.show;
	}
	return(
 	<Modal style={style} id = "modal" show={this.state.showModal} onHide={this.close}>
          <div>

          	<h1>{this.props.name} wins!</h1>
            <h3>with avg score of {this.props.avgRoundScore}</h3>         
          </div>
          <Modal.Footer>
            <div id="footerButtonMenu">
              <button id="newgame" className="btn btn-success" onClick={this.close}>New Game</button>
              <button id="rematch" className="btn btn-primary" onClick={this.close}>Rematch</button>
            </div>
          </Modal.Footer>
	</Modal>
	)}
});
 module.exports = WinModal;