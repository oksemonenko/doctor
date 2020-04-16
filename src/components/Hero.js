import React, { Component } from 'react';
import { throttle } from 'lodash';

export default class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {
        WebkitTransform: null,
        transform: null,
      }
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = throttle ((ev) => {
    const win = { width: window.innerWidth, height: window.innerHeight };

    const xVal = -1/(win.height/2)*ev.clientY + 1;
    const yVal = 1/(win.width/2)*ev.clientX - 1;
    const transX = 20/(win.width)*ev.clientX - 10;
    const transY = 20/(win.height)*ev.clientY - 10;
    const transZ = 100/(win.height)*ev.clientY - 50;
    const transform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';

    this.setState({ style: {
      WebkitTransform: transform,
      transform,
    }})
  }, 100);

  render() {
    const { style } = this.state;
    return (
      <div className="hero">
        <div className="hero__back hero__back--static"></div>
        <div className="hero__back hero__back--mover" style={style}></div>
        <div className="hero__front"></div>
      </div>
    );
  }
}
