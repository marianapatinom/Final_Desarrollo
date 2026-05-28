import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El titulo es obligatorio'],
      trim: true,
      minlength: [3, 'El titulo debe tener al menos 3 caracteres'],
      maxlength: [100, 'El titulo no puede superar 100 caracteres']
    },
    descripcion: {
      type: String,
      required: [true, 'La descripcion es obligatoria'],
      trim: true,
      minlength: [10, 'La descripcion debe tener al menos 10 caracteres']
    },
    calificacion: {
      type: Number,
      required: [true, 'La calificacion es obligatoria'],
      min: [1, 'La calificacion minima es 1'],
      max: [5, 'La calificacion maxima es 5']
    },
    restaurante: {
      type: String,
      required: [true, 'El restaurante es obligatorio'],
      trim: true,
      minlength: [2, 'El restaurante debe tener al menos 2 caracteres']
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
