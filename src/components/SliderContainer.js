import React, { Component } from 'react';
import Stack from './Stack';
import Slider from '../components/Slider';

export default class SliderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stackIsOpened: false,
      needToSelectStackIndex: 0,
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
      needToSelectStackIndex: index,
    })
  };

  onClick = (ev, index) => {
    ev.preventDefault();
    const { stackIsOpened } = this.state;
    const isSelected = ev.currentTarget.parentNode.classList.contains('is-selected');

    if (!isSelected) {
      return this.selectStack(index);
    }
    if (stackIsOpened) {
      return this.closeStack();
    }
    this.openStack();
  };

  render() {
    const { stacks } = this.props;
    const { stackIsOpened, needToSelectStackIndex } = this.state;

    return (
      <div className="stack-slider">
        <Slider
          stackIsOpened={stackIsOpened}
          needToSelectStackIndex={needToSelectStackIndex}
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
