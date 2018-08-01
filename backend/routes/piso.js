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

  })
  .catch (err => {
        console.log(err);
        res.status(400).json({ message: 'Algo ha salido mal con la busqueda del pisos' });
      })
});

pisoRoutes.post("/", (req, res, next) => {
  const { lat, lon } = req.body;
  Piso.find(   {
     location:
       { $near:
          {
            $geometry: { type: "Point",  coordinates: [ lat, lon ] },
            $maxDistance: 5000
          }
       }
   }).then(listaPisos => {
    if (listaPisos === null) {
      res.status(400).json({ message: 'Lista de pisos vacia. Algo no anda bien con la BD' });
    }else {
      res.status(200).json(listaPisos);
    }

  })
  .catch (err => {
        console.log(err);
        res.status(400).json({ message: 'Algo ha salido mal con la busqueda del pisos' });
      })
});

pisoRoutes.get("/:id", (req, res, next) => {
  const user = res.locals.user;
  const idPiso= req.params.id;

  Piso.findById({_id:idPiso}).then(piso => {
    if (piso === null) {
      res.status(400).json({ message: 'Problema al conseguir el piso' });
    }else {
      res.status(200).json(piso);
    }

  })
  .catch (err => {
        console.log(err);
        res.status(400).json({ message: 'Algo ha salido mal con la busqueda del piso' });
      })

});




module.exports = pisoRoutes;