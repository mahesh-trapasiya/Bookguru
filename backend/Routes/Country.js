const express = require("express");
const countryController = require("../Controllers/Country");

const router = express.Router();

router.post("/api/addcountry", countryController.addCountries);
router.get("/countries", countryController.getCountries);

module.exports = router;
