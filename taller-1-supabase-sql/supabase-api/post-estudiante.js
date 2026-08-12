import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const url = `${process.env.SUPABASE_URL}/rest/v1/estudiantes`;
const headers = {
  apikey: process.env.SUPABASE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

async function crearEstudiante() {
  try {
    console.log('Creando estudiante...');

    const nuevoEstudiante = {
      nombre: 'Juan',
      edad: 20,
      email: 'juan23@mail.com',
      curso_id: 1,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(nuevoEstudiante),
    });

    const data = await response.json();

    console.log('Estudiante creado:');
    console.table(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

crearEstudiante();
