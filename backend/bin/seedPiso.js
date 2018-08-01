require("dotenv").config();
const mongoose = require("mongoose");
const Piso = require("../models/Piso");
const User = require("../models/User");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const DATABASE = process.env.REALESTADODB;
mongoose.connect(DATABASE);


Piso.collection.drop();

fechaToday= new Date();




const pisos = [
  {
    proposito: "alquiler",
    contacto: { nombre: "Pedro Perez" , telefono: 634543432, email: "jesmart1969@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Prosperidad", calle: "Francisco Vivancos", numero: 0, planta: 2, numPiso: ""},
    location:{
      type: "Point",
      coordinates:[40.4472158,-3.6651538]
    }, 
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
    location:{
      type: "Point",
      coordinates:[40.4419191,-3.6752399]
    }, 
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
    location:{
      type: "Point",
      coordinates:[40.3926217,-3.6840587]
    }, 
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
    location:{
      type: "Point",
      coordinates:[40.3932519,-3.6924843]
    },
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
    location:{
      type: "Point",
      coordinates:[40.3907402,-3.6910599]
    },
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
    location:{
      type: "Point",
      coordinates:[40.3855695,-3.6885138]
    },
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/99/a3/38/587368777.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/96/6f/96/587368779.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/f8/c3/ba/587368783.jpg"],
    precio: 750,
    descripcion: "Piso exterior en segunda planta con ascensor. Dispone de 1 dormitorio amplio con armario empotrado, salón, cocina americana y baño completo. El piso se alquila tal y como se ve en las fotos. Tiene suelos de parquet, paredes de gotelet y ventanas de climalit. Plaza de garaje incluida en el precio. La urbanización cuenta con portero físico, piscina y zonas verdes. Situado en la zona conocida como 'Los Puertos', en Legazpi, se encuentra muy próximo a Madrid Río y Parque Tierno Galván. Comunicado mediante autobuses (62, T32) y metro Legazpi (L3-L6).",
    tipo: "piso",
    caracteristicas: { tamanom2: 95, numHab: 1, numBan: 1 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "venta",
    contacto: { nombre: "Juliana Silva" , telefono: 634562432, email: "jsilva67@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Villa del Prado", calle: "Juan Carlos I", numero: 30, planta: 0, numPiso: ""}, 
    location:{
      type: "Point",
      coordinates:[40.2793965,-4.3017296]
    }, 
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/f4/3b/e9/571664063.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/83/a9/b6/571664064.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/02/22/5f/571664070.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/19/9e/ab/571664071.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/f8/4f/19/571664077.jpg"],
    precio: 155000,
    descripcion: "Lindo Chalet a remodelar, a las afueras de Madrid, con cuatro habitaciones y dos baños, piscina y amplio terreno",
    tipo: "casa",
    caracteristicas: { tamanom2: 267, numHab: 4, numBan: 2 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "venta",
    contacto: { nombre: "Juliana Silva" , telefono: 634562432, email: "jsilva67@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Navalcarnero", calle: "del Labrador", numero: 25, planta: 0, numPiso: ""}, 
    location:{
      type: "Point",
      coordinates:[40.2992051,-3.9837861]
    },
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/1f/33/3d/285536312.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/3e/a2/6f/285536410.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/3a/ce/88/285536396.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/80/db/2d/285536394.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/c7/61/36/285536409.jpg"],
    precio: 220000,
    descripcion: "Unifamiliares Adosadas 1 Parcela: 165,00 m2 Jardín: 98,06 m2 Vivienda: 188,43 m2 constr. + Ático opcional de 62,25 m2 constr. Planta sótano -. Dos plazas de garaje y zonas de servicio e instalaciones. Planta baja -. En esta planta se sitúan las zonas de día: Hall, cocina, aseo, y salón-comedor con gran ventanal que sirve de salida a terraza, jardín privado y zona común. Planta segunda -. Destinada a la zona de noche: Con un dormitorio-suite con baño y dos dormitorios adicionales con otro baño. Ático -. Opcionalmente se ofrece la opción de entregar terminado el espacio bajo cubierta con otra habitación de 19 m2 con salida a terraza y baño completo de 12 m2.",
    tipo: "casa",
    caracteristicas: { tamanom2: 188, numHab: 4, numBan: 4 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "venta",
    contacto: { nombre: "Juliana Silva" , telefono: 634562432, email: "jsilva67@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Legazpi", calle: "Paseo del Molino", numero: 0, planta: 7, numPiso: ""}, 
    location:{
      type: "Point",
      coordinates:[40.3896912,-3.6969612]
    }, 
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/04/86/bb/581788248.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/39/c1/2a/581788244.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/90/de/0d/581788242.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/d5/81/22/581788229.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/24/00/08/581788264.jpg"],
    precio: 465000,
    descripcion: "TECNOCASA LEGAZPI VENDE: Luminoso y espacioso Ático de 123m2 construidos distribuidos en 3 dormitorios, salón con salida a terraza de 9m2, cocina con terraza y baño. Tiene Armarios empotrados, cocina y baño reformados, instalaciones reformadas de 2008, vistas despejadas con orientación hacia el sur-oeste y mucha luz. Se ubica en la última planta del edificio, que tiene portero físico y ascensor. Ubicación excelente junto a la plaza de Legazpi, buenas comunicaciones en transporte público, con salida a m-30 a pocos minutos. Matadero es hoy lugar de exposiciones, conciertos y vida. La vida de Legazpi, un barrio residencial en el extremo sur de la M30 donde se encuentran numerosos servicios como colegios, farmacias, supermercados y el nuevo Centro Comercial de la zona PLAZA RIO 2. ",
    tipo: "atico",
    caracteristicas: { tamanom2: 123, numHab: 3, numBan: 1 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "alquiler",
    contacto: { nombre: "Juliana Silva" , telefono: 634562432, email: "jsilva67@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Legazpi", calle: "Paseo del Molino", numero: 0, planta: 7, numPiso: ""}, 
    location:{
      type: "Point",
      coordinates:[40.3896912,-3.6969612]
    },
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/04/86/bb/581788248.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/39/c1/2a/581788244.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/90/de/0d/581788242.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/d5/81/22/581788229.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/24/00/08/581788264.jpg"],
    precio: 1500,
    descripcion: "TECNOCASA LEGAZPI VENDE: Luminoso y espacioso Ático de 123m2 construidos distribuidos en 3 dormitorios, salón con salida a terraza de 9m2, cocina con terraza y baño. Tiene Armarios empotrados, cocina y baño reformados, instalaciones reformadas de 2008, vistas despejadas con orientación hacia el sur-oeste y mucha luz. Se ubica en la última planta del edificio, que tiene portero físico y ascensor. Ubicación excelente junto a la plaza de Legazpi, buenas comunicaciones en transporte público, con salida a m-30 a pocos minutos. Matadero es hoy lugar de exposiciones, conciertos y vida. La vida de Legazpi, un barrio residencial en el extremo sur de la M30 donde se encuentran numerosos servicios como colegios, farmacias, supermercados y el nuevo Centro Comercial de la zona PLAZA RIO 2. ",
    tipo: "atico",
    caracteristicas: { tamanom2: 123, numHab: 3, numBan: 1 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "alquiler",
    contacto: { nombre: "Juliana Silva" , telefono: 634562432, email: "jsilva67@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Legazpi", calle: "del Bronce", numero: 0, planta: 7, numPiso: ""}, 
    location:{
      type: "Point",
      coordinates:[40.3874417,-3.6929011]
    }, 
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/5e/6e/25/198733458.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/ce/2a/8b/198733460.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/e9/10/45/198733473.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/d2/a3/f6/198733481.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/34/fd/40/198733459.jpg"],
    precio: 1200,
    descripcion: "Precioso loft de dos dormitorios tipo duplex, estará disponible a partir de la primera semana de Agosto, cocina amueblada de calidad con electrodomesticos, en la planta principal, salon, cocina y baño y en la planta superior dos dormitorios muy amplios con baño completo y un gran vestidor, el salon mide aproximadamente 21 metros, armarios empotrados, calefaccion individual, finca con piscina jardin etc, esta la reforma a estrenar, muy buenas calidades, sanitarios, electrodomesticos, luces, todo nuevo a estrenar no dude en visitarlo.",
    tipo: "atico",
    caracteristicas: { tamanom2: 103, numHab: 2, numBan: 2 },
    fechaPublicacion: fechaToday,    
  },
  {
    proposito: "alquiler",
    contacto: { nombre: "Juliana Silva" , telefono: 634562432, email: "jsilva67@gmail.com"},
    direccion: {provincia: "Madrid", localidad: "Tetuan", calle: "Bravo Murillo", numero: 0, planta: 7, numPiso: ""}, 
    location:{
      type: "Point",
      coordinates:[40.450385,-3.7056498]
    },
    fotos: ["https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/cb/47/bb/587961898.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/6e/16/17/587961900.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-L-L/0/id.pro.es.image.master/2c/ca/8d/587961902.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-L/0/id.pro.es.image.master/e7/86/a9/587961928.jpg", "https://img3.idealista.com/blur/WEB_DETAIL-M-P/0/id.pro.es.image.master/c9/b8/a7/587961924.jpg"],
    precio: 850,
    descripcion: "Se alquila fantástico piso de un dormitorio y un baño completo en zona inmejorable de Madrid. Gastos de comunidad, calefacción y agua caliente incluidos en el precio. Cercano a zonas comerciales y conectado con servicios de transporte público. Exterior. Salón espacioso con ventanales que aportan mucha luminosidad, con zona comedor y acceso a la terraza. Cocina americana equipada con electrodomésticos, en el salón. Amueblado",
    tipo: "piso",
    caracteristicas: { tamanom2: 65, numHab: 1, numBan: 1 },
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

        