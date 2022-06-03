import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <img className="card__flag" src={props.flag} alt="flag" />
      <h3 className="card__title">{props.name}</h3>
      <h5 className="card__continet">
        Continent: <span>{props.continent}</span>
      </h5>
    </div>
  );
};

export default Card;
