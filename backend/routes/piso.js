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
/*
idUser: { type : Schema.Types.ObjectId, ref: 'User' },
proposito: { type: String, enum: ['venta', 'alquiler'] },
contacto:  { nombre: String,
             telefono: String,
             email: String} ,
direccion: { provincia: String,
              localidad: String,
              calle: String,
              numero: Number,
              planta: Number,
              numPiso: String} ,
location: {
            type: {
                    type: String
                },
            coordinates: [Number]
            },
fotos: [{type: String}],
precio: Number,
descripcion: String,
tipo: { type: String, enum: ['piso', 'casa', 'duplex', 'atico'] },
caracteristicas: { tamanom2: Number,
                    numHab: Number,
                    numBan: Number},
fechaPublicacion: Date,
*/

pisoRoutes.post("/add", (req, res, next) => {

  const {piso, user} = req.body;
  piso.fechaPublicacion = new Date();
  piso.idUser = user._id;
  console.log("este es el user:" + piso.idUser);
  const newPiso = new Piso(piso);
  console.log("Piso a crear");
  console.log(newPiso);
  newPiso.save((err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: 'Algo ha ido mal con la creación del piso' });
    } else{
      res.status(200).json(newPiso);       
    }
  });
  });


module.exports = pisoRoutes;