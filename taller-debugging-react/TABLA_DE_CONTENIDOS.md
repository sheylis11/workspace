# 📑 ÍNDICE DEL TALLER - NAVEGACIÓN COMPLETA

## 📚 Documentación (LEER PRIMERO)

### 1. **README.md** ← COMIENZA AQUÍ
- Introducción al taller
- Cómo usar los diferentes documentos
- Rutas de aprendizaje (Opción A, B, C)
- Requisitos técnicos
- Objetivos de aprendizaje

**¿Cuándo leerlo?** Primera vez que inicias el taller

---

### 2. **EXPLICACION_DETALLADA.md** - LA GUÍA COMPLETA
[📖 Leer archivo](EXPLICACION_DETALLADA.md)

Contiene:
- 🐛 **BUG 1:** Propiedad `undefined` (tarea.categoria)
  - Síntoma observado
  - Cómo lo encontré (paso a paso)
  - Solución y explicación
  
- 🐛 **BUG 2:** Loop infinito en `useEffect`
  - Síntoma observado
  - Investigación detallada
  - El ciclo infinito explicado
  
- 🐛 **BUG 3:** Comparación de tipos incorrecta (`'true'` vs `true`)
  - Prueba de JavaScript mostrando por qué falla
  - Impacto en los filtros
  
- 🐛 **BUG 4:** Mutación de estado con `push()`
  - Cómo React compara referencias
  - Por qué spread operator funciona
  
- 🐛 **BUG 5:** Error no controlado en `obtenerUsuario`
  - El ciclo que causa el problema
  - Solución con `try/catch` + estado

**¿Cuándo leerlo?** Cuando quieras entender en profundidad cómo se encontró cada bug

**Duración:** 15-20 minutos

---

### 3. **GUIA_VISUAL.md** - VERSIÓN PASO A PASO
[👀 Leer archivo](GUIA_VISUAL.md)

Lo que ves en pantalla → Qué aparece en Console → Código sospechoso → Solución

Para cada bug:
- Lo primero que ves (síntoma visual)
- Console output (qué imprime)
- Código incorrecto (línea exacta)
- Código correcto (solución)

**¿Cuándo leerlo?** Cuando necesitas ver exactamente dónde está el problema

**Duración:** 10-15 minutos

---

### 4. **RESUMEN_RAPIDO.md** - CHEAT SHEET
[⚡ Leer archivo](RESUMEN_RAPIDO.md)

Formato: ANTES (BUG) vs DESPUÉS (SOLUCIÓN)

Perfecto para:
- Repaso rápido
- Cuando necesitas recordar algo
- Compartir con otros

**¿Cuándo leerlo?** Cuando quieres algo condensado y rápido

**Duración:** 3-5 minutos

---

### 5. **MAPA_MENTAL.md** - VISUALIZACIÓN GRÁFICA
[🗺️ Leer archivo](MAPA_MENTAL.md)

Contiene:
- Diagrama de los 5 bugs (síntoma → causa → solución)
- Flujo de debugging general
- Método paso a paso
- Checklist de debugging
- Atajos de DevTools
- Puntos clave a recordar

**¿Cuándo leerlo?** Para entender la metodología general

**Duración:** 10 minutos

---

### 6. **FAQ.md** - PREGUNTAS Y RESPUESTAS
[❓ Leer archivo](FAQ.md)

Responde preguntas como:
- "¿Por qué React no muestra el error en pantalla?"
- "¿Por qué `true === 'true'` da false?"
- "¿Cuál es la diferencia entre == y ===?"
- "¿Por qué usar referencias en vez de contenido?"
- Y muchas más...

**¿Cuándo leerlo?** Cuando tienes dudas específicas

**Duración:** Variable

---

## 💻 CÓDIGO

### 7. **src/App.jsx** - CÓDIGO CON BUGS
[👁️ Ver archivo](src/App.jsx)

