require('dotenv').config();
const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');


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

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});


authRoutes.post("/signup", (req, res, next) => {
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

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const hasConfCode = bcrypt.hashSync(username, salt);
    const subject = "Correo de confirmación RealEstado";
    const message=process.env.CONFIRMROUTE+hasConfCode.replace(/\//gi, "");
    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode: hasConfCode.replace(/\//gi, "")
    });
    console.log(`Usuario a crear: ${newUser}`)
    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Algo ha ido mal con la creación del usuario' });
      } else{
        res.status(200).json({ message: 'Usuario creado satisfactoriamente' });       
        transporter.sendMail({
          from: `"RealEstado 👻" <${gmailRESender}>`,
          to: email, 
          subject: subject, 
          html: `<b>${message}</b>`
        })
        .then(info =>  console.log(`Mensaje enviado a ${email}`))
        .catch(error => console.log(`Error en el envío de correo de confirmación: ${error}`));
      }
    });
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

module.exports = authRoutes;
