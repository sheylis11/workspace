# 📄 ONE-PAGER - RESUMEN PARA IMPRIMIR O REFERENCIA RÁPIDA

**Taller de Debugging en React - Los 5 Bugs Más Comunes**

---

## 🐛 BUG 1: Propiedad Undefined
```
SÍNTOMA: Pantalla en blanco + error rojo
CAUSA: Tarea sin propiedad 'categoria'
SOLUCIÓN: Agregar categoria: 'estudio' a la tarea 4
LECCIÓN: Verifica que todos los objetos tengan las propiedades que usas
```

---

## 🐛 BUG 2: Loop Infinito
```
SÍNTOMA: Console imprime infinitamente
CAUSA: useEffect sin array [] de dependencias
SOLUCIÓN: Agregar [] como segundo argumento
LECCIÓN: [] = ejecutar 1 vez | [var] = cuando var cambia | nada = siempre
```

---

## 🐛 BUG 3: Tipo Incorrecto
```
SÍNTOMA: Filtros no funcionan
CAUSA: Comparar boolean con string (true vs 'true')
SOLUCIÓN: Cambiar === 'true' a === true
LECCIÓN: true ≠ 'true' | Usa === (strict equality)
```

---

## 🐛 BUG 4: Mutación de Estado
```
SÍNTOMA: Estado cambia pero UI no se actualiza
CAUSA: Usar push() en lugar de crear nuevo array
SOLUCIÓN: Usar spread operator [...tareas, nuevaTarea]
LECCIÓN: React compara referencias, no contenido
```

---

## 🐛 BUG 5: Error No Controlado
```
SÍNTOMA: "Cargando..." se queda pegado
CAUSA: throw Error sin try/catch
SOLUCIÓN: Agregar try/catch y guardar en estado
LECCIÓN: Siempre controla errores en async code
```

---

## 🔧 HERRAMIENTAS CLAVE

| Herramienta | Acceso | Para qué |
|---|---|---|
| DevTools Console | F12 | Ver errores y logs |
| DevTools Sources | F12 | Poner breakpoints |
| console.log() | Código | Imprimir valores |
| typeof | Código | Ver tipo de dato |
| console.table() | Código | Mostrar arrays |

---

## 🚀 MÉTODO DE DEBUGGING (5 PASOS)

1. **Observar:** ¿Qué falla exactamente?
2. **Abrir DevTools:** F12 → Console
3. **Leer error:** Archivo y línea exacta
4. **Agregar console.log:** Investigar valores
5. **Arreglar:** Cambiar el código

---

## ✨ PUNTOS A RECORDAR

✅ Lee los mensajes de error completos
✅ Usa console.log antes y después de cambios
✅ Verifica los tipos de datos con typeof
✅ Nunca mutes arrays/objetos, crea nuevos
✅ Siempre controla errores con try/catch
✅ No ignores lo que dice la Console

❌ No adivines, investiga
❌ No hagas push() en arrays
❌ No compares tipos diferentes
❌ No ignores errores rojos
❌ No sigas sin verificar la solución

---

## 🎯 VERIFICACIÓN RÁPIDA (Checkboxes)

- [ ] App carga sin errores rojos
- [ ] Console no imprime infinitamente
- [ ] Filtros "Completadas" y "Pendientes" funcionan
- [ ] Agregar tareas se ve inmediatamente
- [ ] Errores se muestran en pantalla, no se queda pegado

Si todos están marcados ✅ = ¡TODO ESTÁ SOLUCIONADO!

---

## 📚 DOCUMENTOS (en orden de prioridad)

1. **README.md** - Orientación general
2. **EXPLICACION_DETALLADA.md** - Entender cada bug
3. **GUIA_VISUAL.md** - Ver exactamente dónde están
4. **VERIFICACION_EJERCICIOS.md** - Practicar
5. **FAQ.md** - Resolver dudas

---

## 🔑 PALABRAS CLAVE

- **undefined:** Falta una propiedad
- **loop infinito:** useEffect sin []
- **tipo incorrecto:** true vs 'true'
- **mutación:** push() en lugar de spread
- **error no controlado:** Sin try/catch

---

## 💡 ATAJOS ÚTILES

```
F12              Abrir DevTools
Ctrl+Shift+J     Abrir Console
Ctrl+Shift+I     Inspector
typeof valor     Ver tipo de dato
[...array]       Spread operator
try/catch        Controlar errores
```

---

## 🎓 DESPUÉS DE ESTE TALLER PODRÁS:

✅ Leer mensajes de error y entender qué significan
✅ Usar console.log para investigar problemas
✅ Entender por qué true ≠ 'true'
✅ Saber que React compara referencias
✅ Controlar errores con try/catch
✅ Usar DevTools como un pro
✅ Resolver los 5 bugs más comunes

---

**Imprime esta página y tenla de referencia mientras debuggeas.** 📌

---

**Creado para:** Taller de Debugging en React
**Duración total:** 2-3 horas (depende de la ruta)
**Requisito:** Conocer React básico y JavaScript ES6+
**Objetivo:** Ser capaz de debuggear aplicaciones React profesionalmente
