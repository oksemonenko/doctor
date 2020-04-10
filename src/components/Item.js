import React from 'react';

function Item(props) {
  const {image, name, description} = props;
  return (
    <div className="item">
      <div className="item__content">
        <img src={image} alt="img01"/>
        <h3 className="item__title">{name}<span className="item__date">05/05/2015</span>
        </h3>
        <div className="item__details">
          <ul>
            <li><i className="icon icon-camera"></i><span>{description}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Item;
