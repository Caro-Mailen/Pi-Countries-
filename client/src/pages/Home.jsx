import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderByName,
  getCountries,
  filterByContinent,
  orderByPopulation,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Paginate from "../components/Paginate";
import SearchBar from "../components/SearchBar";
// import Select from "./Select";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries); //trae en esa const todo lo q esta en el estado de countries

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
    dispatch(getCountries()); //lo mismo q hacer map dispatchs to props
  }, [dispatch]); //sacar despues

  const handleSort = (e) => {
    e.preventDefault();
    setCurrentPage(1); //setea el orden desdee la pagina 1
    setOrder(`Ordenado ${e.target.value}`); //lo seteo para q modifique en el renderizado ¿?
    console.log(order);
  };

  const handleSortByName = (e) => {
    handleSort(e);
    dispatch(orderByName(e.target.value));
  };
  const handleSortByPopulation = (e) => {
    handleSort(e);
    dispatch(orderByPopulation(e.target.value));
  };

  // function handleSort(e) {
  //   e.preventDefault();
  //   dispatch(orderByName(e.target.value));
  //   setCurrentPage(1); //setea el orden desdee la pagina 1
  //   setOrder(`Ordenado ${e.target.value}`); //lo seteo para q modifique en el renderizado ¿?
  //   console.log(order);
  // }

  // function handleSortP(e) {
  //   e.preventDefault();
  //   dispatch(orderByPopulation(e.target.value));
  //   setCurrentPage(1); //setea el orden desdee la pagina 1
  //   setOrder(`Ordenado ${e.target.value}`); //lo seteo para q modifique en el renderizado ¿?
  //   console.log(order);
  // }

  function handleFilterByContinent(e) {
    dispatch(filterByContinent(e.target.value));
  }
  return (
    <div className="container">
      <Link to="/activity"> Create Activity </Link>
      <h1>PI COUNTRIES</h1>
      <div>
        <select onChange={(e) => handleSortByName(e)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        {/* <Select
          onChange={handleSort}
          options={[
            { value: "asc", name: "A-Z" },
            { value: "desc", name: "Z-A" },
          ]}
        /> */}
        <select onChange={(e) => handleSortByPopulation(e)}>
          <option value="popAsc">Population Asc</option>
          <option value="popDesc">Population Desc</option>
        </select>
        <select onChange={(e) => handleFilterByContinent(e)}>
          <option value="All">All</option>
          <option value="Americas">Americas</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select>
          <option value="act">Activity</option>
        </select>
        <Paginate
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginate={paginate}
        />
        <SearchBar />
        <div className="cards">
          {currentCountries &&
            currentCountries.map((country) => {
              return (
                <Link key={country.id} to={"/home/" + country.id}>
                  <Card
                    key={country.id}
                    flag={country.flag}
                    name={country.name}
                    continent={country.continent}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Home;
