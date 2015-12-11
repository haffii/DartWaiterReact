 var React = require('react');
 var Modal = require('react-bootstrap').Modal;
 var WinModal = React.createClass({
  getInitialState: function() {
    return { 
    	showModal: false,
    	close:false
     };
  },

  close: function() {
    this.setState({ showModal: false,close:true });
    	this.props.newGame({id:this.props.playerID});
  },
render(){
	if(!this.state.close){
		this.state.showModal = this.props.show;
	}
	return(
 	<Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
          	<h1>{this.props.name} wins!</h1>           
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.close}>Close</button>
          </Modal.Footer>
	</Modal>
	)}
});
 module.exports = WinModal;