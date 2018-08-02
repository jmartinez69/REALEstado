require('dotenv').config();
const express = require("express");
const passport = require('passport');
const pisoRoutes = express.Router();
const User = require("../models/User");
const Piso = require("../models/Piso");

pisoRoutes.get("/", (req, res, next) => {
  console.log('aaaaaaa')

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
  const fechaPublicacion = new Date();
  const idUser = req.user._id;
  const { proposito, contacto, direccion, location, fotos, 
          precio, descripcion, tipo, caracteristicas} = req.body;
 
  // if (username === "" || password === "") {
  //   res.status(400).json({ message: 'Usuario o Contraseña vacía' });
  //   return;
  // }

  // User.findOne({ username }, "username", (err, user) => {
  //   if (user !== null) {
  //     res.status(400).json({ message: 'El nombre de usuario ya existe' });
  //     return;
  //   }

    const newPiso = new Piso({
      idUser, proposito, contacto, direccion, location, fotos, 
      precio, descripcion, tipo, caracteristicas, fechaPublicacion
    });
    console.log(`Piso  a crear: ${newPiso}`)
    newPiso.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Algo ha ido mal con la creación del usuario' });
      } else{
        res.status(200).json(newPiso);       
      }
    });
  });


module.exports = pisoRoutes;