# 🔀 COMPARACIÓN LADO A LADO - ANTES vs DESPUÉS

Este archivo muestra claramente qué cambió en cada bug.

---

## 🐛 BUG 1: Propiedad `categoria` faltante

### ❌ ANTES (CON BUG)
```javascript
const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  { id: 4, texto: 'Practicar debugging', completada: false },
  //                                     ↑↑↑ LE FALTA 'categoria'
];
```

### ✅ DESPUÉS (SOLUCIONADO)
```javascript
const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  { id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false },
  //                                     ✅ AGREGADA
];
```

### 📍 Cambio exacto
```diff
- { id: 4, texto: 'Practicar debugging', completada: false },
+ { id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false },
```

---

## 🐛 BUG 2: useEffect sin array de dependencias

### ❌ ANTES (CON BUG)
```javascript
useEffect(() => {
  console.log('Renderizando App, contador:', contador);
  setContador(contador + 1);
}); // ← ¡FALTA EL ARRAY DE DEPENDENCIAS!
```

**Resultado:** Se ejecuta después de CADA render → loop infinito

### ✅ DESPUÉS (SOLUCIONADO)
```javascript
useEffect(() => {
  console.log('Renderizando App, contador:', contador);
  setContador(contador + 1);
}, []); // ← ARRAY VACÍO = ejecutar UNA SOLA VEZ
```

**Resultado:** Se ejecuta solo al montar el componente ✅

### 📍 Cambio exacto
```diff
  useEffect(() => {
    console.log('Renderizando App, contador:', contador);
    setContador(contador + 1);
- });
+ }, []);
```

---

## 🐛 BUG 3: Comparación de tipos incorrecta

### ❌ ANTES (CON BUG)
```javascript
const tareasFiltradas = tareas.filter((tarea) => {
  if (filtro === 'todas') return true;
  if (filtro === 'completadas') return tarea.completada === 'true';  // ← STRING
  if (filtro === 'pendientes') return tarea.completada === 'false'; // ← STRING
  return true;
});
```

**Problema:** 
```javascript
true === 'true'   // ❌ false (no son iguales)
false === 'false' // ❌ false (no son iguales)
```

### ✅ DESPUÉS (SOLUCIONADO)
```javascript
const tareasFiltradas = tareas.filter((tarea) => {
  if (filtro === 'todas') return true;
  if (filtro === 'completadas') return tarea.completada === true;   // ← BOOLEAN
  if (filtro === 'pendientes') return tarea.completada === false;  // ← BOOLEAN
  return true;
});
```

**Solución:**
```javascript
true === true     // ✅ true (son iguales)
false === false   // ✅ true (son iguales)
```

### 📍 Cambios exactos
```diff
  if (filtro === 'completadas') return tarea.completada === 'true';
+ if (filtro === 'completadas') return tarea.completada === true;

  if (filtro === 'pendientes') return tarea.completada === 'false';
+ if (filtro === 'pendientes') return tarea.completada === false;
```

---

## 🐛 BUG 4: Mutación de estado con push()

### ❌ ANTES (CON BUG)
```javascript
function agregarTarea(texto) {
  if (!texto.trim()) return;
  
  tareas.push({ id: Date.now(), texto, categoria: 'general', completada: false });
  //   ^^^^ ← MUTAR el array original
  
  setTareas(tareas);
  //        ^^^^^^ ← Pasamos la MISMA referencia (React no se entera del cambio)
}
```

**Resultado:** 
```
✅ El array cambia (de 4 a 5 elementos)
❌ React no renderiza (misma referencia)
❌ Pantalla no se actualiza
```

### ✅ DESPUÉS (SOLUCIONADO)
```javascript
function agregarTarea(texto) {
  if (!texto.trim()) return;
  
  const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false };
  
  setTareas([...tareas, nuevaTarea]);
  //        ^^^^^^^^^^^^^^^^^^^^^^^^ ← NUEVO array (nueva referencia)
}
```

**Resultado:**
```
✅ Array cambia (de 4 a 5 elementos)
✅ Nueva referencia (diferente objeto)
✅ React se entera del cambio
✅ Pantalla se actualiza
```

### 📍 Cambio exacto
```diff
  function agregarTarea(texto) {
    if (!texto.trim()) return;
+   const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false };
-   tareas.push({ id: Date.now(), texto, categoria: 'general', completada: false });
-   setTareas(tareas);
+   setTareas([...tareas, nuevaTarea]);
  }
```

