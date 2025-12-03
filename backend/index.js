const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- Conexión a Supabase ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Faltan SUPABASE_URL o SUPABASE_ANON_KEY en el archivo .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Rutas de la API ---

// Ping simple
app.get('/', (req, res) => {
  res.send('API del portafolio de Luis Mateo Muñoz (con Supabase)');
});

// Obtener proyectos desde la base de datos
app.get('/api/projects', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error('Error consultando Supabase:', error.message);
      return res.status(500).json({ message: 'Error consultando proyectos' });
    }

    // Adaptar formato para el frontend (split de techs)
    const projects = data.map((row) => ({
      id: row.id,
      title: row.title,
      tag: row.tag,
      tagVariant: row.tag_variant || 'filled',
      role: row.role,
      description: row.description,
      extra: row.extra || '',
      techs: row.techs ? row.techs.split(',').map((t) => t.trim()) : [],
      repo: row.repo
    }));

    res.json(projects);
  } catch (err) {
    console.error('Error inesperado:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// --- Levantar servidor ---
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
