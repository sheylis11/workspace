const url =
  "https://rickandmortyapi.com/api/character";

const headers = {
  "Content-Type": "application/json",
};

// Obtener todos los personajes
async function obtenerPersonajes() {
  try {

    console.log("Consultando API...");

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    // Validar respuesta
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    console.log("Respuesta de la API:");
    console.log(data);

    console.table(data.results);

  } catch (error) {

    console.log("Error:");
    console.log(error.message);

  }
}

// Mostrar únicamente los nombres
async function soloNombres() {
  try {

    console.log("Mostrando nombres de personajes...");

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    const nombres = data.results.map(
      personaje => personaje.name
    );

    console.table(nombres);

  } catch (error) {

    console.log("Error:");
    console.log(error.message);

  }
}
async function obtenerPagina(numeroPagina) {
  try {

    console.log(`Consultando página ${numeroPagina}...`);

    const response = await fetch(
      `${url}?page=${numeroPagina}`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`La página ${numeroPagina} no existe`);
    }

    const data = await response.json();

    console.log(`Datos de la página ${numeroPagina}:`);

    console.table(data.results);

  } catch (error) {

    console.log("Error:");
    console.log(error.message);

  }
}

// Llamadas a las funciones
obtenerPersonajes();

soloNombres();

obtenerPagina(2);


const url =
  "https://rickandmortyapi.com/api/character";

const headers = {
  "Content-Type": "application/json",
};

async function obtenerPersonajes() {
  try {

    console.log("Consultando API...");

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    console.log("Respuesta de la API:");
    console.log(data);

    console.table(data);

  } catch (error) {

    console.log("Error:");
    console.log(error);

  }
}

obtenerPersonajes();