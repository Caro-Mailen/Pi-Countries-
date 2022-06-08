import React, { useState } from "react";
import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderByName,
  getCountries,
  filterByContinent,
  orderByPopulation,
  // eslint-disable-next-line
  getActivities,
  filterByActivity,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import Paginate from "../../components/Pagination/Paginate";
import SearchBar from "../../components/SearchBar/SearchBar";
const INITIAL_DEFAULT = {
  name: "name",
  population: "population",
  continent: "continent",
};

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activity);
  const [defaultValue, setDefaultValue] = useState(INITIAL_DEFAULT);
  // eslint-disable-next-line
  const [order, setOrder] = useState(""); //estado local q arranca vacio
  const [currentPage, setCurrentPage] = useState(1); //pagina actual y un set
  const [countriesPerPage] = useState(10); //seteo cuantos paises quiero por pagina
  const indexOfLastCountry = currentPage * countriesPerPage; //indice del ultimo pais (10)
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //indice del primer pais (0)
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getActivities());
    // eslint-disable-next-line
  }, []);

  const handleSort = (e) => {
    e.preventDefault();
    setCurrentPage(1); //setea el orden desdee la pagina 1
    setOrder(`Ordenado ${e.target.value}`); //lo seteo para q modifique en el renderizado ¿?
    // console.log(order);
  };

  const handleSortByName = (e) => {
    handleSort(e);
    dispatch(orderByName(e.target.value));
  };
  const handleSortByPopulation = (e) => {
    handleSort(e);
    dispatch(orderByPopulation(e.target.value));
  };

  function handleFilterByContinent(e) {
    dispatch(filterByContinent(e.target.value));
  }
  const handleFilterByActivities = (e) => {
    dispatch(filterByActivity(e.target.value));
  };

  function handleClick() {
    dispatch(getCountries());
    setDefaultValue(INITIAL_DEFAULT);
  }

  return (
    <>
      <header>
        <button className="button__back">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </Link>
        </button>
        <h1>AROUND THE WORLD</h1>
        <button className="button1">
          <Link to="/activity">Create Activity</Link>
        </button>
      </header>

      <div className="container__home">
        <div className="filters">
          <div>
            <select
              value={defaultValue.name}
              onChange={(e) => handleSortByName(e)}
            >
              <option value="name">Name</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>

            <select onChange={(e) => handleSortByPopulation(e)}>
              <option value="pop"> Population </option>
              <option value="popAsc"> Population Asc </option>
              <option value="popDesc"> Population Desc </option>
            </select>
            <select onChange={(e) => handleFilterByContinent(e)}>
              <option value="All">Continent</option>
              <option value="Americas">Americas</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

            <select onChange={(e) => handleFilterByActivities(e)}>
              <option></option>
              {allActivities.length &&
                allActivities.map((activity) => (
                  <option value={activity}>{activity}</option>
                ))}
            </select>

            <button
              className="reset_button"
              type="reset"
              onClick={() => handleClick()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
          <SearchBar />
        </div>

        <Paginate
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginate={paginate}
        />

        <div className="cards">
          {currentCountries &&
            currentCountries.map((country) => {
              return (
                <Card
                  key={country.id}
                  flag={country.flag}
                  name={country.name}
                  continent={country.continent}
                  id={country.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Home;
