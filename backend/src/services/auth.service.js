import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async ({ nombre, email, password }) => {
  if (!nombre || !email || !password) {
    throw new AppError('Nombre, email y password son obligatorios', 400);
  }

  if (password.length < 6) {
    throw new AppError('La password debe tener al menos 6 caracteres', 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('El email ya esta registrado', 409);
  }

  const user = await User.create({ nombre, email, password });
  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email
    }
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError('Email y password son obligatorios', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Credenciales invalidas', 401);
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new AppError('Credenciales invalidas', 401);
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email
    }
  };
};
