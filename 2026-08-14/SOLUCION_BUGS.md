# Taller: useEffect y Ciclo de Vida en React - Análisis de Bugs Corregidos

## 🐛 BUG 1 — El reloj sigue corriendo aunque lo oculten

### Comportamiento observado
Al hacer clic en "Ocultar reloj", el componente desaparece de la pantalla, pero en la consola los logs de "tick" **siguen apareciendo cada segundo**. El `setInterval` continúa ejecutándose en segundo plano.

### Console.log de confirmación
```javascript
// En la consola se observaba:
⏰ Reloj montado
tick, segundos: 1
tick, segundos: 2
tick, segundos: 3
// [Usuario oculta el reloj]
tick, segundos: 4  // ❌ Sigue apareciendo
tick, segundos: 5  // ❌ Sigue apareciendo
```

### Causa raíz
El efecto no tenía una función de **cleanup** que detuviera el intervalo cuando el componente se desmontaba. Sin ella, el intervalo seguía ejecutándose en memoria, consumiendo recursos (memory leak).

### Corrección aplicada
```javascript
useEffect(() => {
  console.log('⏰ Reloj montado');
  const id = setInterval(() => {
    setSegundos((s) => {
      console.log('tick, segundos:', s + 1);
      return s + 1;
    });
  }, 1000);
  return () => clearInterval(id);  // ✅ Cleanup agregado
}, []);
```

### Fase del ciclo de vida
**Desmontaje**: El cleanup se ejecuta cuando el componente se desmonta (cuando se oculta el reloj). Es la fase más importante para evitar memory leaks con listeners, timers e intervalos.

---

## 🐛 BUG 2 — El contador automático se queda pegado en 1

### Comportamiento observado
El contador en pantalla sube a 1 y **no avanza más**, quedando "pegado". Sin embargo, en la consola el efecto sigue imprimiendo un mensaje cada segundo, confirmando que el intervalo aún funciona.

```
Contador en pantalla: 1 (nunca cambia)
Consola: "El contador según el efecto es: 0" (repetido cada segundo)
```

### Console.log de confirmación
```javascript
// Agregando logs comparativos:
console.log('Valor en pantalla:', contador);
console.log('El contador según el efecto es:', contador);
// Resultado: siempre muestra 0, aunque el estado real sea mayor
```

### Causa raíz
**Stale closure** (closure obsoleta): El efecto capturó el valor de `contador` cuando fue creado (0) y nunca lo actualizó. Aunque el estado real cambiera, el efecto seguía usando la versión "congelada" de 10 meses atrás. Con dependencias vacías `[]`, el efecto solo se crea una vez, atrapando `contador = 0` para siempre.

### Corrección aplicada
Se cambió a la **forma funcional de setState**:
```javascript
useEffect(() => {
  const id = setInterval(() => {
    // ✅ En lugar de: setContador(contador + 1)
    // Usamos la forma funcional que siempre recibe el valor ACTUAL:
    setContador((c) => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

**Por qué funciona**: `(c) => c + 1` recibe el valor actual del contador (`c`) directamente del estado, no de la closure. React se encarga de pasar siempre el valor más reciente.

### Alternativa (no recomendada en este caso)
Agregar `contador` a las dependencias causaría que el efecto se reiniciara cada vez que cambiera, acumulando múltiples intervalos.

### Fase del ciclo de vida
**Actualización**: El problema ocurre durante la fase de actualización. El closure "recuerda" el valor antiguo y no reacciona a los cambios de estado.

---

## 🐛 BUG 3 — El ancho de ventana duplica los mensajes

### Comportamiento observado
Redimensionar la ventana la primera vez imprime un mensaje en consola. Hacerlo una segunda vez imprime el **mensaje DOS veces**. Una tercera vez lo imprime **TRES veces**, y así sucesivamente.

```
[Redimensionar ventana por 1ª vez]
"Resize detectado, ancho: 1200"

[Redimensionar ventana por 2ª vez]
"Resize detectado, ancho: 1100"
"Resize detectado, ancho: 1100"  // ❌ Se repite

[Redimensionar ventana por 3ª vez]
"Resize detectado, ancho: 1000"
"Resize detectado, ancho: 1000"
"Resize detectado, ancho: 1000"  // ❌ Se repite tres veces
```

### Console.log de confirmación
Contar cuántas veces aparece el mensaje al redimensionar:
```javascript
function manejarResize() {
  console.log('❌ Listeners acumulados detectados');
  console.log('Resize detectado, ancho:', window.innerWidth);
}
```

### Causa raíz
El arreglo de dependencias era `[ancho]`, causando que el efecto se re-ejecutara **cada vez que `ancho` cambiaba**. Cada re-ejecución agregaba UN NUEVO listener de resize sin quitar el anterior. Después de 3 cambios, había 3 listeners escuchando el mismo evento, de ahí los logs duplicados.

### Corrección aplicada
Se quitó `ancho` de las dependencias y se agregó el cleanup:
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

**Por qué funciona**: 
- Con dependencias vacías, el efecto solo se ejecuta UNA SOLA VEZ al montar
- El cleanup se ejecuta si el componente se desmonta, o JUSTO ANTES de que el efecto se repita
- Como el efecto no se repite (dependencias vacías), el cleanup no hace nada en este caso
- Solo hay UN listener, no importa cuántas veces redimensiones

### Relación con el cleanup
Este bug ilustra por qué el cleanup es crítico: **siempre ejecuta el cleanup antes de la próxima ejecución del efecto**. Si el efecto se repitiera, necesitaríamos limpiar los listeners viejos antes de agregar nuevos.

### Fase del ciclo de vida
**Montaje + Limpieza**: El efecto se ejecuta al montar, y el cleanup previene la acumulación de listeners que seguirían activos en memoria.

---

## 🐛 BUG 4 — El nombre no cambia al elegir otro usuario

### Comportamiento observado
Los botones "Usuario 1" y "Usuario 2" cambian su estado visual, pero el nombre mostrado en pantalla nunca se actualiza. Siempre muestra el nombre del Usuario 1.

```
[Pantalla inicial]
"Nombre: Ana"

