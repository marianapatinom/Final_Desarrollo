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
      },
      {
        restaurante: 'La Provincia',
        calificacion: 5,
        fechaVisita: new Date('2026-05-18T00:00:00Z'),
        observaciones: 'El lugar tiene una presentación impecable y platos muy bien logrados. La pasta estaba en su punto y la atención fue cercana durante toda la visita.',
        usuario: createdUsers[0]._id
      },
      {
        restaurante: 'Mondongos',
        calificacion: 4,
        fechaVisita: new Date('2026-05-10T00:00:00Z'),
        observaciones: 'Porciones generosas, sabor tradicional y servicio rápido. Es una buena opción para almorzar en familia, especialmente si se busca comida típica antioqueña.',
        usuario: createdUsers[1]._id
      },
      {
        restaurante: 'Carmen',
        calificacion: 5,
        fechaVisita: new Date('2026-05-12T00:00:00Z'),
        observaciones: 'La experiencia fue muy completa, con platos creativos y sabores equilibrados. El ambiente es elegante sin sentirse demasiado formal.',
        usuario: createdUsers[0]._id
      },
      {
        restaurante: 'Alambique',
        calificacion: 4,
        fechaVisita: new Date('2026-05-26T00:00:00Z'),
        observaciones: 'La decoración es hermosa y la carta tiene combinaciones interesantes. Probamos varias entradas y todas llegaron con buena temperatura y excelente sabor.',
        usuario: createdUsers[1]._id
      },
      {
        restaurante: 'OCI.Mde',
        calificacion: 5,
        fechaVisita: new Date('2026-05-30T00:00:00Z'),
        observaciones: 'Muy buena cocina de autor. Los platos tienen técnica, buena presentación y sabores diferentes. El personal explicó muy bien cada recomendación.',
        usuario: createdUsers[0]._id
      },
      {
        restaurante: 'La Matriarca',
        calificacion: 4,
        fechaVisita: new Date('2026-05-08T00:00:00Z'),
        observaciones: 'Comida colombiana con buen sazón y un ambiente agradable. El chicharrón estaba crocante y las guarniciones fueron abundantes.',
        usuario: createdUsers[1]._id
      },
      {
        restaurante: 'Rocoto',
        calificacion: 5,
        fechaVisita: new Date('2026-05-22T00:00:00Z'),
        observaciones: 'Excelente opción de comida peruana. El ceviche estaba fresco, con buen nivel de acidez, y los platos principales llegaron muy bien servidos.',
        usuario: createdUsers[0]._id
      },
      {
        restaurante: 'La Pampa',
        calificacion: 4,
        fechaVisita: new Date('2026-05-16T00:00:00Z'),
        observaciones: 'Muy buena parrilla, carnes jugosas y acompañamientos bien preparados. El lugar es cómodo y funciona muy bien para una cena tranquila.',
        usuario: createdUsers[1]._id
      },
      {
        restaurante: 'Bao Bei',
        calificacion: 3,
        fechaVisita: new Date('2026-05-05T00:00:00Z'),
        observaciones: 'La propuesta asiática es interesante y los baos tienen buen sabor. El servicio fue amable, aunque algunos platos tardaron más de lo esperado.',
        usuario: createdUsers[0]._id
      },
      {
        restaurante: 'Burdo',
        calificacion: 4,
        fechaVisita: new Date('2026-05-27T00:00:00Z'),
        observaciones: 'Buen ambiente para compartir con amigos. Las hamburguesas tienen buen tamaño, los cócteles son creativos y la música estuvo a volumen adecuado.',
        usuario: createdUsers[1]._id
      },
      {
        restaurante: 'Sushi Market',
        calificacion: 4,
        fechaVisita: new Date('2026-05-21T00:00:00Z'),
        observaciones: 'Los rollos estaban frescos y bien armados. La carta tiene variedad suficiente y la atención fue eficiente durante toda la noche.',
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
