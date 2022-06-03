import { sortBy } from "./utils";

const initialState = {
  countries: [],
  allCountries: [], //copia del estado q siempre va a tener todo, soporte
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case "GET_BY_NAME":
      return {
        ...state,
        countries: action.payload,
      };
    case "POST_ACTIVITY":
      return {
        ...state,
      };
    case "FILTER_CONTINENT":
      const allCountries = state.allCountries;
      const filtered =
        action.payload === "All"
          ? allCountries
          : allCountries.filter(
              (country) => country.continent === action.payload
            );
      return {
        ...state,
        countries: filtered,
      };
    // case 'FILTER_ACTIVITY':
    //   const activity = action.payload
    case "ORDER_BY_NAME":
      return {
        ...state,
        countries:  action.payload === "asc"
        ? sortBy(state.countries, "name", "asc")
        : sortBy(state.countries, "name", "desc")
      };

    case "ORDER_BY_POPULATION":
      const sort =
        action.payload === "popAsc"
          ? sortBy(state.countries, "population", "asc")
          : sortBy(state.countries, "population", "desc");
      return {
        ...state,
        countries: sort,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
