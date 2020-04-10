import React from 'react';
import Stack from './Stack';

function Slider(props) {
  const {stacks} = props;
  console.log('stacks', stacks);
  return (
    <div className="stack-slider">
      <div className="stacks-wrapper">
        {stacks.map(
          ({title, items}) => {
            console.log('stacks', title, items);
            return (
              <Stack
                title={title}
                items={items}
              />
            );
          },
        )}
      </div>
    </div>
  );
}

export default Slider;
