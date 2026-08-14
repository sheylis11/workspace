# Taller: useEffect y Ciclo de Vida en React - Solución Completa

## 📋 Resumen del Proyecto
Este es el taller completo sobre `useEffect` y el ciclo de vida de componentes React, con 4 bugs intencionales identificados, corregidos y documentados.

---

## 🎯 Objetivos Alcanzados

1. ✅ Explicar las tres fases del ciclo de vida: montaje, actualización y desmontaje
2. ✅ Predecir cuándo se ejecuta `useEffect` según dependencias
3. ✅ Reconocer y corregir 4 bugs clásicos de `useEffect`
4. ✅ Usar `console.log` para visualizar el ciclo de vida
5. ✅ Crear y deployar el proyecto con git

---

## 🐛 BUGS CORREGIDOS

### 🐛 BUG 1 — El reloj sigue corriendo aunque lo oculten

**Comportamiento observado:**
Al hacer clic en "Ocultar reloj", el componente desaparece pero en la consola los logs de "tick" siguen apareciendo cada segundo.

**Console.log de confirmación:**
```javascript
// Se observaba:
⏰ Reloj montado
tick, segundos: 1
tick, segundos: 2
// [Usuario oculta el reloj]
tick, segundos: 3  // ❌ Sigue apareciendo (BUG)
```

**Causa raíz:**
El efecto no tenía una función de cleanup que detuviera el intervalo al desmontar. Sin ella, el intervalo seguía ejecutándose en memoria (memory leak).

**Corrección aplicada:**
```javascript
useEffect(() => {
  console.log('⏰ Reloj montado');
  const id = setInterval(() => {
    setSegundos((s) => {
      console.log('tick, segundos:', s + 1);
      return s + 1;
    });
  }, 1000);
  return () => clearInterval(id);  // ✅ CLEANUP AGREGADO
}, []);
```

**Fase del ciclo de vida:**
**Desmontaje** - El cleanup se ejecuta cuando el componente se desmonta, evitando memory leaks.

---

### 🐛 BUG 2 — El contador automático se queda pegado en 1

**Comportamiento observado:**
El contador en pantalla sube a 1 y no avanza más, quedando "pegado". La consola sigue imprimiendo un mensaje cada segundo.

```
Contador en pantalla: 1 (nunca cambia)
Consola: "El contador según el efecto es: 0" (repetido cada segundo)
```

**Console.log de confirmación:**
```javascript
console.log('Valor en pantalla:', contador);
console.log('El contador según el efecto es:', contador);
// Resultado: siempre muestra 0, aunque el estado real sea mayor
```

**Causa raíz:**
**Stale closure** (closure obsoleta) - El efecto capturó el valor de `contador = 0` cuando fue creado y nunca lo actualizó. Con dependencias vacías `[]`, el efecto solo se crea una vez, atrapando ese valor para siempre.

**Corrección aplicada:**
```javascript
useEffect(() => {
  const id = setInterval(() => {
    // ❌ En lugar de: setContador(contador + 1)
    // ✅ Usar forma funcional:
    setContador((c) => c + 1);  // Recibe el valor ACTUAL
  }, 1000);
  return () => clearInterval(id);
}, []);
```

**Por qué funciona:**
`(c) => c + 1` recibe el valor actual del contador directamente del estado, no de la closure. React se encarga de pasar siempre el valor más reciente.

**Fase del ciclo de vida:**
**Actualización** - El closure "recuerda" el valor antiguo y no reacciona a cambios de estado.

---

### 🐛 BUG 3 — El ancho de ventana duplica los mensajes

**Comportamiento observado:**
Redimensionar la ventana la primera vez imprime un mensaje. La segunda vez imprime el mensaje DOS veces. La tercera vez, TRES veces.

```
[Redimensionar por 1ª vez]
"Resize detectado, ancho: 1200"

[Redimensionar por 2ª vez]
"Resize detectado, ancho: 1100"
"Resize detectado, ancho: 1100"  // ❌ Se repite DOS VECES

[Redimensionar por 3ª vez]
"Resize detectado, ancho: 1000"
"Resize detectado, ancho: 1000"
"Resize detectado, ancho: 1000"  // ❌ Se repite TRES VECES
```

**Causa raíz:**
El arreglo de dependencias era `[ancho]`, causando que el efecto se re-ejecutara cada vez que `ancho` cambiaba. Cada re-ejecución agregaba UN NUEVO listener sin quitar el anterior. Con 3 cambios = 3 listeners acumulados.

**Corrección aplicada:**
```javascript
useEffect(() => {
  function manejarResize() {
    console.log('Resize detectado, ancho:', window.innerWidth);
    setAncho(window.innerWidth);
  }
  window.addEventListener('resize', manejarResize);
  
  // ✅ El cleanup remueve el listener ANTES de agregar uno nuevo
  return () => window.removeEventListener('resize', manejarResize);
}, []);  // ✅ Dependencias vacías: solo se ejecuta al montar
```

**Relación con el cleanup:**
El cleanup se ejecuta tanto al desmontar como justo antes de que el efecto se repita, previniendo la acumulación de listeners.

**Fase del ciclo de vida:**
**Montaje + Limpieza** - El efecto solo se ejecuta una vez y el cleanup previene acumulación.

---

### 🐛 BUG 4 — El nombre no cambia al elegir otro usuario