[Haz clic en "Usuario 2"]
"Nombre: Ana"  // ❌ Sigue mostrando el nombre del Usuario 1
```

### Console.log de confirmación
Agregar un log dentro del efecto para ver si se ejecuta:
```javascript
useEffect(() => {
  console.log('Buscando datos del usuario', id);  // ¿Se imprime al cambiar?
  // ...
}, []);  // ❌ Sin dependencias
```

**Resultado**: El log solo aparece UNA VEZ al montar. Al cambiar de usuario (cambiar `id`), el log nunca reaparece, confirmando que el efecto no se re-ejecuta.

### Causa raíz
El efecto usaba la prop `id`, pero no la incluía en el arreglo de dependencias. React React no sabía que debía re-ejecutar el efecto cuando `id` cambiaba. El efecto solo corrió una vez al montar con `id = 1`, capturando ese valor "para siempre".

### Corrección aplicada
Agregar `id` al arreglo de dependencias:
```javascript
useEffect(() => {
  console.log('Buscando datos del usuario', id);
  const nombres = { 1: 'Ana', 2: 'Luis' };
  setNombre(nombres[id]);
}, [id]);  // ✅ Ahora React sabe: re-ejecuta cuando id cambie
```

**Por qué funciona**: React ahora compara el valor anterior de `id` con el nuevo. Si son distintos, ejecuta el efecto de nuevo, obteniendo los datos del usuario correcto.

### Fase del ciclo de vida
**Actualización**: El efecto debe ejecutarse en la fase de actualización cada vez que cambia `id` (una prop que afecta el componente).

---

## Experimento Guiado: Las Tres Fases (Parte 4)

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

**Predicción vs. Realidad**:
- 🟢 MONTADO — Aparece al cargar (correcto ✓)
- Clic 1: 🔴 LIMPIEZA → 🔵 ACTUALIZADO, clics: 1 (cleanup antes del siguiente efecto)
- Clic 2: 🔴 LIMPIEZA → 🔵 ACTUALIZADO, clics: 2

### Variante 2: Cambiar a `[]`
```javascript
}, []);
```

**Predicción**: Sin cambios en las dependencias, el efecto no se debería repetir nunca.
**Realidad**: 
- 🟢 MONTADO al cargar
- Clics no causan 🔵 ACTUALIZADO (el efecto no se re-ejecuta)
- 🔴 LIMPIEZA solo aparece al desmontar

**Conclusión**: Las dependencias controlan cuándo se repite el efecto.

### Variante 3: Sin arreglo de dependencias
```javascript
useEffect(() => { ... });  // Sin [] ni nada
```

**Predicción**: Se ejecuta en CADA render.
**Realidad**:
- 🟢 MONTADO al cargar
- Cada clic causa: 🔴 LIMPIEZA → 🔵 ACTUALIZADO (se repite en cada render)
- Muchas limpiezas y actualizaciones, un desorden total

**Conclusión**: Sin especificar dependencias, es casi siempre un error (bug lento).

### Variante 4: Con mostrar/ocultar
Envolver `<ExperimentoFases />` en el patrón toggle igual que el reloj muestra el verdadero **desmontaje**:
```javascript
useEffect(() => {
  // ...
  return () => console.log('🔴 LIMPIEZA (al desmontar)');
}, [clics]);

// Cuando se oculta el componente:
// 🔴 LIMPIEZA aparece INCLUSO SI clics no cambió
```

---

## Resumen: El patrón correcto de useEffect

| Caso | Dependencias | Cuándo se ejecuta | Cuándo se limpia |
|------|---|---|---|
| **Montar solo** | `[]` | Una vez al montar | Al desmontar |
| **Reaccionar a cambios** | `[var1, var2]` | Al montar y cuando var1 o var2 cambian | Antes de cada ejecución y al desmontar |
| **Cada render** | (sin arreglo) | Cada vez que se renderiza | Cada vez antes del siguiente render |
| **⚠️ Evitar** | `[contador]` + leer `contador` sin función | Cada cambio crea nuevos listeners/timers | Acumulación de efectos (memory leak) |

---

## Lecciones clave aprendidas

1. **Cleanup es obligatorio** para listeners, timers, suscripciones. Sin él, hay memory leaks.
2. **Stale closure** ocurre cuando un efecto "congela" variables. Usa la forma funcional de setState o agrega las variables a dependencias.
3. **Dependencias cero** no significa "sin dependencias". Significa "solo al montar". Revisar siempre qué variables se usan adentro.
4. **Cleanup se ejecuta** dos veces: antes de cada nueva ejecución del efecto, y al desmontar.
5. **ESLint rule** `exhaustive-deps` es tu amigo. Agregar cualquier variable que uses en el efecto a las dependencias.

