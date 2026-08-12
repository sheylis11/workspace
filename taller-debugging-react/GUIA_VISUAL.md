# 🔍 GUÍA VISUAL: CÓMO ENCONTRAR CADA BUG

---

## 🐛 BUG 1: `tarea.categoria` es `undefined`

### 1️⃣ Lo primero que ves en pantalla:
```
(Pantalla en blanco o con error rojo)
```

### 2️⃣ Abres DevTools (F12) → Pestaña CONSOLE:
```
TypeError: Cannot read property 'toUpperCase' of undefined
    at App.jsx:68:51
```

### 3️⃣ Vas a la línea 68 en App.jsx:
```javascript
<span className="categoria">{tarea.categoria.toUpperCase()}</span>
                             ^^^^^^^^^^^^^^^^
                             Esto es undefined en alguna tarea
```

### 4️⃣ Investigas con console.log:
```javascript
{tareasFiltradas.map((tarea) => {
  console.log('📌 Tarea:', tarea);  // ← Mira qué datos tiene
  return (
    <li key={tarea.id}>
      ...
    </li>
  );
})}
```

### 5️⃣ En la CONSOLE ves:
```
📌 Tarea: {id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false}
📌 Tarea: {id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true}
📌 Tarea: {id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false}
📌 Tarea: {id: 4, texto: 'Practicar debugging', completada: false}
         ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ ¡LE FALTA 'categoria'!
```

### 6️⃣ Solución:
```javascript
const tareasIniciales = [
  // ...
  { id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false }
  //                                     ✅ AGREGADO
];
```

---

## 🐛 BUG 2: Loop infinito con `useEffect`

### 1️⃣ Lo primero que ves:
```
Abrimos la consola y vemos mensajes apareciendo continuamente...
```

### 2️⃣ En la CONSOLE ves esto:
```
Renderizando App, contador: 0
Renderizando App, contador: 1
Renderizando App, contador: 2
Renderizando App, contador: 3
Renderizando App, contador: 4
Renderizando App, contador: 5
... (no termina nunca)
```

### 3️⃣ Buscas dónde se imprime esto:
```javascript
useEffect(() => {
  console.log('Renderizando App, contador:', contador);
  setContador(contador + 1);  // ← Esto causa otro render
}); // ← ¡LE FALTA EL ARRAY DE DEPENDENCIAS []!
```

### 4️⃣ Comparas con el código que funciona bien:
```javascript
// Este funciona bien:
useEffect(() => {
  obtenerUsuario();
}, []); // ← Tiene array de dependencias


// Este NO funciona:
useEffect(() => {
  console.log('Renderizando App, contador:', contador);
  setContador(contador + 1);
}); // ← No tiene array de dependencias
```

### 5️⃣ Entiendes el ciclo:
```
Render 0 → useEffect ejecuta → setContador(1) → Render 1
Render 1 → useEffect ejecuta → setContador(2) → Render 2
Render 2 → useEffect ejecuta → setContador(3) → Render 3
... INFINITAMENTE
```

### 6️⃣ Solución:
```javascript
useEffect(() => {
  console.log('Renderizando App, contador:', contador);
  setContador(contador + 1);
}, []); // ✅ AGREGADO: Array vacío
```

**Qué hace `[]`:** "Ejecuta este efecto UNA SOLA VEZ al montar el componente, nunca más"

---

## 🐛 BUG 3: Filtros retornan nada

### 1️⃣ Lo primero que ves:
```
Presiono botón "Completadas" → La lista desaparece (vacía)
Presiono botón "Pendientes" → La lista desaparece (vacía)
Presiono botón "Todas" → La lista aparece ✅
```

