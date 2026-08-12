import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = `${process.env.SUPABASE_URL}/rest/v1/estudiantes`;
const headers = {
  apikey: process.env.SUPABASE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

async function actualizarEstudiante(id) {
  try {
    console.log('Actualizando estudiante...');

    const estudianteActualizado = {
      nombre: 'Pedro',
      edad: 25,
      curso_id: 1,
    };

    const response = await fetch(`${baseUrl}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        ...headers,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(estudianteActualizado),
    });

    const data = await response.json();

    console.log('Estudiante actualizado:');
    console.table(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

actualizarEstudiante(1);
