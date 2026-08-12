# 🐛 TALLER DE DEBUGGING EN REACT - SOLUCIONES COMPLETAS

## 📋 Resumen de los 5 Bugs y cómo los encontré

---

## 🐛 BUG 1: "La app ni siquiera carga" - `undefined.toUpperCase()`

### Síntoma observado:
- Pantalla en blanco o con una superposición roja de error
- El navegador muestra un error en la consola (DevTools → Console)

### Cómo lo encontré:

1. **Abrir DevTools** (F12 o clic derecho → Inspeccionar)
2. **Ir a la pestaña Console** → Allí verás el error rojo:
   ```
   TypeError: Cannot read property 'toUpperCase' of undefined
   ```
3. **Leer la línea del error** - dice algo como:
   ```
   at App.jsx:68
   ```
4. **Ir a esa línea** → Ver el código:
   ```javascript
   <span className="categoria">{tarea.categoria.toUpperCase()}</span>
   ```
5. **Agregar console.log para investigar:**
   ```javascript
   {tareasFiltradas.map((tarea) => {
     console.log('Tarea:', tarea); // ← VER QUÉ DATOS TIENE
     return (
       <li key={tarea.id}>
         ...
       </li>
     );
   })}
   ```
6. **Mirar la consola** → Ver que la tarea con id=4 no tiene propiedad `categoria`:
   ```
   {id: 4, texto: 'Practicar debugging', completada: false}
   // ← Le falta 'categoria'
   ```

### Solución:
Agregar la propiedad `categoria` a la tarea 4:
```javascript
{ id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false }
//                                       ^^^^^^^^^^^^^^^^^^^^ AGREGADA
```

### Explicación en mis palabras:
Cuando React intenta renderizar cada tarea y acceder a `tarea.categoria`, la mayoría tienen ese valor, pero la tarea 4 tiene `undefined` (porque no está definida en el objeto). JavaScript no puede llamar `.toUpperCase()` en `undefined`, así que lanza un error y la app se rompe.

---

## 🐛 BUG 2: "La consola no para de imprimir" - Loop infinito

### Síntoma observado:
- Abrir la consola y ver el mensaje "Renderizando App, contador: X" imprimiéndose infinitamente
- Los números del contador crecen sin parar: 0, 1, 2, 3, 4, 5...

### Cómo lo encontré:

1. **Abrir la consola** (DevTools → Console)
2. **Observar que se imprime sin parar:**
   ```
   Renderizando App, contador: 0
   Renderizando App, contador: 1
   Renderizando App, contador: 2
   Renderizando App, contador: 3
   ... (no termina nunca)
   ```
3. **Identificar qué código imprime esto** → El `console.log` dentro de `useEffect`
4. **Mirar el useEffect:**
   ```javascript
   useEffect(() => {
     console.log('Renderizando App, contador:', contador);
     setContador(contador + 1);
   }); // ← ¡LE FALTA EL ARRAY DE DEPENDENCIAS!
   ```
5. **Comparar con otro useEffect que SÍ funciona bien:**
   ```javascript
   useEffect(() => {
     obtenerUsuario();
   }, []); // ← ESTE TIENE [] (array vacío de dependencias)
   ```

### El ciclo infinito:
```
1. Componente renderiza → useEffect se ejecuta
2. useEffect llama setContador(contador + 1)
3. Estado cambia → Componente se vuelve a renderizar
4. Ir al paso 1... INFINITAMENTE
```

### Solución:
Agregar `[]` como segundo argumento de `useEffect`:
```javascript
useEffect(() => {
  console.log('Renderizando App, contador:', contador);
  setContador(contador + 1);
}, []); // ← ARRAY VACÍO = ejecutar UNA SOLA VEZ al montar
```

### Explicación en mis palabras:
El arreglo de dependencias `[]` le dice a React "ejecuta este efecto solo una vez cuando el componente se monta". Sin él, React ejecuta el efecto después de CADA render. Como el efecto cambia el estado con `setContador`, causa otro render... que ejecuta el efecto de nuevo... que causa otro render... infinitamente.

---

## 🐛 BUG 3: "Los filtros no funcionan" - Comparación de tipos incorrecta

### Síntoma observado:
- Los botones "Pendientes" y "Completadas" se presionan pero la lista queda vacía
- El botón "Todas" sí funciona

### Cómo lo encontré:

1. **Presionar el botón "Completadas"** y ver que no muestra las tareas completadas
2. **Abrir la consola y agregar un console.log en el filtro:**
   ```javascript
   const tareasFiltradas = tareas.filter((tarea) => {
     if (filtro === 'todas') return true;
     
     // ← AGREGAR AQUÍ:
     console.log('Tarea:', tarea.id, 'completada:', tarea.completada, 'tipo:', typeof tarea.completada);
     
     if (filtro === 'completadas') return tarea.completada === 'true';
     if (filtro === 'pendientes') return tarea.completada === 'false';
     return true;
   });
   ```