### 2️⃣ Investigas agregando console.log en el filtro:
```javascript
const tareasFiltradas = tareas.filter((tarea) => {
  if (filtro === 'todas') return true;
  
  // ← AGREGA ESTO:
  console.log(
    'Tarea ID:', tarea.id,
    '| completada:', tarea.completada,
    '| tipo:', typeof tarea.completada
  );
  
  if (filtro === 'completadas') return tarea.completada === 'true';
  if (filtro === 'pendientes') return tarea.completada === 'false';
  return true;
});
```

### 3️⃣ Presionas el filtro "Completadas" y en la CONSOLE ves:
```
Tarea ID: 1 | completada: false | tipo: boolean
Tarea ID: 2 | completada: true  | tipo: boolean
          ↑↑↑↑ boolean (NO string)
Tarea ID: 3 | completada: false | tipo: boolean
Tarea ID: 4 | completada: false | tipo: boolean
```

### 4️⃣ Entiendes el problema:
```javascript
// Estás comparando:
true === 'true'   // ❌ false (NUNCA va a ser verdadero)

// JavaScript:
true        // type: boolean (booleano)
'true'      // type: string (texto)
```

### 5️⃣ Miras el código del filtro:
```javascript
if (filtro === 'completadas') return tarea.completada === 'true';
//                                                         ^^^^^^^ ← STRING!
// Estamos pidiendo: ¿es el boolean true igual al string 'true'?
// Respuesta: NUNCA
```

### 6️⃣ Solución:
```javascript
// ANTES:
if (filtro === 'completadas') return tarea.completada === 'true';   // string
if (filtro === 'pendientes') return tarea.completada === 'false';  // string

// DESPUÉS:
if (filtro === 'completadas') return tarea.completada === true;    // boolean
if (filtro === 'pendientes') return tarea.completada === false;   // boolean
```

---

## 🐛 BUG 4: Agregar tarea no funciona

### 1️⃣ Lo primero que ves:
```
1. Escribo "Ir al gimnasio" en el input
2. Presiono "Agregar"
3. El input se limpia (bien) ✅
4. Pero la tarea NO aparece en la lista ❌
```

### 2️⃣ Investigas con console.log:
```javascript
function agregarTarea(texto) {
  if (!texto.trim()) return;
  
  console.log('📍 Antes de agregar:', tareas.length);
  
  tareas.push({ id: Date.now(), texto, categoria: 'general', completada: false });
  setTareas(tareas);
  
  console.log('📍 Después de agregar:', tareas.length);
}
```

### 3️⃣ En la CONSOLE ves:
```
📍 Antes de agregar: 4
📍 Después de agregar: 5
```

### 4️⃣ El problema:
```
✅ El arreglo SÍ cambió (de 4 a 5)
❌ Pero React NO se entera (pantalla no se actualiza)
```

### 5️⃣ Entiendes por qué:
```javascript
// React compara la REFERENCIA del objeto, no el contenido:

const original = [1, 2, 3];
const mismo = original;
original.push(4);

console.log(original === mismo);  // ✅ true (MISMO objeto)
// React ve: "La referencia es la misma, no cambió nada" ❌

// Vs. crear un nuevo array:
const original2 = [1, 2, 3];
const nuevo = [...original2, 4];

console.log(original2 === nuevo);  // ❌ false (DIFERENTE objeto)
// React ve: "¡Es un objeto nuevo! Necesito renderizar" ✅
```

### 6️⃣ Miras el código:
```javascript
// ANTES (BUG):
tareas.push(...); // ← Modifica el array original
setTareas(tareas); // ← Le pasamos la MISMA referencia

// DESPUÉS (SOLUCIONADO):
setTareas([...tareas, nuevaTarea]); // ← Creamos NUEVO array
//        ^^^^^^^^^^^^^ ← Spread operator = copia + elemento nuevo
```

### 7️⃣ Solución:
```javascript
function agregarTarea(texto) {
  if (!texto.trim()) return;
  
  const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false };
  
  // Crear un NUEVO array usando spread operator:
  setTareas([...tareas, nuevaTarea]);
  //        ^^^^^^^^^^^^^^^^^^^^^^^^^ ← NUEVA REFERENCIA
}
```

