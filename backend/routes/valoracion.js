require('dotenv').config();
const express = require("express");
const valoracionRoutes = express.Router();
const User = require("../models/User");
const Piso = require("../models/Piso");
const Valoracion = require("../models/Valoracion");

valoracionRoutes.get("/:id", (req, res, next) => {
  const user = res.locals.user;
  const idPiso= req.params.id;
  Valoracion.find({idPiso}).sort({ updated_at: -1 }).then(valoracionesPiso => {
    if (valoracionesPiso === null) {
      res.status(200).json({ message: 'no' });
    }else {
      res.status(200).json(valoracionesPiso);
    }
  })
  .catch (err => {
        console.log(err);
        res.status(400).json({ message: 'Algo ha salido mal con la busqueda del piso' });
      })

});

valoracionRoutes.post("/add", (req, res, next) => {
  const {idPiso, idUser, valoracion} = req.body;
  console.log("este es el user:" + idUser);
  console.log("este es el piso:" + idPiso);
  const newValoracion = new Valoracion({
    idUser,   
    idPiso,
    puntuacion: valoracion.puntuacion,
    comentario: valoracion.comentario  
  });
  console.log("Valoracion a crear");
  console.log(newValoracion);
  newValoracion.save((err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: 'Algo ha ido mal con la creación valoracion' });
    } else{
      res.status(200).json(newValoracion);       
    }
  })
  .catch (err => {
    console.log(err);
    res.status(400).json({ message: 'Algo ha ido mal con la creación valoracion' });
  });
});

module.exports = valoracionRoutes;
