const { Router } = require("express");

const { Activity, Country } = require("../db");
const { toLowerCase } = require("../utils");

const router = Router();

// [ ] POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos

router.post("/", async (req, res, next) => {
  const { name, difficulty, duration, season, nameCountry } = req.body;

  if (!name || !difficulty || !season)
    return res.status(400).send("Please insert required fields to continue");

  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season: toLowerCase(season),
    });

    const findCountry = await Country.findAll({
      where: { name: toLowerCase(nameCountry) },
    });

    newActivity.addCountry(findCountry);

    res.status(200).send("Activity successfully created");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
