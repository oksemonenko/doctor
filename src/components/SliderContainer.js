import React, { Component } from 'react';
import Stack from './Stack';
import Slider from '../components/Slider';

export default class SliderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stackIsOpened: false,
    };
  }

  openStack = () => {
    this.setState({
      stackIsOpened: true,
    })
  };

  closeStack = () => {
    this.setState({
      stackIsOpened: false,
    })
  };

  onClick = (ev) => {
    ev.preventDefault();
    const { stackIsOpened } = this.state;
    console.log('stackIsOpened', stackIsOpened);

    if (stackIsOpened) {
      return this.closeStack();
    }
    this.openStack();
  };

  storeRef = (ref) => {
    this.node = ref;
  };

  getRef = () => {
    return this.node;
  };

  render() {
    const {stacks} = this.props;
    console.log('stacks', stacks);
    return (
      <div className="stack-slider">
        <Slider
          stackIsOpened={this.state.stackIsOpened}
          stackNode={this.getRef}
          options={{
            wrapAround: true,
            imagesLoaded: true,
            initialIndex: 0,
            setGallerySize: false,
            pageDots: false,
            prevNextButtons: false
          }}
        >
          {stacks.map(
            ({title, items, index}) => {
              console.log('stacks', title, items);
              return (
                <Stack
                  storeRef={this.storeRef}
                  key={index}
                  title={title}
                  items={items}
                  onClick={this.onClick}
                />
              );
            },
          )}
        </Slider>
      </div>
    );
  }
}
