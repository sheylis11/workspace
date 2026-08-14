import { useState, useEffect } from 'react';
import './App.css';

// ============================================================================
// 🐛 BUG 1: "La app ni siquiera carga" - undefined.toUpperCase()
// ============================================================================
// Cómo lo encontré:
//   1. Abrí DevTools (F12) → Console y vi un error rojo
//   2. El error decía: "TypeError: Cannot read property 'toUpperCase' of undefined"
//   3. Hice console.log() en el map para ver qué datos tenía cada tarea
//   4. Descubrí que la tarea 4 NO tenía la propiedad 'categoria' 
//   5. Cuando React intentaba hacer tarea.categoria.toUpperCase(), ¡la categoría era undefined!
//
// La solución: Agregar 'categoria' a TODAS las tareas
// ============================================================================

const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  { id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false }, // ✅ AGREGUÉ ESTA PROPIEDAD
];

function App() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [filtro, setFiltro] = useState('todas');
  const [contador, setContador] = useState(0);

  // ============================================================================
  // 🐛 BUG 2: "La consola no para de imprimir" - Loop infinito en useEffect
  // ============================================================================
  // Cómo lo encontré:
  //   1. Abrí la consola (F12) y vi el mensaje "Renderizando App, contador: X" repetido
  //   2. Los números crecían infinitamente: 0, 1, 2, 3, 4, 5... 😱
  //   3. Identifiqué que venía del console.log() dentro de un useEffect
  //   4. Vi que el useEffect NO TENÍA array de dependencias []
  //   5. Comparé con otro useEffect que SÍ funcionaba bien (el de PerfilUsuario)
  //   6. Me di cuenta: sin [], React ejecuta el efecto después de CADA render
  //   7. El efecto llama setContador(contador + 1) → causa otro render → ejecuta el efecto nuevamente
  //   8. ¡¡INFINITO!!
  //
  // La solución: Agregar [] como segundo parámetro
  // El [] vacío significa "ejecuta este efecto UNA SOLA VEZ al montar el componente"
  // ============================================================================
  useEffect(() => {
    console.log('Renderizando App, contador:', contador);
    setContador(contador + 1);
  }, []); // ← AQUÍ ESTÁ LA SOLUCIÓN: array de dependencias vacío

  // Filtra las tareas según el botón elegido
  // ============================================================================
  // 🐛 BUG 3: "Los filtros no funcionan" - Comparación de tipos incorrecta
  // ============================================================================
  // Cómo lo encontré:
  //   1. Presioné el botón "Completadas" y vací... lista vacía ❌
  //   2. Presioné "Pendientes" y también lista vacía ❌
  //   3. Solo "Todas" funcionaba ✅
  //   4. Agregué console.log() dentro del filter para ver qué pasaba:
  //      console.log('completada:', tarea.completada, 'tipo:', typeof tarea.completada)
  //   5. Vi en la consola: "completada: true tipo: boolean"
  //   6. PERO en el código estaba comparando con strings: `=== 'true'` y `=== 'false'`
  //   7. En JavaScript: true !== 'true' (son tipos diferentes)
  //        → boolean true ≠ string 'true'
  //        → boolean false ≠ string 'false'
  //   8. Por eso NUNCA coincidían y la lista siempre estaba vacía
  //
  // La solución: Comparar booleans con booleans (sin las comillas)
  // ============================================================================
  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'todas') return true;
    // ✅ AQUÍ ESTÁ LA SOLUCIÓN: Comparar boolean === boolean (sin comillas)
    if (filtro === 'completadas') return tarea.completada === true;
    if (filtro === 'pendientes') return tarea.completada === false;
    return true;
  });

  // Agrega una tarea nueva a la lista
  // ============================================================================
  // 🐛 BUG 4: "Agregar una tarea no la muestra" - Mutación de estado
  // ============================================================================
  // Cómo lo encontré:
  //   1. Escribí una tarea nueva y presioné "Agregar"
  //   2. El input se limpió (parecía que funcionó) pero la tarea NO apareció
  //   3. Agregué console.log ANTES y DESPUÉS:
  //      console.log('ANTES:', tareas.length);
  //      tareas.push(...);
  //      console.log('DESPUÉS:', tareas.length);
  //   4. La consola mostró: ANTES: 4, DESPUÉS: 5 (¡sí cambió el tamaño!)
  //   5. PERO la pantalla seguía mostrando solo 4 tareas
  //   6. Entendí: usaba tareas.push() que MODIFICA el array original
  //   7. React compara referencias (no el contenido):
  //      - tareas.push() modifica el array pero la REFERENCIA sigue siendo la misma
  //      - React piensa: "este es el mismo objeto, no cambió nada" → no re-renderiza
  //   8. Miré el código del completarTarea() que SÍ funcionaba:
  //      - Usaba spread operator [...tareas] para crear UN NUEVO array
  //      - Nueva referencia = React lo detecta = re-renderiza
  //
  // La solución: Usar spread operator [...tareas, nuevaTarea] 
  // Esto crea un NUEVO array, una NUEVA referencia, y React se da cuenta: "¡esto cambió!"
  // ============================================================================
  function agregarTarea(texto) {
    if (!texto.trim()) return;
    // ✅ AQUÍ ESTÁ LA SOLUCIÓN: Usar spread operator para crear NUEVO array
    // en lugar de usar push() que MUTA el array original
    const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false };
    setTareas([...tareas, nuevaTarea]); // ← Spread operator = nueva referencia = React se da cuenta
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
            {/* ✅ BUG 1 RESUELTO: Ahora categoria SIEMPRE existe gracias a que todas las tareas la tienen */}
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
  // ============================================================================
  // 🐛 BUG 5: "Cargando perfil..." se queda pegado - Error no manejado
  // ============================================================================
  // Cómo lo encontré:
  //   1. Recargué la página VARIAS veces (F5, F5, F5...)
  //   2. A veces funcionaba bien, a veces se quedaba pegado en "Cargando perfil..."
  //   3. Abrí la consola (F12) y vi un error rojo:
  //      "Uncaught Error: No se pudo cargar el usuario"
  //   4. El problema: el código lanzaba throw new Error() pero sin try/catch
  //   5. Sin try/catch, cuando ocurría el error dentro del setTimeout:
  //      - JavaScript lanzaba el error pero nadie lo atrapaba
  //      - El componente se quedaba en estado inconsistente
  //      - El UI mostraba "Cargando profil..." para siempre porque setError nunca se ejecutaba
  //   6. Vi que no había estado para guardar los errores
  //   7. Comparé con buen manejo de errores: necesitaba:
  //      ✅ Un estado para guardar el error
  //      ✅ Un try/catch para ATRAPAR el error
  //      ✅ Avisar en consola con console.error()
  //      ✅ Mostrar el error en pantalla
  //
  // La solución: 
  //   1. Agregar estado de error
  //   2. Envolver el throw en try/catch
  //   3. Mostrar el error en UI en lugar de quedarse en "Cargando..."
  // ============================================================================
  const [error, setError] = useState(null);

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
        // ✅ BUG 5 RESUELTO: 
        // Atrapar el error con try/catch, avisar en consola, y guardarlo en estado
        // Ahora el usuario verá un mensaje claro en lugar de quedarse esperando
        try {
          throw new Error('No se pudo cargar el usuario');
        } catch (err) {
          console.error('Error al cargar perfil:', err.message);
          setError(err.message); // ← Guardar en estado para mostrar en UI
        }
      }
    }, 1000);
  }

  if (error) return <p className="perfil" style={{ color: 'red' }}>❌ Error: {error}</p>;
  if (!usuario) return <p className="perfil">Cargando perfil...</p>;

  return <p className="perfil">Perfil: {usuario.nombre}</p>;
}

export default App;
