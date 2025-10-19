import mongoose from 'mongoose';

const vitalsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
      required: true,
    },
    bloodPressure: {
      type: String, // e.g= "120/80"
    },
    bloodSugar: {
      type: String, // eg= "95"
    },
    weight: {
      type: String, // e.g= "75"
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Vitals = mongoose.model('Vitals', vitalsSchema);
export default Vitals;