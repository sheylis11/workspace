# ✅ EJERCICIO INTERACTIVO: VERIFICACIÓN DE CADA BUG RESUELTO

## Instrucciones:
1. Reemplaza el contenido de `src/App.jsx` con el código de **SOLUCION_COMPLETA.jsx**
2. Ejecuta `npm run dev`
3. Completa los ejercicios de abajo para verificar que cada bug está resuelto

---

## ✅ Ejercicio 1: Verificar que la app carga

### Pasos:
1. Abre la app en el navegador
2. Deberías ver una lista con 4 tareas

### Verificación:
- [ ] La página se ve normal (no hay error rojo)
- [ ] Se muestran estas 4 tareas:
  - [ ] "Aprender React" con categoría "ESTUDIO"
  - [ ] "Hacer ejercicio" con categoría "SALUD"
  - [ ] "Leer un libro" con categoría "OCIO"
  - [ ] "Practicar debugging" con categoría "ESTUDIO" ← ¡Esta ahora tiene categoría!
- [ ] No hay errores en la Console (F12 → Console)

### ¿Qué verifica esto?
✅ **BUG 1 RESUELTO** - La propiedad `categoria` ahora existe en todas las tareas

---

## ✅ Ejercicio 2: Verificar que no hay loop infinito

### Pasos:
1. Abre la DevTools (F12)
2. Ve a la pestaña **Console**
3. Observa durante 5 segundos

### Verificación:
- [ ] La consola está relativamente limpia (sin mensajes infinitos)
- [ ] NO ves esto:
  ```
  Renderizando App, contador: 0
  Renderizando App, contador: 1
  Renderizando App, contador: 2
  ... (imprimiéndose infinitamente)
  ```
- [ ] Si hay logs, son UNA SOLA VEZ (no se repiten)

### ¿Qué verifica esto?
✅ **BUG 2 RESUELTO** - El `useEffect` ahora tiene `[]` y se ejecuta solo una vez

---

## ✅ Ejercicio 3: Verificar que los filtros funcionan

### Pasos:
1. En la app, presiona el botón **"Todas"** → Deberías ver 4 tareas
2. Presiona el botón **"Completadas"** → Deberías ver 1 tarea (solo "Hacer ejercicio")
3. Presiona el botón **"Pendientes"** → Deberías ver 3 tareas
4. Presiona **"Todas"** de nuevo

### Verificación en cada filtro:
- **Todas:**
  - [ ] Se muestran 4 tareas

- **Completadas:**
  - [ ] Se muestra 1 tarea: "Hacer ejercicio" (con tachadura)
  - [ ] Las otras 3 desaparecen

- **Pendientes:**
  - [ ] Se muestran 3 tareas: "Aprender React", "Leer un libro", "Practicar debugging"
  - [ ] "Hacer ejercicio" desaparece

- **Todas (de nuevo):**
  - [ ] Se muestran todas las 4 tareas

### ¿Qué verifica esto?
✅ **BUG 3 RESUELTO** - Las comparaciones ahora usan `=== true` y `=== false` (boolean, no string)

---

## ✅ Ejercicio 4: Verificar que agregar tareas funciona

### Pasos:
1. En el input que dice "Nueva tarea", escribe: `Ir al cine`
2. Presiona el botón "Agregar" (o Enter)
3. Observa la lista

### Verificación:
- [ ] El input se limpia ✅
- [ ] Una NUEVA tarea aparece en la lista: `Ir al cine` con categoría `GENERAL`
- [ ] El contador total de tareas aumentó (ahora hay 5)
- [ ] Agregar otra más: `Estudiar Python`
  - [ ] Aparece en la lista
  - [ ] Ahora hay 6 tareas

### Verificación visual:
```
Antes: 4 tareas
Después de agregar 2: 6 tareas ✅
```

### ¿Qué verifica esto?
✅ **BUG 4 RESUELTO** - Las tareas nuevas se agregan usando spread operator `[...tareas, nuevaTarea]`

---

## ✅ Ejercicio 5: Verificar que los errores se manejan

