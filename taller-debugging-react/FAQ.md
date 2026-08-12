# ❓ PREGUNTAS Y RESPUESTAS - PREGUNTAS FRECUENTES SOBRE DEBUGGING

---

## 🐛 BUG 1: "La app ni siquiera carga"

### P: ¿Por qué React no muestra el error en pantalla de forma más clara?
**R:** React SÍ muestra el error, pero en la Console (DevTools). Algunos frameworks muestran también una "superposición roja" en la pantalla, pero la información real está siempre en la Console. Por eso es importante acostumbrarse a abrirla cada vez que algo falla.

### P: ¿Cómo es que una sola tarea sin `categoria` rompe TODA la app?
**R:** Porque cuando React intenta renderizar la lista, va iterando por cada tarea. Cuando llega a la tarea 4, intenta hacer `undefined.toUpperCase()`, lo cual no es posible. JavaScript lanza un error y detiene la ejecución. La app se queda en un estado inválido.

### P: ¿Debería agregar validaciones para prevenir esto?
**R:** Sí, es buena práctica. Podrías hacer:
```javascript
<span>{tarea.categoria?.toUpperCase() || 'SIN CATEGORIA'}</span>
```
El `?.` es el "optional chaining" - si `categoria` es `undefined`, no intenta llamar `.toUpperCase()`.

---

## 🐛 BUG 2: "La consola no para de imprimir"

### P: ¿Por qué un useEffect sin dependencias causa un loop?
**R:** Porque:
1. Componente renderiza → se ejecuta useEffect
2. useEffect cambia el estado con `setContador(contador + 1)`
3. Cambiar estado causa un nuevo render → volver al paso 1
4. INFINITAMENTE

### P: ¿Qué hace exactamente el array `[]` de dependencias?
**R:** Le dice a React: "Solo ejecuta este efecto cuando cambien estas variables. Si el array está vacío `[]`, nunca van a cambiar, así que ejecuta solo UNA SOLA VEZ cuando el componente se monta."

### P: ¿Qué pasa si en el array pongo `[contador]`?
**R:** Entonces se ejecutaría cada vez que `contador` cambia. Pero como el efecto hace `setContador(contador + 1)`, volveríamos al loop infinito.

### P: ¿Este bug causaría un error en la consola?
**R:** No, no hay un "error rojo". Solo se ve que se imprime infinitamente. Por eso es importante mirar los logs, no solo los errores.

---

## 🐛 BUG 3: "Los filtros no funcionan"

### P: ¿Por qué `true === 'true'` da `false`?
**R:** Porque `===` (comparación estricta) verifica tanto el VALOR como el TIPO. Son diferentes tipos:
```javascript
true      // tipo: boolean
'true'    // tipo: string

true === 'true'    // false (diferente tipo)
true == 'true'     // false (en este caso también)
'true' === 'true'  // true (mismo tipo y valor)
```

### P: ¿Cuál es la diferencia entre `==` y `===`?
**R:** 
- `==` hace conversión de tipos (loose equality)
- `===` NO hace conversión (strict equality)

Ejemplo:
```javascript
0 == false        // true (=== lo convierte)
0 === false       // false (no convierte)
'1' == 1          // true (=== lo convierte)
'1' === 1         // false (no convierte)
```

**Recomendación:** Siempre usa `===` en JavaScript moderno (ES6+).

### P: ¿Cómo podría haber evitado este error?
**R:** Si hubieras mirado el objeto original:
```javascript
{ id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true }
                                                                        ^^^^
                                                                    boolean, NO string
```

Verías que `completada` es un boolean. Luego en el filtro habrías usado `=== true`.

---

## 🐛 BUG 4: "Agregar una tarea no la muestra"

### P: ¿Cómo es que el estado cambió pero React no se dio cuenta?
**R:** React compara REFERENCIAS de objetos, no el contenido. Cuando haces:
```javascript
const arr = [1, 2, 3];
arr.push(4);  // Modificas el array
setTareas(arr);  // Le pasas la MISMA referencia

// React internamente hace:
if (nuevoTareas === viejoTareas) {
  // No renderizar (cree que no cambió)
}
```

Como es la MISMA referencia, React piensa que nada cambió.

### P: ¿Por qué usa React referencias en vez de comparar contenido?
**R:** Por performance. Si React comparara el contenido completo de cada objeto cada vez, sería muy lento. Las referencias son instantáneas de comparar.

### P: ¿El spread operator `[...array]` crea una copia profunda?
**R:** No, solo crea una copia SUPERFICIAL (shallow copy). Pero para este caso es suficiente:
```javascript
const viejoArray = [{ id: 1 }, { id: 2 }];
const nuevoArray = [...viejoArray, { id: 3 }];

viejoArray === nuevoArray        // false ✅ (referencia diferente)
viejoArray[0] === nuevoArray[0]  // true (mismo objeto dentro)
```

Para copias profundas (deep copy), necesitarías:
```javascript
const deepCopy = JSON.parse(JSON.stringify(array));
// O usar librerías como lodash
```

### P: ¿Hay otras formas de crear un nuevo array en React?
**R:** Sí:
```javascript
// Spread operator (más común):
setTareas([...tareas, nuevaTarea]);

// concat():
setTareas(tareas.concat(nuevaTarea));

// map() para transformar:
setTareas(tareas.map((t) => t.id === id ? {...t, ...cambios} : t));

// filter() para remover:
setTareas(tareas.filter((t) => t.id !== idARemover));

// slice() + push():
const arr = tareas.slice();  // copia
arr.push(nuevaTarea);
setTareas(arr);
```

