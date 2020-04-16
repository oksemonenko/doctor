import React from 'react';

function Item(props) {
  const {image, name, description} = props;
  return (
    <div className="item">
      <div className="item__content">
        <img src={image} alt="img01"/>
        <div className="item__details">
          <ul>
            <li><span>{name}</span></li>
            <li><span>{description}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Item;
