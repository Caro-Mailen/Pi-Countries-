const axios = require("axios");
const e = require("express");
const { Country } = require("../db");
const { toLowerCase } = require("../utils");

const apiLoadDb = async () => {
  const apiUrl = "https://restcountries.com/v3/all";
  try {
    const allCountryApi = await axios.get(apiUrl);

    const modelCountry = allCountryApi.data.map((country) => ({
      name: toLowerCase(country.name.official),
      id: country.cca3,
      flag: country.flags[1],
      continent: country.region,
      capital:
        country.capital && country.capital[0]
          ? country.capital[0]
          : country.name.common,
      subregion: country.subregion || "",
      area: country.area,
      population: country.population,
    }));

    modelCountry.length &&
      modelCountry.forEach((country) => {
        Country.findOrCreate({
          where: { ...country },
        });
      });

    return modelCountry || [];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { apiLoadDb };
