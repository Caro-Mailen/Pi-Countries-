import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getById } from "../../redux/actions";

export default function Detail() {
  const { id: idParams } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const {
    area,
    name,
    id,
    flag,
    continent,
    capital,
    subregion,
    population,
    Activities,
  } = country;

  useEffect(() => {
    dispatch(getById(idParams));
  }, []);

  return (
    <>
      <header className="detail_header">
        <Link to="/countries">
          <button>Back Home</button>
        </Link>
      </header>
      <h1 className="detail__title">
        {name} ({id})
      </h1>
      <div className="container">
        <img className="flag" src={flag} alt="flag" />
        <div className="description">
          <p>Capital: {capital}</p>
          <p>Continent: {continent}</p>
          <p>Subregion: {subregion}</p>
          <p>Population: {population}</p>
          <p>Area: {area}</p>
        </div>
        <div>
          <p>Touristic Activities:</p>
          {Activities && !!Activities.length && (
            <>
              <div className="activity">
                {Activities.map((act) => (
                  <li key={act.id}>
                    <span>
                      <b>{act.name}</b>
                    </span>
                    <p>
                      Difficulty: <span>{act.difficulty}</span>
                    </p>
                    <p>
                      Duration: <span>{act.duration} hs </span>
                    </p>
                    <p>
                      Season: <span>{act.season}</span>
                    </p>
                  </li>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
