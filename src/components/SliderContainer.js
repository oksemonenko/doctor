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

  onClick = (ev, index) => {
    ev.preventDefault();
    const { stackIsOpened } = this.state;
    const stackNode = ev.currentTarget.parentNode;
    const isSelected = stackNode.classList.contains('is-selected');
    if (!isSelected) {
      return this.props.onChange(index, true);
    }
    if (stackIsOpened) {
      return this.closeStack();
    }
    this.openStack();
  };

  render() {
    const { stacks, onChange, selectedIndex, count } = this.props;
    const { stackIsOpened } = this.state;

    return (
      <div className="stack-slider">
        <Slider
          stackIsOpened={stackIsOpened}
          selectedIndex={selectedIndex}
          count={count}
          onChange={onChange}
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
