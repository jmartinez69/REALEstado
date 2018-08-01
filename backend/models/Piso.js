const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pisoSchema = new Schema({
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
  activo: { type: Boolean, default: true }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

pisoSchema.index({
  location: '2dsphere'
});

const Piso = mongoose.model('Piso', pisoSchema);
module.exports = Piso;