### Pasos:
1. Abre la app en el navegador
2. Abre DevTools (F12) → Console
3. Observa la sección de **Perfil** (debajo de todo)
4. Recarga la página (F5) varias veces (al menos 10 veces)
5. En algunos casos verás que falla (50% probabilidad)

### Verificación cuando carga bien (50%):
- [ ] Después de 1 segundo, aparece: `Perfil: Estudiante React` ✅

### Verificación cuando falla (50%):
- [ ] Después de 1 segundo, aparece: `❌ Error: No se pudo cargar el usuario` ✅
- [ ] En la Console ves: `Error al cargar perfil: No se pudo cargar el usuario`
- [ ] **NO hay un error rojo "Uncaught Error"** (que es lo importante)

### Diferencia importante:
```
ANTES (BUG):
- Se queda en "Cargando perfil..." para siempre ❌
- Console muestra: "Uncaught Error" (error no controlado) ❌

DESPUÉS (SOLUCIONADO):
- Se muestra: "❌ Error: No se pudo cargar el usuario" ✅
- Console muestra: "Error al cargar perfil: No se pudo cargar el usuario" (controlado) ✅
```

### ¿Qué verifica esto?
✅ **BUG 5 RESUELTO** - Los errores se atrapan con `try/catch` y se guardan en estado

---

## 🎯 Resumen de lo que verificaste:

| Bug | ¿Verificado? | Síntoma | Solución aplicada |
|-----|-------|----------|-----------|
| 1 | ☐ | Todas las tareas tienen `categoria` | Agregué `categoria: 'estudio'` a tarea 4 |
| 2 | ☐ | No hay impresión infinita en Console | Agregué `[]` a `useEffect` |
| 3 | ☐ | Filtros "Pendientes" y "Completadas" funcionan | Cambié `'true'` a `true` (boolean) |
| 4 | ☐ | Agregar tareas las muestra inmediatamente | Usé `[...tareas, nuevaTarea]` |
| 5 | ☐ | Errores se muestran en pantalla, no se queda pegado | Agregué `try/catch` y estado de error |

---

## 🔧 Debugging avanzado (opcional):

### Si quieres investigar más, prueba esto:

#### 1. Investigar el Bug 1 en Sources:
```
DevTools → Sources → Busca "App.jsx"
Línea del error: Donde se intenta llamar .toUpperCase() en undefined
```

#### 2. Investigar el Bug 2 con Breakpoints:
```
DevTools → Sources → Haz clic en el número de línea del useEffect
Recarga la página y verás cómo se ejecuta el useEffect cada vez
```

#### 3. Investigar el Bug 3 con console.table:
```javascript
// En la consola del navegador, copia esto:
console.table([
  { id: 1, completada: false, tipo: typeof false },
  { id: 2, completada: "true", tipo: typeof "true" },
  { id: 3, completada: true, tipo: typeof true },
  { id: 4, completada: "false", tipo: typeof "false" }
]);

// Verás claramente la diferencia entre boolean y string
```

#### 4. Investigar el Bug 4 con referencias de objeto:
```javascript
// En la consola del navegador:
const arr1 = [1, 2, 3];
arr1.push(4);
const arr2 = arr1;
console.log(arr1 === arr2); // true (es el MISMO objeto)

const arr3 = [1, 2, 3];
const arr4 = [...arr3, 4];
console.log(arr3 === arr4); // false (son DIFERENTES objetos)
```

#### 5. Investigar el Bug 5 con Network:
```
DevTools → Network → Filtra por "fetch"
Recarga varias veces para ver si hay peticiones fallidas
```

---

## ✨ Conclusión

Has completado el taller de debugging. Ahora entiendes:

1. ✅ Cómo leer mensajes de error en la Console
2. ✅ Cómo usar `console.log()` para investigar
3. ✅ Cómo funcionan las comparaciones de tipos en JavaScript
4. ✅ Por qué React requiere nuevas referencias (no mutaciones)
5. ✅ Cómo controlar errores con `try/catch`

**Lo más importante:** No tengas miedo de los errores. Son tus aliados para entender qué está pasando en tu código. 🚀
