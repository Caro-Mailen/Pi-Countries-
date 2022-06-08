import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries, postActivity } from "../../redux/actions";
import { Link } from "react-router-dom";
import { sortBy } from "../../utils";
import "./activity.css";

const INITIAL_STATE = {
  name: "",
  difficulty: "",
  duration: "",
  season: "",
  nameCountry: [],
};

export default function ActivityCreate() {
  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState(INITIAL_STATE);
  const activities = useSelector((state) => state.activity);
  const [error, setError] = useState(false);

  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]); //sacar el dispatch

  function handleOnChange(e) {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value,
    });
  }

  function handleCountrySelect(e) {
    const country = countries.filter(
      (country) => country.id === e.target.value
    );
    setDataInput({
      ...dataInput,
      nameCountry: [
        ...dataInput.nameCountry,
        {
          id: country[0].id,
          name: country[0].name,
        },
      ],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const hasActivity = activities.some((act) => act === dataInput.name);
    if (hasActivity) return setError(true);
    setError(false);
    dispatch(postActivity(dataInput));
    setDataInput(INITIAL_STATE);
  }

  function handleDelete(name) {
    setDataInput({
      ...dataInput,
      nameCountry: dataInput.nameCountry.filter(
        (country) => country.name !== name
      ),
    });
  }

  return (
    <div className="form">
      <header className="create_header">
        <button className="form__back">
          <Link to="/countries">Home</Link>
        </button>

        <h1>¡create a tourist activity!</h1>
      </header>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input_form">
          <label> Activity: </label>
          <input
            type="text"
            name="name"
            value={dataInput.name}
            placeholder="name"
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div className="input_form">
          <label>Difficulty: </label>
          <select
            name="difficulty"
            value={dataInput.difficulty}
            onChange={(e) => handleOnChange(e)}
            required
          >
            <option value={""}></option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="input_form">
          <label>Duration: </label>
          <input
            name="duration"
            value={dataInput.duration}
            type="number"
            min="1"
            max="24"
            placeholder="hours"
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>

        <div className="input_form">
          <label>Season: </label>
          <select
            name="season"
            value={dataInput.season}
            onChange={(e) => handleOnChange(e)}
            required
          >
            <option value=""></option>
            <option value="winter">winter</option>
            <option value="autumn">autumn</option>
            <option value="spring">spring</option>
            <option value="summer">summer</option>
          </select>
        </div>

        <div className="input_form">
          <label>Select Country: </label>
          <select
            name="nameCountry"
            value={dataInput.id}
            onChange={(e) => handleCountrySelect(e)}
            required
          >
            <option value={""}></option>
            {countries &&
              sortBy(countries, "name", "asc").map((country) => (
                <option key={country.id} value={country.id}>
                  {country.id && country.name}
                </option>
              ))}
          </select>
        </div>
        {error && <span>ya existe</span>}
        <div className="button_div">
          <button className="button_create" type="submit">
            Create
          </button>
        </div>
      </form>
      <div className="country_list">
        {dataInput.nameCountry.map((nameCountry) => (
          <p>
            {nameCountry.name}
            <button
              className="botonX"
              onClick={() => handleDelete(nameCountry.name)}
            >
              x
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}
