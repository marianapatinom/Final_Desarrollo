import mongoose from 'mongoose';

export const connectDatabase = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('La variable MONGO_URI no esta configurada');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Base de datos MongoDB conectada');
};
