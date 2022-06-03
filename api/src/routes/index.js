const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countryRouter = require("./countries");
const activityRouter = require("./activity");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countryRouter);
router.use("/activity", activityRouter);

module.exports = router;