**Comportamiento observado:**
Los botones "Usuario 1" y "Usuario 2" cambian de estado visual, pero el nombre en pantalla nunca se actualiza. Siempre muestra "Ana" (Usuario 1).

```
[Pantalla inicial]
"Nombre: Ana"

[Haz clic en "Usuario 2"]
"Nombre: Ana"  // ❌ Sigue mostrando Ana
```

**Console.log de confirmación:**
```javascript
useEffect(() => {
  console.log('Buscando datos del usuario', id);  // ¿Se imprime al cambiar?
}, []);
```

**Resultado:** El log solo aparece UNA VEZ al montar. Al cambiar de usuario, nunca reaparece.

**Causa raíz:**
El efecto usaba la prop `id`, pero no la incluía en el arreglo de dependencias. React no sabía que debía re-ejecutar el efecto cuando `id` cambiaba.

**Corrección aplicada:**
```javascript
useEffect(() => {
  console.log('Buscando datos del usuario', id);
  const nombres = { 1: 'Ana', 2: 'Luis' };
  setNombre(nombres[id]);
}, [id]);  // ✅ Agregado: id en dependencias
```

**Por qué funciona:**
React ahora compara el valor anterior de `id` con el nuevo. Si son distintos, ejecuta el efecto de nuevo, obteniendo los datos del usuario correcto.

**Fase del ciclo de vida:**
**Actualización** - El efecto debe ejecutarse cada vez que cambia `id`.

---

## 📊 Experimento Guiado: Las Tres Fases

### Configuración inicial con `[clics]`
```javascript
useEffect(() => {
  if (esPrimeraVez.current) {
    console.log('🟢 MONTADO');
    esPrimeraVez.current = false;
  } else {
    console.log('🔵 ACTUALIZADO, clics:', clics);
  }
  return () => console.log('🔴 LIMPIEZA');
}, [clics]);
```

**Secuencia de logs:**
- Carga inicial: `🟢 MONTADO`
- Clic 1: `🔴 LIMPIEZA` → `🔵 ACTUALIZADO, clics: 1`
- Clic 2: `🔴 LIMPIEZA` → `🔵 ACTUALIZADO, clics: 2`

### Variante: Cambiar a `[]`
```javascript
}, []);
```

**Resultado:**
- Carga: `🟢 MONTADO`
- Clics: Nada (el efecto no se repite)
- Desmontaje: `🔴 LIMPIEZA`

**Conclusión:** Las dependencias controlan cuándo se repite el efecto.

### Variante: Sin arreglo de dependencias
```javascript
useEffect(() => { ... });
```

**Resultado:**
- Se ejecuta en CADA render
- Caos de `🔴 LIMPIEZA` y `🔵 ACTUALIZADO` repetidos

**Conclusión:** Sin especificar dependencias, es un bug lento.

---

## 📂 CÓDIGO FUENTE

### `src/App.jsx` (Código Final)
```javascript
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

  useEffect(() => {
    const id = setInterval(() => {
      setContador((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Contador: {contador}</p>;
}

function RastreadorVentana() {
  const [ancho, setAncho] = useState(window.innerWidth);

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
```

### `src/App.css` (Estilos)
```css
.app {
  max-width: 560px;
  margin: 40px auto;
  padding: 24px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

h1 {
  margin-top: 0;
  color: #1f2937;
}

section {
  border-top: 1px solid #e5e7eb;
  padding: 16px 0;
}

section:first-of-type {
  border-top: none;
}

h2 {
  font-size: 15px;
  color: #6366f1;
  margin: 0 0 10px;
}

button {
  padding: 8px 14px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
}

button:hover {
  background: #e5e7eb;
}

.botones-usuario {
  margin-bottom: 8px;
}

p {
  color: #374151;
}
```

---

## 📝 LECCIONES CLAVE APRENDIDAS

| Concepto | Explicación | Ejemplo |
|----------|---|---|
| **Cleanup obligatorio** | Para listeners, timers, suscripciones. Sin él, memory leaks. | `return () => clearInterval(id)` |
| **Stale closure** | Cuando un efecto "congela" variables. Usa forma funcional. | `setContador((c) => c + 1)` |
| **Dependencias vacías** | Significa "solo al montar", no "sin dependencias". | `useEffect(..., [])` |
| **Re-ejecución** | El efecto se repite si una dependencia cambia. | `useEffect(..., [id])` |
| **Cleanup timing** | Se ejecuta antes de la próxima ejecución Y al desmontar. | Evita listeners duplicados |

---

## ✅ ENTREGABLE COMPLETADO

- ✅ 4 bugs identificados, corregidos y documentados
- ✅ Código funcionando correctamente en React + Vite
- ✅ Console.logs agregados para visualizar el ciclo de vida
- ✅ Proyecto creado desde cero en terminal
- ✅ Commit y push realizado a GitHub

**Comando final utilizado:**
```bash
git add .
git commit -m "chill de cojones"
git push
```

---

## 🎓 CONCLUSIÓN

Este taller demuestra que entender el ciclo de vida de `useEffect` es fundamental para:
- Evitar memory leaks y bugs silenciosos
- Usar correctamente las dependencias
- Implementar cleanup cuando sea necesario
- Diagnosticar problemas con `console.log`

**Tiempo invertido:** ~90-120 minutos ✓
**Nivel de dominio:** Intermedio → Avanzado ✓
