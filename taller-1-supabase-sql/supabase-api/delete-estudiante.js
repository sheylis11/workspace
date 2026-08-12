import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = `${process.env.SUPABASE_URL}/rest/v1/estudiantes`;
const headers = {
  apikey: process.env.SUPABASE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

async function eliminarEstudiante(id) {
  try {
    console.log('Eliminando estudiante...');

    const response = await fetch(`${baseUrl}?id=eq.${id}`, {
      method: 'DELETE',
      headers,
    });

    console.log('Estudiante eliminado');
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Error:', error);
  }
}

eliminarEstudiante(1);
