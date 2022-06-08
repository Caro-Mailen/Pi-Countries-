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

    if (nameCountry.length) {
      nameCountry.forEach(async (country) => {
        const findCountry = await Country.findAll({
          where: { name: toLowerCase(country.name) },
        });
        // console.log({ findCountry });
        newActivity.addCountry(findCountry);
      });
    }

    res.status(200).send("Activity successfully created");
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    const findCounts = await Activity.findAll({
      where: { name: name },
      include: {
        model: Country,
        attributes: ["id", "name", "flag", "continent"],
        through: "Activity_Country",
      },
    });

    res.status(200).send(findCounts);
  }

  const allActivities = await Activity.findAll({
    attributes: { exclude: ["id", "difficulty", "duration", "season"] },
  });
  const nameActivity = [...new Set([...allActivities.map((el) => el.name)])];

  res.status(200).send(nameActivity);
});

module.exports = router;
