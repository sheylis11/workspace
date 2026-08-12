# 🐛 RESUMEN RÁPIDO - 5 BUGS SOLUCIONADOS

## Bug 1: `undefined.toUpperCase()` ❌ → Propiedad faltante ✅
```javascript
// ANTES (BUG):
{ id: 4, texto: 'Practicar debugging', completada: false }

// DESPUÉS (SOLUCIONADO):
{ id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false }
//                                      ✅ AGREGADA LA PROPIEDAD
```

**Cómo lo encontré:** Abrí DevTools → Console → Leí el error → Vi que era `undefined.toUpperCase()` → Hice console.log de cada tarea → Vi que la id 4 no tenía `categoria`

---

## Bug 2: Loop infinito en consola ♾️ → Array de dependencias ✅
```javascript
// ANTES (BUG):
useEffect(() => {
  console.log('Renderizando App, contador:', contador);
  setContador(contador + 1);
}); // ← ¡SIN ARRAY DE DEPENDENCIAS!

// DESPUÉS (SOLUCIONADO):
useEffect(() => {
  console.log('Renderizando App, contador:', contador);
  setContador(contador + 1);
}, []); // ← ARRAY VACÍO = ejecutar UNA SOLA VEZ
```

**Cómo lo encontré:** Abrí Console → Noté que se imprime infinitamente → Busqué dónde se imprime → Vi que es en un useEffect → Comparé con otros useEffect que funcionaban bien → Noté que este le faltaba `[]`

---

## Bug 3: Filtros no funcionan ❌ → Comparar tipos correctos ✅
```javascript
// ANTES (BUG):
if (filtro === 'completadas') return tarea.completada === 'true';  // ← STRING 'true'
if (filtro === 'pendientes') return tarea.completada === 'false'; // ← STRING 'false'

// DESPUÉS (SOLUCIONADO):
if (filtro === 'completadas') return tarea.completada === true;   // ← BOOLEAN true
if (filtro === 'pendientes') return tarea.completada === false;  // ← BOOLEAN false
```

**Cómo lo encontré:** Presioné el filtro y no funcionó → Agregué console.log con typeof → Vi que `completada` era `boolean`, no string → Cambié la comparación

---

## Bug 4: Agregar tarea no se ve ❌ → Usar spread operator ✅
```javascript
// ANTES (BUG) - Mutación:
function agregarTarea(texto) {
  if (!texto.trim()) return;
  tareas.push({ id: Date.now(), texto, categoria: 'general', completada: false });
  //    ^^^^ ← MUTAR EL ARRAY ORIGINAL
  setTareas(tareas); // ← React no ve cambio porque es la MISMA referencia
}

// DESPUÉS (SOLUCIONADO) - Crear nuevo array:
function agregarTarea(texto) {
  if (!texto.trim()) return;
  const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false };
  setTareas([...tareas, nuevaTarea]); // ← NUEVO ARRAY = nueva referencia
  //        ^^^^^^^^^^^^^^^^^^^^^^^^^ ← Spread operator
}
```

**Cómo lo encontré:** Agregué console.log antes y después → Vi que `tareas.length` cambiaba → Pero la pantalla no se actualizaba → Entendí que React compara referencias, no contenido → Usé spread operator para crear un nuevo array

---

## Bug 5: "Cargando perfil..." se queda pegado ♾️ → Try/catch + estado ✅
```javascript
// ANTES (BUG) - Error sin controlar:
function obtenerUsuario() {
  const exito = Math.random() > 0.5;
  setTimeout(() => {
    if (exito) {
      setUsuario({ nombre: 'Estudiante React' });
    } else {
      throw new Error('No se pudo cargar el usuario'); // ← SIN ATRAPAR
    }
  }, 1000);
}

// DESPUÉS (SOLUCIONADO) - Error controlado:
const [error, setError] = useState(null); // ← ESTADO PARA ERRORES

function obtenerUsuario() {
  const exito = Math.random() > 0.5;
  setTimeout(() => {
    if (exito) {
      setUsuario({ nombre: 'Estudiante React' });
    } else {
      try {
        throw new Error('No se pudo cargar el usuario');
      } catch (err) {
        console.error('Error al cargar perfil:', err.message); // ← AVISAR
        setError(err.message); // ← GUARDAR EN ESTADO
      }
    }
  }, 1000);
}

// EN EL RENDER:
if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;
if (!usuario) return <p>Cargando perfil...</p>;
```

**Cómo lo encontré:** Recargué varias veces → En algunos casos se quedó pegado → Abrí Console → Vi error rojo "Uncaught Error" → Busqué dónde se lanzaba el error → No había try/catch → Agregué try/catch y un estado para mostrar el error

---

## 📍 Metodología de debugging usada:

1. **Observar el síntoma** - ¿Qué falla exactamente?
2. **Abrir DevTools** - F12 → Mirar Console
3. **Leer el mensaje de error** - Te dice línea, archivo y tipo de error
4. **Agregar console.log** - Antes/después/dentro de la sección sospechosa
5. **Verificar tipos de datos** - `typeof` y `console.table()`
6. **Comparar con código que funciona** - ¿Qué hace diferente?
7. **Aplicar la solución** - Cambiar el código
8. **Verificar** - Que la app funcione correctamente ahora

---

## ✨ Archivos en este taller:

- **src/App.jsx** - Código CON los 5 bugs (para aprender)
- **src/App.css** - Estilos
- **SOLUCION_COMPLETA.jsx** - Código sin bugs (solución final)
- **EXPLICACION_DETALLADA.md** - Este archivo con todas las explicaciones
- **RESUMEN_RAPIDO.md** - Resumen super condensado (este archivo)

---

## 🎯 ¿Cuál es la lección más importante?

> **Lee los mensajes de error completos en la consola.** 
> No son enemigos, son tus mejores amigos. Te dicen exactamente dónde está el problema.
