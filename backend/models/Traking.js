const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const trackingSchema = new Schema({
  idUser: { type : Schema.Types.ObjectId, ref: 'User' },

  geotracking: [{
                type: {
                    type: String
                },
                location: [Number],
                fechaPoint: Date
                }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
/*
trackingSchema.index({
  geotracking: '2dsphere'
});
*/

const Tracking = mongoose.model('Tracking', trackingSchema);
module.exports = Tracking;