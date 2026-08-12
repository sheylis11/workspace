import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const url = `${process.env.SUPABASE_URL}/rest/v1/estudiantes`;
const headers = {
  apikey: process.env.SUPABASE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

async function obtenerEstudiantes() {
  try {
    console.log('Consultando API...');

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    console.log('Respuesta de la API:');
    console.table(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

obtenerEstudiantes();
