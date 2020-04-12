import React, { Component } from 'react';
import Stack from './Stack';
import Slider from '../components/Slider';

export default class SliderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stackIsOpened: false,
      activeIndex: 0,
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

  selectStack = (index) => {
    this.setState({
      activeIndex: index,
    })
  };

  onClick = (ev, index) => {
    ev.preventDefault();
    const { stackIsOpened, activeIndex } = this.state;

    if (index !== activeIndex) {
      return this.selectStack(index);
    }
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
    const { stacks } = this.props;
    const { stackIsOpened, activeIndex } = this.state;
    console.log('stacks', stacks);
    return (
      <div className="stack-slider">
        <Slider
          stackIsOpened={stackIsOpened}
          activeIndex={activeIndex}
          getStackNode={this.getRef}
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
                  onClick={(event) => this.onClick(event, index)}
                />
              );
            },
          )}
        </Slider>
      </div>
    );
  }
}