3. **Mirar la consola** y ver:
   ```
   Tarea: 1 completada: false tipo: boolean
   Tarea: 2 completada: true tipo: boolean
   Tarea: 3 completada: false tipo: boolean
   Tarea: 4 completada: false tipo: boolean
   ```
4. **Darse cuenta:** `completada` es un `boolean` (true/false), NO un string ("true"/"false")
5. **Ver el código del filtro:**
   ```javascript
   if (filtro === 'completadas') return tarea.completada === 'true'; // ← 'true' es STRING!
   if (filtro === 'pendientes') return tarea.completada === 'false'; // ← 'false' es STRING!
   ```

### Solución:
Cambiar las comparaciones de strings a booleanos:
```javascript
// ANTES (MAL):
if (filtro === 'completadas') return tarea.completada === 'true';
if (filtro === 'pendientes') return tarea.completada === 'false';

// DESPUÉS (BIEN):
if (filtro === 'completadas') return tarea.completada === true;
if (filtro === 'pendientes') return tarea.completada === false;
```

### Prueba de por qué falla:
```javascript
// En JavaScript:
true === 'true'   // ❌ false (no son iguales)
true === true     // ✅ true (sí son iguales)
```

### Explicación en mis palabras:
En JavaScript, `true` (boolean) y `"true"` (string) son diferentes tipos de datos. Cuando comparamos `tarea.completada === 'true'` estamos pidiendo "¿es el valor true igual al texto 'true'?". La respuesta siempre es no, porque uno es boolean y otro es string.

---

## 🐛 BUG 4: "Agregar una tarea no la muestra" - Mutación de estado

### Síntoma observado:
- Escribir una tarea nueva en el input
- Presionar "Agregar"
- La tarea se agrega al backend/estado... pero NO aparece en pantalla
- Si recargamos la página, la tarea tampoco está (porque nunca se guardó realmente)

### Cómo lo encontré:

1. **Agregar console.log ANTES y DESPUÉS de agregar:**
   ```javascript
   function agregarTarea(texto) {
     if (!texto.trim()) return;
     
     console.log('ANTES:', tareas.length); // ← ANTES
     
     tareas.push({ id: Date.now(), texto, categoria: 'general', completada: false });
     setTareas(tareas);
     
     console.log('DESPUÉS:', tareas.length); // ← DESPUÉS
   }
   ```
2. **Abrir la consola y agregar una tarea**
3. **Ver que el length SÍ cambió:**
   ```
   ANTES: 4
   DESPUÉS: 5
   ```
4. **Pero la pantalla sigue mostrando 4 tareas** → React no se enteró del cambio

### El problema - Mutación del estado:
```javascript
// ESTO ES MAL:
tareas.push(...);  // ← Modifica el array ORIGINAL en memoria
setTareas(tareas); // ← Le pasamos el MISMO objeto (solo la referencia cambió)

// React compara referencias:
const viejoArray = [1, 2, 3];
const nuevoArray = viejoArray;
nuevoArray.push(4); // ahora es [1, 2, 3, 4]

viejoArray === nuevoArray // ✅ true (¡es el MISMO objeto!)
// Por eso React piensa que nada cambió
```

### Solución:
Crear un NUEVO arreglo usando el spread operator:
```javascript
function agregarTarea(texto) {
  if (!texto.trim()) return;
  
  const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false };
  
  // CREAR NUEVO ARRAY (no mutar el viejo):
  setTareas([...tareas, nuevaTarea]); // ← Spread operator
}
```

### Por qué funciona:
```javascript
const viejoArray = [1, 2, 3];
const nuevoArray = [...viejoArray, 4]; // Crea NUEVO array [1, 2, 3, 4]

viejoArray === nuevoArray // ❌ false (son DIFERENTES objetos)
// React ve que es un objeto nuevo y actualiza la pantalla ✅
```

### Explicación en mis palabras:
React compara la REFERENCIA de los objetos (no su contenido). Cuando usamos `push()`, modificamos el array original pero la referencia sigue siendo la misma, así que React piensa "esto no cambió, no renderizo". Cuando usamos el spread operator `[...tareas, nuevaTarea]`, creamos un NUEVO array, una NUEVA referencia, y React se da cuenta: "¡esto es diferente! Necesito actualizar la pantalla".

---

## 🐛 BUG 5: "Cargando perfil..." se queda pegado - Error no controlado