---

## 🐛 BUG 5: "Cargando perfil..." se queda pegado"

### P: ¿Por qué el error no "crashea" la app visualmente?
**R:** Porque el error ocurre DENTRO de un `setTimeout`. React no lo atrapa automáticamente. El componente `PerfilUsuario` se queda esperando que `usuario` sea diferente de `null`, pero como el error ocurrió, `setUsuario` nunca se llama.

### P: ¿Cuál es la diferencia entre error "Uncaught" y "controlado"?
**R:**
```javascript
// ERROR "UNCAUGHT" (no controlado):
throw new Error('Algo falló');  // Se lanza pero nadie lo atrapa

// ERROR "CONTROLADO":
try {
  throw new Error('Algo falló');
} catch (err) {
  console.error('Atrapé el error:', err.message);
  // Puedo hacer algo con él
}
```

### P: ¿Qué pasa si no uso `try/catch`?
**R:** El error se propaga y puede:
1. Romper la app (en algunos casos)
2. Dejar la app en un estado inconsistente
3. Solo aparecer en la Console (nadie lo ve)
4. Confundir al usuario

### P: ¿Debería usar `try/catch` en todas partes?
**R:** No necesariamente. Usa `try/catch` cuando:
- Llamas a una API/fetch que puede fallar
- Haces operaciones que podrían fallar (JSON.parse, etc.)
- Código donde esperas que algo pueda salir mal

### P: ¿Hay Error Boundaries en React?
**R:** Sí, son componentes que atrapan errores de sus hijos:
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error atrapado:', error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal</h1>;
    }
    return this.props.children;
  }
}
```

Pero para este caso, `try/catch` + estado es más simple.

---

## 🔍 PREGUNTAS GENERALES DE DEBUGGING

### P: ¿Cómo sé cuándo usar `console.log` vs breakpoints?
**R:**
- **`console.log`:** Cuando quieres ver qué valores tiene una variable
- **Breakpoints:** Cuando quieres pausar la ejecución y avanzar línea por línea

### P: ¿Qué herramienta es mejor para debuggear?
**R:** No hay "mejor", depende de la situación:
- **Console.log:** Rápido, simple, perfecto para la mayoría de casos
- **Breakpoints:** Cuando el problema es difícil y necesitas inspeccionar en profundidad
- **Console.table():** Cuando tienes arrays/objetos complejos
- **DevTools Network:** Cuando el problema es con APIs

### P: ¿Por qué a veces un bug desaparece cuando agrego `console.log`?
**R:** Se llama "Heisenbug" (bug de Heisenberg). Ocurre porque:
1. Agregar `console.log` cambia ligeramente el timing
2. El garbage collector se comporta diferente
3. Errores de concurrencia que dependen del timing

Es frustrante pero normal. Si pasa, intenta usar breakpoints en vez de logs.

### P: ¿Cómo debuggeo código asincrónico (async/await)?
**R:** Igual que código sincrónico:
```javascript
async function obtenerDatos() {
  try {
    console.log('Antes de fetch');
    const res = await fetch('/api/data');
    console.log('Respuesta:', res);
    const datos = await res.json();
    console.log('Datos parseados:', datos);
    return datos;
  } catch (err) {
    console.error('Error:', err.message);
  }
}
```

O usa breakpoints en la línea del `await`.

### P: ¿Qué diferencia hay entre error en compilación vs runtime?
**R:**
- **Compilación:** El código no es válido sintácticamente
  ```javascript
  const x = }  // ERROR: falta el [
  ```
  
- **Runtime:** El código es válido pero falla cuando se ejecuta
  ```javascript
  tarea.categoria.toUpperCase()  // Si categoria es undefined, ERROR en runtime
  ```

Runtime errors son más difíciles de encontrar porque no te los dice el compilador.

---

## 💡 TIPS Y TRICKS DE DEBUGGING

### Tip 1: Usa `console.group` para organizar logs
```javascript
console.group('Datos de usuario');
console.log('id:', user.id);
console.log('nombre:', user.name);
console.groupEnd();

// Output:
// ▸ Datos de usuario
//   id: 1
//   nombre: Juan
```

### Tip 2: Usa `console.time` para medir performance
```javascript
console.time('calcular');
// ... algo lento ...
console.timeEnd('calcular');

// Output:
// calcular: 234.567ms
```

### Tip 3: Destructura variables en el console
```javascript
const { id, nombre } = usuario;
console.log(id, nombre);  // Más legible
```

### Tip 4: Usa `debugger` en el código
```javascript
function procesar() {
  debugger;  // Pausa aquí cuando DevTools esté abierto
  return valor * 2;
}
```

### Tip 5: Inspecciona en la consola
```javascript
// En la consola del navegador, puedes escribir:
console.log($('selector'))  // Buscar elementos DOM
console.log($0)             // Elemento inspeccionado
```

---

## 🎯 CONCLUSIÓN

Los bugs son parte normal de la programación. Incluso los desarrolladores experimentados los cometen todo el tiempo. La diferencia es que:

1. **Leen los mensajes de error completos**
2. **Usan las herramientas disponibles** (DevTools)
3. **Tienen un proceso sistemático** para investigar
4. **No se rendirse** hasta encontrar el problema

Con este taller, ahora tú también tienes ese proceso. ¡Adelante! 🚀
