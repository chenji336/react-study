import React, { Component } from 'react'

export default class createRef extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  focusTextInput = () => {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input 
          type="text"
          ref={this.textInput}/>
        <input 
          type="button"
          value='focus on the text input'
          onClick={this.focusTextInput}/>
      </div>
    )
  }
}