### Síntoma observado:
- Recargar la página varias veces (50% de probabilidad)
- En algunos casos, la sección de perfil se queda en "Cargando perfil..." por siempre
- En la consola hay un error rojo:
  ```
  Uncaught Error: No se pudo cargar el usuario
  ```

### Cómo lo encontré:

1. **Recargar la página varias veces** (F5)
2. **Cuando se queda pegado, abrir la consola** → Ver el error rojo:
   ```
   Uncaught Error: No se pudo cargar el usuario
       at obtenerUsuario (App.jsx:...)
   ```
3. **Leer el código de `obtenerUsuario`:**
   ```javascript
   function obtenerUsuario() {
     const exito = Math.random() > 0.5;
     setTimeout(() => {
       if (exito) {
         setUsuario({ nombre: 'Estudiante React' });
       } else {
         throw new Error('No se pudo cargar el usuario'); // ← LANZAR ERROR SIN ATRAPAR
       }
     }, 1000);
   }
   ```
4. **Entender que:**
   - No hay `try/catch` para atrapar el error
   - No hay `console.error` para avisar en la consola
   - No hay estado para guardar el error
   - El UI se queda en "Cargando profil..." para siempre

### Solución:
Usar `try/catch` y mostrar el error:
```javascript
function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null); // ← AGREGADO

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
          console.error('Error al cargar perfil:', err.message); // ← AVISAR EN CONSOLA
          setError(err.message); // ← GUARDAR EN ESTADO
        }
      }
    }, 1000);
  }

  // MOSTRAR EL ERROR EN PANTALLA:
  if (error) return <p className="perfil" style={{ color: 'red' }}>❌ Error: {error}</p>;
  if (!usuario) return <p className="perfil">Cargando perfil...</p>;

  return <p className="perfil">Perfil: {usuario.nombre}</p>;
}
```

### Explicación en mis palabras:
Sin `try/catch`, cuando el error se lanza dentro de un `setTimeout`, JavaScript no lo maneja correctamente y la app queda en un estado inconsistente. El usuario no entiende qué pasó. Al usar `try/catch`, ATRAPAMOS el error y lo guardamos en el estado, permitiendo mostrar un mensaje claro en pantalla como "❌ Error: No se pudo cargar el usuario" en lugar de quedarse en "Cargando...".

---

## 📊 Resumen comparativo

| Bug | Tipo | Síntoma | Causa | Solución |
|-----|------|---------|-------|----------|
| 1 | Datos incompletos | Pantalla en blanco + error rojo | Propiedad `categoria` falta en un objeto | Agregar `categoria: 'estudio'` |
| 2 | Hook mal usado | Console imprime infinitamente | `useEffect` sin array de dependencias | Agregar `[]` como 2º argumento |
| 3 | Tipo de dato incorrecto | Filtros no funcionan | Comparar boolean con string | Cambiar `=== 'true'` a `=== true` |
| 4 | Mutación de estado | Estado cambia pero UI no | Usar `push()` en lugar de spread | Usar `[...array, elemento]` |
| 5 | Error no manejado | "Cargando..." se queda pegado | `throw` sin `try/catch` | Agregar `try/catch` y guardar error en estado |

---

## 🛠️ Herramientas de debugging usadas:

1. ✅ **DevTools Console** (F12) - Ver errores y console.log
2. ✅ **Console.log()** - Imprimir valores para investigar
3. ✅ **Typeof** - Verificar tipos de datos
4. ✅ **DevTools Sources** - Poner breakpoints y pausar ejecución
5. ✅ **Error messages** - Leer mensajes de error completos

---

## 💡 Lecciones clave de debugging en React:

1. **Lee el error completo** - Te dice línea y archivo exacto
2. **Usa console.log estratégicamente** - Antes/después de cambios, dentro de loops/filtros
3. **Verifica tipos de datos** - Usa `typeof` y `console.table()`
4. **Entiende las dependencias de useEffect** - `[]` = una vez, `[var]` = cuando var cambia, nada = siempre
5. **Nunca mutes el estado directamente** - Siempre crea nuevas referencias con spread operator
6. **Controla los errores** - Usa try/catch y muestra mensajes al usuario
7. **Usa las DevTools** - Sources para breakpoints, Network para APIs, Console para logs

---

## ✅ Verificación final:

Después de aplicar todas las soluciones:
- ✅ La app carga sin errores
- ✅ La consola no imprime infinitamente
- ✅ Los filtros "Pendientes" y "Completadas" funcionan
- ✅ Agregar nuevas tareas las muestra inmediatamente en la lista
- ✅ El perfil se carga correctamente o muestra un error claro en pantalla