- El código original del taller
- Tiene los 5 bugs intencionales
- Comentarios 🐛 que muestran dónde están
- Para practicar debugging

**¿Cuándo usarlo?** Cuando quieres aprender debuggeando

---

### 8. **SOLUCION_COMPLETA.jsx** - CÓDIGO SOLUCIONADO
[✅ Ver archivo](SOLUCION_COMPLETA.jsx)

- Todos los 5 bugs resueltos
- Comentarios ✅ que muestran dónde se arreglaron
- Código listo para usar
- Copia esto a `src/App.jsx` cuando quieras que la app funcione

**¿Cuándo usarlo?** Para ver la solución final o cuando la app necesita funcionar

---

### 9. **src/App.css**
[🎨 Ver archivo](src/App.css)

Los estilos para la app (sin bugs)

---

## ✅ VERIFICACIÓN

### 10. **VERIFICACION_EJERCICIOS.md** - PRÁCTICA INTERACTIVA
[✔️ Leer archivo](VERIFICACION_EJERCICIOS.md)

Ejercicios paso a paso:
- Ejercicio 1: Verificar que la app carga ✅
- Ejercicio 2: Verificar que no hay loop infinito ✅
- Ejercicio 3: Verificar que los filtros funcionan ✅
- Ejercicio 4: Verificar que agregar tareas funciona ✅
- Ejercicio 5: Verificar manejo de errores ✅

Cada ejercicio tiene:
- Pasos concretos
- Verificaciones (checkboxes)
- Qué verifica

**¿Cuándo usarlo?** Después de arreglar los bugs

**Duración:** 10-15 minutos

---

## 🗂️ ESTRUCTURA DE ARCHIVOS

```
taller-debugging-react/
├── README.md                    ← COMIENZA AQUÍ
├── EXPLICACION_DETALLADA.md     ← Guía completa
├── GUIA_VISUAL.md               ← Versión visual
├── RESUMEN_RAPIDO.md            ← Cheat sheet
├── MAPA_MENTAL.md               ← Diagramas y flujos
├── FAQ.md                       ← Preguntas y respuestas
├── VERIFICACION_EJERCICIOS.md   ← Ejercicios de verificación
├── TABLA_DE_CONTENIDOS.md       ← Este archivo
│
├── SOLUCION_COMPLETA.jsx        ← Código solucionado
│
├── package.json
├── vite.config.js
├── eslint.config.js
├── index.html
│
└── src/
    ├── main.jsx
    ├── App.jsx                  ← Código CON bugs
    ├── App.css
    └── assets/
```

---

## 🎯 RUTAS DE APRENDIZAJE

### Ruta A: Aprendizaje profundo (120 minutos)
```
1. README.md (5 min)
   ↓
2. EXPLICACION_DETALLADA.md (20 min)
   ↓
3. GUIA_VISUAL.md (15 min)
   ↓
4. Ejecutar: npm run dev (1 min)
   ↓
5. Debuggear src/App.jsx por ti mismo (30 min)
   ↓
6. VERIFICACION_EJERCICIOS.md (15 min)
   ↓
7. SOLUCION_COMPLETA.jsx (10 min)
   ↓
8. FAQ.md (si tienes dudas) (variable)

TOTAL: ~90-120 minutos
RESULTADO: Entiendes completamente cada bug
```

### Ruta B: Aprendizaje rápido (30 minutos)
```
1. README.md (5 min)
   ↓
2. RESUMEN_RAPIDO.md (5 min)
   ↓
3. Copia SOLUCION_COMPLETA.jsx a src/App.jsx (1 min)
   ↓
4. npm run dev (1 min)
   ↓
5. VERIFICACION_EJERCICIOS.md (15 min)

TOTAL: ~30 minutos
RESULTADO: Tienes la app funcionando y verificas que funciona
```

### Ruta C: Referencia rápida (10 minutos)
```
1. RESUMEN_RAPIDO.md (5 min)
   ↓
2. FAQ.md si tienes dudas específicas (variable)

TOTAL: ~5-10 minutos
RESULTADO: Recordar las soluciones rápidamente
```

