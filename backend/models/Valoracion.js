const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const valoracionSchema = new Schema({
  idUser: { type : Schema.Types.ObjectId, ref: 'User' },
  idPiso: { type : Schema.Types.ObjectId, ref: 'Piso' },
  puntuacion: Number,
  comentario: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Valoracion = mongoose.model('Valoracion', valoracionSchema);
module.exports = Valoracion;