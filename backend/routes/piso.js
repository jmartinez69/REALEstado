require('dotenv').config();
const express = require("express");
const passport = require('passport');
const pisoRoutes = express.Router();
const User = require("../models/User");
const Piso = require("../models/Piso");

pisoRoutes.get("/", (req, res, next) => {

  Piso.find({}).then(listaPisos => {
    if (listaPisos === null) {
      res.status(400).json({ message: 'Lista de pisos vacia. Algo no anda bien con la BD' });
    }else {
      res.status(200).json(listaPisos);
    }
;
  })
  .catch (err => {
        console.log(err);
        res.status(400).json({ message: 'Algo ha salido mal con la busqueda del pisos' });
      })
});

module.exports = pisoRoutes;