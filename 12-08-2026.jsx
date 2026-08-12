import { useState, useEffect } from 'react';
import './App.css';

// Datos iniciales de tareas.
// SOLUCIÓN: Ahora la tarea 4 tiene la propiedad 'categoria'
const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  { id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false }, // ✅ AGREGADA CATEGORIA
];

function App() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [filtro, setFiltro] = useState('todas');
  const [contador, setContador] = useState(0);

  // ✅ SOLUCIÓN BUG 2: Agregado arreglo de dependencias [] vacío
  // Esto hace que el efecto se ejecute UNA SOLA VEZ al montar el componente
  useEffect(() => {
    console.log('Renderizando App, contador:', contador);
    setContador(contador + 1);
  }, []); // ← AQUÍ: array de dependencias vacío

  // Filtra las tareas según el botón elegido
  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'todas') return true;
    // ✅ SOLUCIÓN BUG 3: Comparación correcta con booleano (sin comillas)
    if (filtro === 'completadas') return tarea.completada === true;
    if (filtro === 'pendientes') return tarea.completada === false;
    return true;
  });

  // Agrega una tarea nueva a la lista
  function agregarTarea(texto) {
    if (!texto.trim()) return;
    // ✅ SOLUCIÓN BUG 4: Usar spread operator para crear NUEVO arreglo
    // en vez de mutar el original con push()
    const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false };
    setTareas([...tareas, nuevaTarea]); // ← AQUÍ: spread operator
  }

  // Marca una tarea como completada
  function completarTarea(id) {
    const nuevasTareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: true } : tarea
    );
    setTareas(nuevasTareas);
  }

  return (
    <div className="app">
      <h1>Mis Tareas</h1>

      <div className="filtros">
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('pendientes')}>Pendientes</button>
        <button onClick={() => setFiltro('completadas')}>Completadas</button>
      </div>

      <ul className="lista-tareas">
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
            <span>{tarea.texto}</span>
            {/* ✅ SOLUCIÓN BUG 1: Ahora categoria siempre existe */}
            <span className="categoria">{tarea.categoria.toUpperCase()}</span>
            <button onClick={() => completarTarea(tarea.id)}>✔</button>
          </li>
        ))}
      </ul>

      <AgregarTarea onAgregar={agregarTarea} />
      <PerfilUsuario />
    </div>
  );
}

function AgregarTarea({ onAgregar }) {
  const [texto, setTexto] = useState('');

  function manejarEnvio(e) {
    e.preventDefault();
    onAgregar(texto);
    setTexto('');
  }

  return (
    <form onSubmit={manejarEnvio} className="form-agregar">
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null); // ✅ AGREGADO: Estado para errores

  useEffect(() => {
    obtenerUsuario();
  }, []);

  // Simula una llamada a una API que a veces falla (como pasa en la vida real)
  function obtenerUsuario() {
    const exito = Math.random() > 0.5;

    setTimeout(() => {
      if (exito) {
        setUsuario({ nombre: 'Estudiante React' });
      } else {
        // ✅ SOLUCIÓN BUG 5: Usar try/catch y mostrar error en consola + estado
        try {
          throw new Error('No se pudo cargar el usuario');
        } catch (err) {
          console.error('Error al cargar perfil:', err.message);
          setError(err.message); // ← Guardar el error en estado
        }
      }
    }, 1000);
  }

  if (error) return <p className="perfil" style={{ color: 'red' }}>❌ Error: {error}</p>;
  if (!usuario) return <p className="perfil">Cargando perfil...</p>;

  return <p className="perfil">Perfil: {usuario.nombre}</p>;
}

export default App;
