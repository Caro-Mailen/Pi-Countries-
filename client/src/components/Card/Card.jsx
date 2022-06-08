import React from "react";
import { Link } from "react-router-dom";

import "./card.css";

const Card = (props) => {
  return (
    <Link key={props.id} to={"/countries/" + props.id}>
      <div className="card">
        <img className="card__flag" src={props.flag} alt="flag" />
        <div>
          <h3 className="card__title">{props.name}</h3>
          <p className="card__continet">
            Continent: <span>{props.continent}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
