const express = require("express");
const router = express.Router();

const db = require("../db/models/index");

// route to GET /pokemons
router.get("/", async (req, res, next) => {
  try {
    const pokemons = await db.Pokemon.findAll();

    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const pokemon = req.body;

    const newPokemon = await db.Pokemon.create(pokemon);
    res.status(201).json(newPokemon);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemon = await db.Pokemon.findByPk(pokemonId); // returns null if not found

    if (pokemon === null) {
      res.sendStatus(404);
    } else {
      res.json(pokemon);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
