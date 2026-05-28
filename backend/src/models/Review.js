import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    restaurante: {
      type: String,
      required: [true, 'El nombre del restaurante es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre del restaurante debe tener al menos 2 caracteres']
    },
    calificacion: {
      type: Number,
      required: [true, 'La calificacion es obligatoria'],
      min: [1, 'La calificacion minima es 1'],
      max: [5, 'La calificacion maxima es 5']
    },
    fechaVisita: {
      type: Date,
      required: [true, 'La fecha de visita es obligatoria']
    },
    observaciones: {
      type: String,
      required: [true, 'Las observaciones son obligatorias'],
      trim: true,
      minlength: [10, 'Las observaciones deben tener al menos 10 caracteres']
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
