var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


var MyModal = React.createClass({
  closeModal: function() {
    //this.props.modalIsOpen: false;
  },

  render: function() {
    return (
         <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <button>New game</button>
            <button>Restart</button>
          </form>
        </Modal>
    );
  }
});

module.exports = MyModal;