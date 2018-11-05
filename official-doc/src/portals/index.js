import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // modalRoot是别的dom，不是modal自己的
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    // props.children 插入到 el中,el属于modalRoot
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );


    /*  return (
       <div style={{display: this.props.show? '' : 'none'}}>
         {this.props.children}
       </div>
     ); */
  }
}

export default class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, clicks: 0 };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  // 虽然是portal（不是portal的子元素），但是点击事件也可以捕获到
  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <p>Number of clicks: {this.state.clicks}</p>
          <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    /* const modal = (
      <Modal show={this.state.showModal}>
        <div className="modal">
          <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) ;  */

    return (
      <div className="app" onClick={this.handleClick}>
        This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