---

## 📖 ÍNDICE DE TEMAS

### Por tipo de bug
- [Propiedad undefined](GUIA_VISUAL.md#-bug-1-tareadcategoria-es-undefined)
- [Loop infinito](GUIA_VISUAL.md#-bug-2-loop-infinito-con-useeffect)
- [Comparación de tipos](GUIA_VISUAL.md#-bug-3-filtros-retornan-nada)
- [Mutación de estado](GUIA_VISUAL.md#-bug-4-agregar-tarea-no-funciona)
- [Error no controlado](GUIA_VISUAL.md#-bug-5-se-queda-pegado)

### Por herramienta
- [Usar console.log](EXPLICACION_DETALLADA.md#parte-2--los-distintos-console)
- [Usar DevTools Console](MAPA_MENTAL.md#-herramientas-de-debugging)
- [Usar breakpoints](MAPA_MENTAL.md#atajos-de-debugging-en-devtools)
- [Atajos de DevTools](MAPA_MENTAL.md#-atajos-de-debugging-en-devtools)

### Por concepto
- [Cómo React compara referencias](FAQ.md#p-cómo-es-que-el-estado-cambió-pero-react-no-se-dio-cuenta)
- [Tipos de datos en JavaScript](FAQ.md#p-por-qué-true--true-da-false)
- [Diferencia == vs ===](FAQ.md#p-cuál-es-la-diferencia-entre--y-)
- [Arrays y mutación](FAQ.md#p-debería-agregar-validaciones-para-prevenir-esto)
- [Try/catch y manejo de errores](FAQ.md#-bug-5-cargando-profil-se-queda-pegado)

---

## 🔍 BUSCAR POR PALABRA CLAVE

- **undefined:** GUIA_VISUAL.md, EXPLICACION_DETALLADA.md (Bug 1)
- **loop infinito:** GUIA_VISUAL.md, EXPLICACION_DETALLADA.md (Bug 2)
- **filtro, filter():** GUIA_VISUAL.md, EXPLICACION_DETALLADA.md (Bug 3)
- **push(), spread operator:** GUIA_VISUAL.md, EXPLICACION_DETALLADA.md (Bug 4)
- **try/catch, error:** GUIA_VISUAL.md, EXPLICACION_DETALLADA.md (Bug 5)
- **console.log:** MAPA_MENTAL.md, FAQ.md
- **DevTools:** MAPA_MENTAL.md, FAQ.md
- **useEffect:** EXPLICACION_DETALLADA.md (Bug 2), FAQ.md
- **referencias:** FAQ.md (Bug 4)

---

## 📊 RECURSOS EXTERNOS

Mencionados en los documentos:
- [MDN - console methods](https://developer.mozilla.org/en-US/docs/Web/API/console)
- [React - useEffect documentation](https://react.dev/reference/react/useEffect)
- [Chrome DevTools - Debugging guide](https://developer.chrome.com/docs/devtools/debugging/)
- [JavaScript strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

---

## ✨ TIPS FINALES

1. **Comienza con README.md** - Te orientará sobre por dónde empezar
2. **No saltes documentos** - Cada uno proporciona información complementaria
3. **Haz el debugging por ti primero** - Luego compara con la solución
4. **Vuelve a leer si es necesario** - La comprensión mejora con la repetición
5. **Implementa los ejercicios** - No solo leas, practica

---

## 🎓 CERTIFICADO

Si completaste TODO este taller, ahora dominas:
- ✅ Lectura de mensajes de error
- ✅ Uso de console.log para investigar
- ✅ Debugging con DevTools
- ✅ Identificación de los 5 errores más comunes en React
- ✅ Solución de bugs de forma sistemática

¡Eres un debugging ninja! 🥷

---

**Última actualización:** 2026-08-12
**Versión:** 1.0
**Autor:** Tu instructor de React
