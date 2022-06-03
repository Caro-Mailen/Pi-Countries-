import axios from "axios";

const GET_COUNTRIES = "GET_COUNTRIES";
const GET_BY_NAME = "GET_BY_NAME";

const FILTER_CONTINENT = "FILTER_CONTINENT";
// const FILTER_ACTIVITY = "FILTER_ACTIVITY";
const ORDER_BY_NAME = "ORDER_BY_NAME";
const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";

export function getCountries() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/countries");
    // console.log("DATA: " + json.data);
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        "http://localhost:3001/countries?name=" + name
      );
      // console.log("DATA " + json.data);
      return dispatch({
        type: GET_BY_NAME,
        payload: json.data, //es necesario un catch??
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postActivity(payload) {
  return async function () {
    const json = await axios.post("http://localhost:3001/activity", payload);
    console.log(json);
    return json;
  };
}

// [ ] Botones/Opciones para filtrar por continente

export function filterByContinent(payload) {
  console.log(payload);
  return {
    type: FILTER_CONTINENT,
    payload,
  };
}

// [ ] Botones/Opciones para filtrar por tipo de actividad turística

// export function filterActivity(payload) {
//   return {
//     type: FILTER_ACTIVITY,
//     payload,
//   };
// }

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}
