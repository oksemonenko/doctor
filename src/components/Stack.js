import React from 'react';
import Item from './Item';
import Footer from "./Footer";

function Stack(props) {
  const { title, items, onClick } = props;

  return (
    <div className="stack">
      <h2 className="stack-title" onClick={onClick}>
        <a href="#" data-text={title}><span>{title}</span></a>
      </h2>
      {items && items.map(
        ({image, name, description, index}) => {

          return (
            <Item
              key={index}
              image={image}
              name={name}
              description={description}
            />
          );
        },
      )}
      <Footer />
    </div>
  );
}

export default Stack;
