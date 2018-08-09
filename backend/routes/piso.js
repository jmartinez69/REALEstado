require('dotenv').config();
const express = require("express");
const passport = require('passport');
const pisoRoutes = express.Router();
const User = require("../models/User");
const Piso = require("../models/Piso");
const multer = require("multer");
const uploadCloud = require('../config/cloudinary');
const _ = require('lodash');

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


pisoRoutes.post("/add", uploadCloud.single('file'), (req, res, next) => {
/*
  form.append('piso.proposito', this.newPiso.proposito);
  form.append('piso.contacto.nombre', this.newPiso.contacto.nombre);
  form.append('piso.contacto.telefono', this.newPiso.contacto.telefono);
  form.append('piso.contacto.email', this.newPiso.contacto.email); 
  form.append('piso.direccion.provincia', this.newPiso.direccion.provincia);  
  form.append('piso.direccion.localidad', this.newPiso.direccion.localidad);  
  form.append('piso.direccion.calle', this.newPiso.direccion.calle);     
  form.append('piso.direccion.numero', this.newPiso.direccion.numero);   
  form.append('piso.direccion.planta', this.newPiso.direccion.planta);   
  form.append('piso.direccion.numPiso', this.newPiso.direccion.numPiso);  
  form.append('piso.location', this.newPiso.location);  
  form.append('piso.precio', this.newPiso.precio);  
  form.append('piso.descripcion', this.newPiso.descripcion); 
  form.append('piso.tipo', this.newPiso.tipo); 
  form.append('piso.caracteristicas.tamanom2', this.newPiso.caracteristicas.tamanom2);
  form.append('piso.caracteristicas.numHab', this.newPiso.caracteristicas.numHab);                 
  form.append('piso.caracteristicas.numBan', this.newPiso.caracteristicas.numBan);  
  form.append('user', this.newPiso.idUser); 
*/
  var piso = {} , user = {};
  if (req.file.url) { 
      const fotoUrl = req.file.url;

      const {proposito, nombre, telefono, email, provincia, localidad, calle, numero, planta, numPiso,
        lat, lon, precio, descripcion, tipo, tamanom2, numHab, numBan, user} = req.body;
       piso = {
        proposito,
        contacto: {
          nombre,
          telefono,
          email
        },
        direccion: {
          provincia,
          localidad,
          calle,
          numero,
          planta,
          numPiso
        },
        location: {
          type: "Point",
          coordinates: [lat,lon]
        },
        fotos: [],
        precio,
        descripcion,
        tipo,
        caracteristicas: {
          tamanom2,
          numHab,
          numBan
        },
        fechaPublicacion: new Date(),
      }
      piso.idUser = user._id;
      piso.fotos.push(fotoUrl);
      console.log("Esto es lo que esta llegando del front ===============================");
      console.log(piso);
      console.log(user);
  }
  else {
      piso = req.body.piso;
      user = req.body.user;
      piso.fechaPublicacion = new Date();
      piso.idUser = user._id;
  }

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