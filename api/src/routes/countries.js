const { Router } = require("express");
// const { apiLoadDb } = require("../helper/data");
const { Country } = require("../db");
const { Activity } = require("../db");
const { Op } = require("sequelize");

const router = Router();

// [ ] GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos
//y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.

// [ ] GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    const countryInfo = await Country.findAll({
      include: { model: Activity }, //agregue attributes : name
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    res.status(200).json(countryInfo);
  } else {
    const CountryAll = await Country.findAll({
      include: { model: Activity },
    });
    res.status(200).json(CountryAll);
  }
});

// [ ] GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

router.get("/:idPais", async (req, res) => {
  const { idPais } = req.params;

  const countId = idPais.toUpperCase();
  const countryFind = await Country.findByPk(countId, {
    include: { model: Activity },
  });

  countryFind
    ? res.json(countryFind)
    : res.status(404).send("`${id}` not found!");
});

module.exports = router;
