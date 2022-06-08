import axios from "axios";

const GET_COUNTRIES = "GET_COUNTRIES";
const GET_BY_NAME = "GET_BY_NAME";
const GET_BY_ID = "GET_BY_ID";
const FILTER_ACTIVITIY = "FILTER_ACTIVITIY";
const FILTER_CONTINENT = "FILTER_CONTINENT";
const GET_ACTIVITIES = "GET_ACTIVITIES";
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
      // console.log(error);
    }
  };
}

export function postActivity(payload) {
  return async function () {
    console.log({ payload });
    axios.post("http://localhost:3001/activity", payload);
  };
}

export function getById(id) {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/countries/" + id);
    dispatch({ type: GET_BY_ID, payload: json.data });
  };
}

export function filterByContinent(payload) {
  // console.log(payload);
  return {
    type: FILTER_CONTINENT,
    payload,
  };
}

export function getActivities(payload) {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/activity");
    dispatch({ type: GET_ACTIVITIES, payload: json.data });
  };
}

export function filterByActivity(payload) {
  return { type: FILTER_ACTIVITIY, payload };
}

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
