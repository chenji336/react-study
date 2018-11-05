import React from 'react';
import img from './add.svg';

class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src={img} width='20px' height='20px' style={{ position: 'absolute', left: mouse.x, top: mouse.y }}></img>
        );
    }
}

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        }
    }

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100px',background:'red' }} onMouseMove={this.handleMouseMove}>
                {/* render只是一个属性，你换成children也是ok的 */}
                {/* 这里如果换成hoc也是可以的，传递一个Component */}
              {this.props.render(this.state)}
            </div>
          );
    }
}

export default class MouseTracker extends React.Component {
    render() {
        return (
            <div>
                <h1>Move the mouse around</h1>
                <Mouse render={mouse => (
                    <Cat mouse={mouse}></Cat>
                )} />
            </div>
        );
    }
}