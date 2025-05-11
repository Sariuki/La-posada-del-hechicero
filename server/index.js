import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
const app = express();
dotenv.config();

require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de base de datos
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Iniciar servidor
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
