require('dotenv').config();
const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const Track = require("../models/Traking")
const nodemailer = require('nodemailer');
const multer = require("multer");
const uploadCloud = require('../config/cloudinary');
const _ = require('lodash');


const gmailRESender = process.env.GMAILACC;
const gmailREPass = process.env.GMAILPASS;


let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: gmailRESender,
    pass: gmailREPass
  }
});

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Algo ha salido mal' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    if (!theUser.confirmed){
      res.status(500).json({ message: 'Usuario no confirmado' });
      return;       
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Algo ha salido mal con el login' });
        return;
      }

      res.status(200).json(req.user);
    });
  })(req, res, next);
});


authRoutes.post("/signup", uploadCloud.single('file'), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "") {
    res.status(400).json({ message: 'Usuario o Contraseña vacía' });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'El nombre de usuario ya existe' });
      return;
    }
    const hashPass = bcrypt.hashSync(password, bcryptSalt);    
    const hasConfCode = bcrypt.hashSync(username, bcryptSalt);
    object = {
      username,
      password: hashPass,
      email,
      confirmationCode: hasConfCode.replace(/\//gi, "")
    }
//    const object = _.pickBy(req.body, (e,k) => paths.includes(k));
    if (req.file.url) object.avatar = req.file.url;



    const subject = "Correo de confirmación RealEstado";
    const message=process.env.CONFIRMROUTE+hasConfCode.replace(/\//gi, "");

    User.create(object)
    .then( obj => {
        console.log('obj');
        console.log(obj);
        res.status(200).json(obj);
        transporter.sendMail({
          from: `"RealEstado 👻" <${gmailRESender}>`,
          to: email, 
          subject: subject, 
          html: `<b>${message}</b>`
        })
        .then(info =>  console.log(`Mensaje enviado a ${email}`))
        .catch(error => console.log(`Error en el envío de correo de confirmación: ${error}`));
    })
    .catch(e => next(e))
  });
});

authRoutes.get("/confirm/:confirmationCode", (req, res, next) => {
  confirmationCode = req.params.confirmationCode;
  User.findOne({ confirmationCode }).then(user => {
    if (user === null) {
      res.status(400).json({ message: 'Algo ha salido mal con la busqueda del usuario a activar' });
    }else {
      username=user.username;
      User.findByIdAndUpdate(user._id,{ confirmed : true })
      .then(() =>  { 
        console.log(`Usuario ${user._id} ha sido activado`);
//        res.status(200).json({ message: 'Usuario activado satisfactoriamente' }); 
          res.render("auth/confirmation", { username }); 
      })
      .catch (err => console.log(`Error al activar usuario: ${err}`))
    }
;
  })
  .catch (err => console.log(err))
});

authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Usuario no logeado' });
});



authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Logout exitoso' });
});

authRoutes.post('/registerLoc', (req,res,next) => {
  const { coords, user} = req.body;

  console.log(`user vale lo siguiente:====`);
  console.log(user);
  console.log(`coords vale lo siguiente:=====`);
  console.log(coords);

  const geotracking = {
    type: "Point",
    location: [coords.lat, coords.lon]
  };
  Track.findOne({idUser : user._id}).then(userLogged => {
    if (userLogged === null) {
      object = {
        idUser: user._id,
        geotracking : [geotracking]
      };
      Track.create(object)
      .then( obj => {
          res.status(200).json(obj);
        })
      .catch(e => next(e))     
    }else {
 //     res.status(200).json(piso);
        Track.findOneAndUpdate({idUser : user._id}, {
          $push: { geotracking }
        }).then ((salida)=>{
            console.log("INSERTADO POSICION EN BD TRACKING")
            console.log(salida);
            res.status(200).json(salida);
        })
        .catch (err => {
          console.log(err);
          res.status(400).json({ message: 'Algo ha salido guardando el GEO tracking' });
        })
    }
  })
  .catch (err => {
        console.log(err);
        res.status(400).json({ message: 'Algo ha salido mal con la busqueda del usuario en tracking' });
      })
});

module.exports = authRoutes;
