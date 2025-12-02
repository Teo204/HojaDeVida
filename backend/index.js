const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Datos de proyectos (se sirven por API)
const projects = [
  {
    id: 'dulce-hogar',
    title: 'Sistema de Gestión de Almacén “Dulce Hogar”',
    tag: 'Frontend · React',
    tagVariant: 'filled',
    role: 'Desarrollador Frontend',
    description:
      'Aplicación web desarrollada en React para la gestión de productos de un almacén. ' +
      'Permite administrar inventario, registrar productos y visualizar información estructurada por categorías.',
    extra: '',
    techs: ['React', 'JavaScript', 'CSS', 'Vite'],
    repo: 'https://github.com/VictorPersonal/proyectoalmacen.git'
  },
  {
    id: 'parqueadero',
    title: 'Reto 1 – Sistema de Control de Parqueadero',
    tag: 'Fullstack',
    tagVariant: 'outline',
    role: 'Desarrollador Fullstack',
    description:
      'Sistema para gestionar el ingreso y salida de vehículos de un parqueadero con backend en Node.js + Express ' +
      'y frontend en React. Implementa una API REST con métodos GET, POST, PUT y DELETE.',
    extra: '',
    techs: ['React', 'Node.js', 'Express', 'JavaScript', 'CSS', 'Git'],
    repo: 'https://github.com/Teo204/Parqueadero'
  },
  {
    id: 'identidad',
    title: 'Reto 2 – Sistema de Gestión de Identificación Ciudadana',
    tag: 'Datos · SQL',
    tagVariant: 'filled',
    role: 'Modelo de datos y reportes',
    description:
      'Diseño de un sistema para gestionar documentos de identidad y datos personales, ' +
      'con modelado relacional y consultas SQL para generar reportes de usuarios y reportes departamentales.',
    extra: '',
    techs: ['Modelado relacional', 'SQL', 'Consultas y reportes', 'Git'],
    repo: 'https://github.com/Teo204/reto-industria-revolcuion'
  },
  {
    id: 'caicedonia',
    title: 'Reto 3 – Plataforma de Redistribución de Alimentos en Caicedonia',
    tag: 'Impacto social',
    tagVariant: 'outline',
    role: 'Diseño de solución y prototipo',
    description:
      'Plataforma conceptual que conecta establecimientos donantes de alimentos con beneficiarios y voluntarios ' +
      'para reducir el desperdicio y mejorar el acceso a comida en grupos vulnerables.',
    extra: '',
    techs: ['Levantamiento de requisitos', 'Diseño de plataforma', 'Git', 'GitHub'],
    repo: 'https://github.com/Teo204/caicedonia-alimentos'
  }
];

// Endpoint principal de la API
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/', (req, res) => {
  res.send('API del portafolio de Luis Mateo Muñoz');
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
