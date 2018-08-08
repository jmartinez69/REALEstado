require('dotenv').config();
const express = require("express");
const trackingRoutes = express.Router();
const User = require("../models/User");
const Piso = require("../models/Piso");
const Valoracion = require("../models/Valoracion");
const Tracking = require('../models/Traking')

trackingRoutes.get("/:id", (req, res, next) => {
  const idUser= req.params.id;
  Tracking.find({idUser}).sort({ updated_at: -1 }).then(traking => {
    if (traking === null) {
      res.status(200).json({ message: 'no' });
    }else {
      res.status(200).json(traking);
    }
  })
  .catch (err => {
        console.log(err);
        res.status(400).json({ message: 'Algo ha salido mal con la busqueda del traking de' + idUser });
      })

});

module.exports = trackingRoutes;