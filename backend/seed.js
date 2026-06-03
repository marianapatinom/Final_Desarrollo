import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import Review from './src/models/Review.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/restaurant_reviews';

const seedData = async () => {
  try {
    console.log('Conectando a la base de datos para sembrar datos...');
    await mongoose.connect(MONGO_URI);
    console.log('Base de datos conectada.');

    // Limpiar colecciones anteriores
    console.log('Limpiando base de datos anterior...');
    await User.deleteMany({});
    await Review.deleteMany({});

    console.log('Creando usuarios integrantes del equipo...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const usersData = [
      {
        nombre: 'Mariana Patiño Múnera',
        email: 'mariana.patino@example.com',
        password: hashedPassword
      },
      {
        nombre: 'Mariana Gutiérrez Restrepo',
        email: 'mariana.gutierrez@example.com',
        password: hashedPassword
      }
    ];

    const createdUsers = await User.create(usersData);
    console.log(`Creados ${createdUsers.length} usuarios con contraseña 'password123'.`);

    console.log('Creando opiniones de restaurantes...');
    const reviewsData = [
      {
        restaurante: 'Crepes & Waffles',
        calificacion: 5,
        fechaVisita: new Date('2026-05-20T00:00:00Z'),
        observaciones: 'Excelente relación calidad-precio. Las ensaladas son deliciosas y el helado de chocolate belga es insuperable. El servicio es siempre muy amable y rápido.',
        usuario: createdUsers[0]._id
      },
      {
        restaurante: 'Andrés Carne de Res',
        calificacion: 4,
        fechaVisita: new Date('2026-05-24T00:00:00Z'),
        observaciones: 'El ambiente es espectacular y único, una experiencia muy colombiana. La carne estuvo en su término perfecto, aunque el servicio se demoró un poco debido a la gran cantidad de clientes.',
        usuario: createdUsers[1]._id
      },
      {
        restaurante: 'El Cielo',
        calificacion: 5,
        fechaVisita: new Date('2026-05-15T00:00:00Z'),
        observaciones: 'Una experiencia gastronómica de alta cocina inigualable. Cada plato cuenta una historia y estimula todos los sentidos. El maridaje de vinos fue perfecto. Muy recomendado para ocasiones especiales.',
        usuario: createdUsers[1]._id
      },
      {
        restaurante: 'Pizzería Olivia',
        calificacion: 4,
        fechaVisita: new Date('2026-05-29T00:00:00Z'),
        observaciones: 'Las pizzas artesanales son increíbles, la masa delgada y crujiente con ingredientes frescos. Recomiendo mucho la pizza rústica y los jugos naturales del día.',
        usuario: createdUsers[0]._id
      }
    ];

    const createdReviews = await Review.create(reviewsData);
    console.log(`Creadas ${createdReviews.length} opiniones exitosamente.`);

    console.log('Sembrado de datos finalizado correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error al sembrar los datos:', error.message);
    process.exit(1);
  }
};

seedData();