### 🔍 Explicación visual
```
❌ PUSH (NO FUNCIONA):
viejoArray = [1, 2, 3]
viejoArray.push(4)
setTareas(viejoArray)  → Sigue siendo [1, 2, 3, 4] pero la REFERENCIA es la misma
React: "Sigue siendo el mismo objeto, no renderizo" ❌

✅ SPREAD (FUNCIONA):
viejoArray = [1, 2, 3]
nuevoArray = [...viejoArray, 4]  → Nuevo array [1, 2, 3, 4] con NUEVA referencia
setTareas(nuevoArray)
React: "¡Es un objeto nuevo! Renderizo" ✅
```

---

## 🐛 BUG 5: Error no manejado

### ❌ ANTES (CON BUG)
```javascript
function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  // ← FALTA estado para guardar errores

  useEffect(() => {
    obtenerUsuario();
  }, []);

  function obtenerUsuario() {
    const exito = Math.random() > 0.5;
    setTimeout(() => {
      if (exito) {
        setUsuario({ nombre: 'Estudiante React' });
      } else {
        throw new Error('No se pudo cargar el usuario');
        // ↑↑↑ LANZA ERROR SIN ATRAPAR (try/catch)
      }
    }, 1000);
  }

  if (!usuario) return <p className="perfil">Cargando perfil...</p>;
  return <p className="perfil">Perfil: {usuario.nombre}</p>;
}
```

**Resultado cuando falla (50%):**
```
❌ Console muestra: "Uncaught Error: No se pudo cargar el usuario"
❌ Pantalla se queda en "Cargando perfil..." para siempre
❌ Usuario no entiende qué pasó
```

### ✅ DESPUÉS (SOLUCIONADO)
```javascript
function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  // ↑ NUEVO: Estado para guardar errores

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
          // ↑ NUEVO: try/catch para atrapar el error
          throw new Error('No se pudo cargar el usuario');
        } catch (err) {
          // ↑ NUEVO: Atrapar y guardar el error
          console.error('Error al cargar perfil:', err.message);
          setError(err.message);
          // ↑ NUEVO: Guardar en estado
        }
      }
    }, 1000);
  }

  // ↑ NUEVO: Mostrar error si existe
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;
  if (!usuario) return <p className="perfil">Cargando perfil...</p>;
  return <p className="perfil">Perfil: {usuario.nombre}</p>;
}
```

**Resultado cuando falla (50%):**
```
✅ Console muestra: "Error al cargar perfil: No se pudo cargar el usuario"
✅ Pantalla muestra: "❌ Error: No se pudo cargar el usuario"
✅ Usuario sabe qué pasó
✅ Error está controlado
```

### 📍 Cambios exactos
```diff
  function PerfilUsuario() {
    const [usuario, setUsuario] = useState(null);
+   const [error, setError] = useState(null);

    useEffect(() => {
      obtenerUsuario();
    }, []);

    function obtenerUsuario() {
      const exito = Math.random() > 0.5;
      setTimeout(() => {
        if (exito) {
          setUsuario({ nombre: 'Estudiante React' });
        } else {
+         try {
            throw new Error('No se pudo cargar el usuario');
+         } catch (err) {
+           console.error('Error al cargar perfil:', err.message);
+           setError(err.message);
+         }
        }
      }, 1000);
    }

+   if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;
    if (!usuario) return <p className="perfil">Cargando perfil...</p>;
    return <p className="perfil">Perfil: {usuario.nombre}</p>;
  }
```

---

## 📊 TABLA RESUMEN

| Bug | Línea | Antes | Después | Cambio |
|-----|-------|-------|---------|--------|
| 1 | tareasIniciales | Missing property | Added `categoria` | +1 prop |
| 2 | useEffect | No dependencies | `[]` added | +2 chars |
| 3 | filter() | `=== 'true'` | `=== true` | Removed quotes |
| 4 | agregarTarea | `push()` | `[...tareas, new]` | Use spread |
| 5 | obtenerUsuario | `throw` | `try/catch` | Error handling |

---

## 🎯 PATRÓN GENERAL

```
❌ BUG → Algo falta o es incorrecto
   ↓
🔍 INVESTIGACIÓN → Usar console.log y DevTools
   ↓
💡 CAUSA RAÍZ → Entender por qué falla
   ↓
✅ SOLUCIÓN → Cambiar el código
   ↓
✔️ VERIFICACIÓN → Confirmar que funciona
```

---

**Cada bug sigue este patrón. Memorízalo y podrás debuggear cualquier cosa.** 🚀
