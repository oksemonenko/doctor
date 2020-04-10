import React from 'react';
import Item from './Item';

function Stack(props) {
  const {title, items} = props;
  console.log('stack', props);

  return (
    <div className="stack">
      <h2 className="stack-title"><a href="#" data-text={title}><span>{title}</span></a></h2>
      {items && items.map(
        ({image, name, description}) => {

          return (
            <Item
              image={image}
              name={name}
              description={description}
            />
          );
        },
      )}
    </div>
  );
}

export default Stack;
