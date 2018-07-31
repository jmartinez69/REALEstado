require("dotenv").config();
const mongoose = require("mongoose");
const Piso = require("../models/Piso");
const User = require("../models/User");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const DATABASE = process.env.REALESTADODB;
mongoose.connect(DATABASE);

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
                NumPiso: String} ,
  gelocalizacion: { lat: Number,
                    long: Number},
  fotos: [{type: String}],
  precio: Number,
  descripcion: String,
  tipo: { type: String, enum: ['piso', 'casa', 'duplex', 'atico'] },
  planta: Number,
  caracteristicas: { tamanom2: Number,
                      numHab: Number,
                      numBan: Number},
  fechaPublicacion: Date,
  activo: { type: Boolean, default: true },
*/

Piso.collection.drop();

fechaToday= new Date();




const pisos = [
  {
    proposito: "alquiler",
    contacto: { nombre: "Pedro Perez" , telefono: 634543432, email: "jesmart1969@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Prosperidad", calle: "Francisco Vivancos", numero: 0, planta: 2, numPiso: ""},
    gelocalizacion: { lat: 40.4472158, long: -3.6651538},
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/f9/74/3f/586505835.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/62/a9/14/586505836.jpg"],
    precio: 670,
    descripcion: "Estudio en alquiler en Calle de Francisco Vivancos, situado en el distrito de CHAMARTIN, Barrio de Prosperidad, en la planta 2ª. Es un piso luminoso que tiene 30 m2, cocina equipada, 1 baño, aire acondicionado, ventanas climalit. Está situado en una zona tranquila con todos los servicios disponibles para la vida diaria, supermercados, colegios, restaurantes, bares.. . Se encuentra a pocos metros del metro de Alfonso XIII además esta muy cercano a varias lineas de autobús.",
    tipo: "piso",
    caracteristicas: { tamanom2: 30, numHab: 1, numBan: 1 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "alquiler",
    contacto: { nombre: "Pedro Perez" , telefono: 634543432, email: "jesmart1969@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Prosperidad", calle: "Constancia", numero: 0, planta: 3, numPiso: ""},
    gelocalizacion: { lat: 40.4419191, long: -3.6752399},
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/74/df/72/586257678.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/de/bc/0b/586257679.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-P/0/id.pro.es.image.master/7c/0a/8f/586257683.jpg"],
    precio: 900,
    descripcion: "Este piso se encuentra en Calle de la Constancia, situado Prosperidad, en el distrito de CHAMARTIN, es una planta 3, tiene 60 m2 y dispone de salón, cocina amueblada, 2 habitaciones y 1 baño. Se alquila amueblado, con gas natural y calefacción central.",
    tipo: "piso",
    caracteristicas: { tamanom2: 60, numHab: 2, numBan: 1 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "venta",
    contacto: { nombre: "Pedro Perez" , telefono: 634543432, email: "jesmart1969@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Legazpi", calle: "Meneses", numero: 0, planta: 6, numPiso: ""}, 
    gelocalizacion: { lat: 40.3926217, long: -3.6840587},
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/77/fd/27/575380570.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/a1/08/40/575380575.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/45/6c/50/575380579.jpg"],
    precio: 348000,
    descripcion: "Frente a Parque Tierno Galván, zona residencial muy tranquila. Año 1997. Edificio con ascensor y acceso minusválidos. Piso en buen estado, todas las estancias son exteriores muy luminoso con grandes ventanales. SUPERFICIES: 89 m2 construidos según escritura.  88 m2 metros (74 m2 de vivienda + 14 m2 de elementos comunes) según catastro.  Distribución muy cómoda y cuadrada sin pasillos.  Salón-comedor 20 mt. Cocina independiente amueblada y equipada con electrodomésticos. Los dos dormitorios y el hall tienen armarios empotrados. Baño con bañera y ventana. Vistas muy buenas y muy despejadas al parque de Tierno Galván.  Terraza COMUNITARIA en ático. Zona de fácil aparcamiento. Opción a dejar algunos muebles.  Calefacción y agua caliente gas natural individual. Splits de aire acondicionado. Videoportero. ",
    tipo: "piso",
    caracteristicas: { tamanom2: 88, numHab: 2, numBan: 1 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "venta",
    contacto: { nombre: "Pedro Perez" , telefono: 634543432, email: "jesmart1969@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Legazpi", calle: "Del Plomo", numero: 0, planta: 2, numPiso: ""}, 
    gelocalizacion: { lat: 40.3932519, long: -3.6924843},
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/dd/85/54/579039380.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/11/28/5c/579039397.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/28/00/cd/579039387.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/7c/59/fb/579039386.jpg"],
    precio: 257500,
    descripcion: "FINCAS MADRID vende en el barrio de los Metales, una de las mejores zonas de Madrid, en urbanizacion privada piso seminuevo de 1 dormitorio con armario empotrado, amplio salón, impecable estado de conservación, todo exterior muy luminoso y tranquilo, excelente orientación, plaza de garaje con acceso directo, trastero, zonas comunes con piscina gimnasio sauna, vigilancia 24 h. Excelente comunicación a escasos metros del cercanias autobuses y metro. Es un barrio consolidado con supermercados Mercadona, Ahorramás, Simply.. . No dejes de visitarlo.",
    tipo: "piso",
    caracteristicas: { tamanom2: 46, numHab: 1, numBan: 1 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "alquiler",
    contacto: { nombre: "Pedro Perez" , telefono: 634543432, email: "jesmart1969@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Legazpi", calle: "Antracita", numero: 0, planta: 1, numPiso: ""}, 
    gelocalizacion: { lat: 40.3907402, long: -3.6910599},
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/e9/1e/df/41989064.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/33/95/a9/41989074.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-P/0/id.pro.es.image.master/77/21/5d/41989080.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/88/f4/78/41989097.jpg"],
    precio: 1150,
    descripcion: "Piso exterior de 2 dormitorios en calle Antracita, con salón, cocina amueblada y equipada con electrodomésticos, 1 baño completo, 1 aseo, tendedero cerrado y terraza. Suelos de tarima, ventanas climalit, puertas de roble, calefacción de gas natural y aire acondicionado. Plaza de garaje y trastero incluidos. Finca con ascensor, portero físico, piscina interior climatizada y exterior, gimnasio, jardines, zona infantil. Gastos de comunidad incluidos en el precio. Metro Arganzuela-Legazpi y paradas de autobuses muy cercanas.",
    tipo: "piso",
    caracteristicas: { tamanom2: 95, numHab: 2, numBan: 2 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "alquiler",
    contacto: { nombre: "Pedro Perez" , telefono: 634543432, email: "jesmart1969@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Legazpi", calle: "Puerto de la Cruz Verde", numero: 0, planta: 2, numPiso: ""}, 
    gelocalizacion: { lat: 40.3855695, long: -3.6885138},
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/99/a3/38/587368777.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/96/6f/96/587368779.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/f8/c3/ba/587368783.jpg"],
    precio: 750,
    descripcion: "Piso exterior en segunda planta con ascensor. Dispone de 1 dormitorio amplio con armario empotrado, salón, cocina americana y baño completo. El piso se alquila tal y como se ve en las fotos. Tiene suelos de parquet, paredes de gotelet y ventanas de climalit. Plaza de garaje incluida en el precio. La urbanización cuenta con portero físico, piscina y zonas verdes. Situado en la zona conocida como 'Los Puertos', en Legazpi, se encuentra muy próximo a Madrid Río y Parque Tierno Galván. Comunicado mediante autobuses (62, T32) y metro Legazpi (L3-L6).",
    tipo: "piso",
    caracteristicas: { tamanom2: 95, numHab: 1, numBan: 1 },
    fechaPublicacion: fechaToday,    
  }
];





// Confirmacion de creaccion tanto para movies como celebrities en consola.
Piso.create(pisos, (err, data) => {
  if (err) {
    throw err;
  }
  })
  .then(() => {
    console.log("Pisos creados");
    User.findOne({}).then(user => {
          Piso.updateMany({}, { idUser: user._id }).then(answer => {
            console.log("Usuarios actualizados");
            mongoose.disconnect(); 
            console.log("desconectado") });
          })
          .catch(err => {
                console.log("ERROR ACTUALIZANDO PISOS:" + err);
          });
  })

        