---

## 🐛 BUG 5: "Cargando perfil..." se queda pegado

### 1️⃣ Lo primero que ves:
```
Recargo la página F5 muchas veces (5-10 veces)
En algunos casos, la sección de perfil se queda así:
"Cargando perfil..."

Y no cambia nunca ❌
```

### 2️⃣ Cuando ves que se queda pegado, abres CONSOLE:
```
Uncaught Error: No se pudo cargar el usuario
    at obtenerUsuario (App.jsx:...)
```

### 3️⃣ Miras el código de `obtenerUsuario`:
```javascript
function obtenerUsuario() {
  const exito = Math.random() > 0.5;  // 50% probabilidad
  
  setTimeout(() => {
    if (exito) {
      setUsuario({ nombre: 'Estudiante React' });
    } else {
      throw new Error('No se pudo cargar el usuario');
      //   ^^^^^ ← LANZA ERROR SIN ATRAPARLO
    }
  }, 1000);
}
```

### 4️⃣ El problema:
```
✅ 50% de las veces: se carga el usuario (funciona bien)
❌ 50% de las veces: se lanza un error que nadie atrapa
   → La app queda en un estado incorrecto
   → La pantalla dice "Cargando..." pero nunca va a cambiar
```

### 5️⃣ Entiendes que el error está en consola pero:
```javascript
// Usuario no entiende por qué se queda pegado
// Solo los desarrolladores que miran la CONSOLE lo ven
// Necesitamos MOSTRAR el error en la pantalla
```

### 6️⃣ Solución:
```javascript
function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);  // ← NUEVO estado para errores

  useEffect(() => {
    obtenerUsuario();
  }, []);

  function obtenerUsuario() {
    const exito = Math.random() > 0.5;

    setTimeout(() => {
      if (exito) {
        setUsuario({ nombre: 'Estudiante React' });
      } else {
        try {
          throw new Error('No se pudo cargar el usuario');
        } catch (err) {
          // ← ATRAPAMOS el error
          console.error('Error al cargar perfil:', err.message);  // Mostrar en console
          setError(err.message);  // Guardar en estado
        }
      }
    }, 1000);
  }

  // Mostrar el error si existe:
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;
  if (!usuario) return <p>Cargando perfil...</p>;
  return <p>Perfil: {usuario.nombre}</p>;
}
```

---

## 📊 Tabla de síntomas → causas → soluciones

| Síntoma | ¿Dónde mirar? | Causa | Solución |
|---------|---------------|-------|----------|
| Pantalla en blanco + error rojo | Console | Propiedad undefined | Agregar la propiedad |
| Console imprime infinitamente | Console | `useEffect` sin `[]` | Agregar `[]` |
| Filtros no funcionan | Console + `typeof` | Comparar `true` con `'true'` | Cambiar a boolean |
| Agregar elemento no funciona | Console `length` | Mutar array con `push()` | Usar spread operator |
| "Cargando..." se queda pegado | Console error rojo | Error sin `try/catch` | Agregar `try/catch` |

---

## 🎯 Pasos para debuggear cualquier bug en React:

1. **¿Qué falla?** → Observar síntoma
2. **¿Dónde está el error?** → Abrir DevTools Console (F12)
3. **¿Qué dice el error?** → Leer línea y archivo
4. **¿Qué datos hay?** → Agregar `console.log()`
5. **¿Por qué falla?** → Investigar línea sospechosa
6. **¿Cómo se arregla?** → Cambiar código
7. **¿Funciona?** → Verificar que no hay más errores

---

## ✨ Recuerda:

> Los errores en la CONSOLE no son enemigos, son **mensajeros**.
> 
> Te están diciendo: "Oye, hay un problema en la línea X del archivo Y".
> 
> **Lee el mensaje completo, no lo ignores.**
