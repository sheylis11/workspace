import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [mostrarReloj, setMostrarReloj] = useState(true);
  const [usuarioId, setUsuarioId] = useState(1);

  return (
    <div className="app">
      <h1>useEffect y Ciclo de Vida</h1>

      <section>
        <h2>1. Reloj</h2>
        <button onClick={() => setMostrarReloj(!mostrarReloj)}>
          {mostrarReloj ? 'Ocultar reloj' : 'Mostrar reloj'}
        </button>
        {mostrarReloj && <Reloj />}
      </section>

      <section>
        <h2>2. Contador automático</h2>
        <ContadorAutomatico />
      </section>

      <section>
        <h2>3. Ancho de ventana</h2>
        <RastreadorVentana />
      </section>

      <section>
        <h2>4. Perfil de usuario</h2>
        <div className="botones-usuario">
          <button onClick={() => setUsuarioId(1)}>Usuario 1</button>
          <button onClick={() => setUsuarioId(2)}>Usuario 2</button>
        </div>
        <PerfilUsuario id={usuarioId} />
      </section>

      <section>
        <h2>5. Experimento: fases del ciclo de vida</h2>
        <ExperimentoFases />
      </section>
    </div>
  );
}

function Reloj() {
  const [segundos, setSegundos] = useState(0);

  // ✅ BUG 1 CORREGIDO — Se agregó el cleanup que cancela el setInterval
  // cuando el componente se desmonta. Ahora los logs de "tick" paran
  // cuando se oculta el reloj, evitando memory leaks.
  useEffect(() => {
    console.log('⏰ Reloj montado');
    const id = setInterval(() => {
      setSegundos((s) => {
        console.log('tick, segundos:', s + 1);
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Segundos: {segundos}</p>;
}

function ContadorAutomatico() {
  const [contador, setContador] = useState(0);

  // ✅ BUG 2 CORREGIDO — Se cambió a la forma funcional setContador(c => c + 1)
  // para evitar la "stale closure". Ahora el contador siempre recibe el valor
  // actual (c) sin depender de lo que había cuando se creó el efecto.
  // Alternativa: agregar 'contador' a dependencias y limpiar el intervalo cada vez.
  useEffect(() => {
    const id = setInterval(() => {
      console.log('El contador está siendo actualizado correctamente');
      setContador((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Contador: {contador}</p>;
}

function RastreadorVentana() {
  const [ancho, setAncho] = useState(window.innerWidth);

  // ✅ BUG 3 CORREGIDO — Se quitó 'ancho' de las dependencias y se agregó
  // el cleanup que remueve el listener. Ahora solo hay UN listener, no se
  // duplican. El efecto se ejecuta una sola vez al montar (dependencias vacías).
  useEffect(() => {
    function manejarResize() {
      console.log('Resize detectado, ancho:', window.innerWidth);
      setAncho(window.innerWidth);
    }
    window.addEventListener('resize', manejarResize);
    return () => window.removeEventListener('resize', manejarResize);
  }, []);

  return <p>Ancho actual: {ancho}px</p>;
}

function PerfilUsuario({ id }) {
  const [nombre, setNombre] = useState('');

  // ✅ BUG 4 CORREGIDO — Se agregó 'id' al arreglo de dependencias.
  // Ahora el efecto se ejecuta cada vez que cambia el id (cuando cambias de usuario),
  // actualizando el nombre correctamente. Sin esto, solo se ejecutaba una vez al montar.
  useEffect(() => {
    console.log('Buscando datos del usuario', id);
    const nombres = { 1: 'Ana', 2: 'Luis' };
    setNombre(nombres[id]);
  }, [id]);

  return <p>Nombre: {nombre}</p>;
}

function ExperimentoFases() {
  const [clics, setClics] = useState(0);
  const esPrimeraVez = useRef(true);

  // Este componente no tiene ningún bug: es para experimentar cambiando
  // el arreglo de dependencias (ver Parte 4 de la guía) y observar
  // cuándo se ejecuta cada log.
  useEffect(() => {
    if (esPrimeraVez.current) {
      console.log('🟢 MONTADO');
      esPrimeraVez.current = false;
    } else {
      console.log('🔵 ACTUALIZADO, clics:', clics);
    }

    return () => {
      console.log('🔴 LIMPIEZA (antes del próximo efecto, o al desmontar)');
    };
  }, [clics]);

  return (
    <div>
      <p>Clics: {clics}</p>
      <button onClick={() => setClics(clics + 1)}>Clickeame</button>
    </div>
  );
}

export default App;
