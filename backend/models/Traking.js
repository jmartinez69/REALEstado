const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const trackingSchema = new Schema({
  idUser: { type : Schema.Types.ObjectId, ref: 'User' },

  geotracking: [{
                type: {
                    type: String
                },
                coordinates: [Number]
                }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Tracking = mongoose.model('Tracking', trackingSchema);
module.exports = Traking;