# 🗺️ MAPA MENTAL - CÓMO DEBUGGEAR CADA BUG

```
┌─────────────────────────────────────────────────────────────────────┐
│                    APP CARGANDO CON 5 BUGS                          │
└──────────────┬────────────────────────────────────────────────────────┘
               │
               ├─────────────────────────────────┬─────────────────────────────┬──────────────────────┐
               │                                 │                             │                      │
         🐛 BUG 1                          🐛 BUG 2                     🐛 BUG 3                  🐛 BUG 4
         "Pantalla                         "Console imprime"           "Filtros no             "Agregar tarea
         en blanco"                        infinitamente"              funcionan"              no se ve"
               │                                 │                             │                      │
         SÍNTOMA:                          SÍNTOMA:                    SÍNTOMA:                 SÍNTOMA:
         ❌ Error rojo                     ❌ Logs infinitos          ❌ Lista vacía           ❌ Sin cambios
         "Cannot read                      "Renderizando App,         cuando filtra           visuales
         property"                         contador: 0, 1, 2..."
               │                                 │                             │                      │
         ¿DÓNDE?                           ¿DÓNDE?                     ¿DÓNDE?                  ¿DÓNDE?
         Console (F12)                     Console (F12)               Console + click          Intentar agregar
               │                                 │                             │                      │
         INVESTIGACIÓN:                    INVESTIGACIÓN:              INVESTIGACIÓN:           INVESTIGACIÓN:
         console.log(tarea)                Comparar con otro           console.log(             console.log(
         ↓                                 useEffect que funciona      typeof completada)       tareas.length)
         Notas que tarea 4                 ↓                           ↓                        ↓
         NO tiene categoria                Falta [] array              Dice "boolean"           Cambia... pero
               │                           de dependencias             pero código              UI no se
               │                           │                           compara con string       actualiza
         CAUSA:                            CAUSA:                      "true"/"false"           │
         ❌ Propiedad undefined            ❌ useEffect sin []         │                        CAUSA:
            en objeto                         causa re-renders         CAUSA:                   ❌ Mutación
         │                                 infinitos                   ❌ Tipo de dato         de estado
         │                                 │                           incorrecto               con push()
         SOLUCIÓN:                         SOLUCIÓN:                   │                        │
         ✅ Agregar propiedad              ✅ Agregar [] al            SOLUCIÓN:                SOLUCIÓN:
            categoria: 'estudio'           useEffect                   ✅ Cambiar a             ✅ Usar
         │                                 │                           === true (bool)         spread
         │                                 │                           │                        operator
         ✅ VERIFICACIÓN:                  ✅ VERIFICACIÓN:            ✅ VERIFICACIÓN:         ✅ VERIFICACIÓN:
         → App carga sin errores           → Console limpia            → Todos los filtros      → Tarea aparece
         → Todas las tareas                → Sin logs repetidos        funcionan                inmediatamente
         tienen categoria                  │                           │
               │                           │                           │
         ✔️ RESUELTO                      ✔️ RESUELTO                 ✔️ RESUELTO              ✔️ RESUELTO


                                                                                              🐛 BUG 5
                                                                                         "Se queda pegado"
                                                                                              │
                                                                                         SÍNTOMA:
                                                                                         ❌ "Cargando..."
                                                                                         se queda para siempre
                                                                                              │
                                                                                         ¿DÓNDE?
                                                                                         Console (F12)
                                                                                              │
                                                                                         INVESTIGACIÓN:
                                                                                         Recargar 10 veces
                                                                                         Ver error en console:
                                                                                         "Uncaught Error"
                                                                                              │
                                                                                         CAUSA:
                                                                                         ❌ throw sin
                                                                                         try/catch
                                                                                              │
                                                                                         SOLUCIÓN:
                                                                                         ✅ Usar try/catch
                                                                                         ✅ Guardar error
                                                                                         en estado
                                                                                         ✅ Mostrar en
                                                                                         pantalla
                                                                                              │
                                                                                         ✅ VERIFICACIÓN:
                                                                                         → Error o éxito
                                                                                         mostrado en pantalla
                                                                                         → No se queda pegado
                                                                                              │
                                                                                         ✔️ RESUELTO
```

---

## 🔄 FLUJO DE DEBUGGING - MÉTODO GENERAL

```
┌─────────────────────────────────────────────────┐
│ 1️⃣  OBSERVAR EL SÍNTOMA                         │
│     ¿Qué falla exactamente?                     │
│     • Pantalla en blanco                        │
│     • Console imprime infinitamente             │
│     • Función no funciona                       │
│     • UI no se actualiza                        │
│     • Errors en Console                         │
└──────────────┬──────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│ 2️⃣  ABRIR DEVTOOLS (F12)                        │
│     Ir a pestaña: CONSOLE                       │
│     ¿Hay errores rojos?                         │
└──────────────┬──────────────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ↓             ↓
   SÍ (hay         NO (no hay
    error)         error)
        │             │
        │             ↓
        │    ┌─────────────────┐
        │    │ Ir a pestaña    │
        │    │ SOURCES         │
        │    │ Poner breakpoint│
        │    └────────┬────────┘
        │             │
        ↓             ↓
┌─────────────────────────────────────────────────┐
│ 3️⃣  LEER EL MENSAJE DE ERROR                   │
│     • Archivo: ¿cuál?                          │
│     • Línea: ¿qué número?                       │
│     • Tipo: ¿TypeError, ReferenceError, etc?   │
└──────────────┬──────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│ 4️⃣  IR AL CÓDIGO                               │
│     Buscar esa línea exacta                     │
│     ¿Qué código hay allí?                       │
└──────────────┬──────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│ 5️⃣  AGREGAR CONSOLE.LOG                        │
│     Imprimir:                                   │
│     • El valor sospechoso                       │
│     • Su tipo (typeof)                          │
│     • Dónde/cuándo cambia                       │
└──────────────┬──────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│ 6️⃣  FORMAR UNA HIPÓTESIS                        │
│     Basado en lo que ves en Console:            │
│     • "Esto es undefined porque..."             │
│     • "Se ejecuta infinitamente porque..."      │
│     • "No se actualiza porque..."               │
└──────────────┬──────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│ 7️⃣  BUSCAR LA CAUSA RAÍZ                        │
│     Mirar el código alrededor                   │
│     ¿Hay un patrón común?                       │
│     • Mutación de arrays                        │
│     • Problemas con tipos                       │
│     • Errores sin manejo                        │
│     • Funciones sin dependencias                │
└──────────────┬──────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│ 8️⃣  APLICAR LA SOLUCIÓN                         │
│     Cambiar el código                           │
│     Guardar archivo                             │
│     App se actualiza (hot reload)               │
└──────────────┬──────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│ 9️⃣  VERIFICAR                                   │
│     ¿Desapareció el error?                      │
│     ¿Funciona correctamente?                    │
│     ¿No hay otros errores?                      │
└──────────────┬──────────────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ↓             ↓
      SÍ            NO
        │             │
        │             ↓
        │      Volver al paso 5️⃣
        │      (agregar más logs)
        │
        ↓
┌─────────────────────────────────────────────────┐
│ ✅ BUG RESUELTO                                 │
│    Pasar al siguiente bug                       │
└─────────────────────────────────────────────────┘
```

---

## 🧠 CHECKLIST DE DEBUGGING

Cuando encuentres un bug, usa esta checklist:

- [ ] **Síntoma:** ¿Qué falla exactamente?
  
- [ ] **Error:** ¿Hay un mensaje en la Console?
  
- [ ] **Línea:** ¿En qué archivo y qué línea?
  
- [ ] **Código:** ¿Qué código hay en esa línea?
  
- [ ] **Datos:** ¿Qué valores tienen las variables?
  
- [ ] **Tipo:** ¿Qué tipo de dato es? (typeof)
  
- [ ] **Lógica:** ¿Es lógicamente correcto?
  
- [ ] **Comparación:** ¿Se comparan cosas del mismo tipo?
  
- [ ] **Estado:** ¿Se está mutando inadecuadamente?
  
- [ ] **Dependencias:** ¿Faltan arrays de dependencias?
  
- [ ] **Errores:** ¿Se están controlando excepciones?
  
- [ ] **Solución:** ¿Qué cambio arreglaría esto?
  
- [ ] **Verificación:** ¿Funciona ahora?

---

## 🎓 ATAJOS DE DEBUGGING EN DEVTOOLS

```
F12                  Abrir DevTools
Ctrl+Shift+J         Abrir Console
Ctrl+Shift+I         Abrir Inspector (Elements)
Ctrl+Shift+P         Abrir Command Palette (Sources)

EN CONSOLE:
console.log()        Imprimir valor
console.table()      Mostrar array en tabla
console.error()      Imprimir error (rojo)
console.warn()       Imprimir advertencia (amarillo)
console.time()       Medir tiempo
console.group()      Agrupar logs

EN SOURCES:
Click en número      Poner breakpoint
F10                  Step over (siguiente línea)
F11                  Step into (entrar en función)
```

---

## 🔗 RELACIONES ENTRE BUGS

```
Bug 1 (undefined)         NO bloquea a los otros
       ↓
       ├─→ Bug 2 (loop) NO bloquea a los otros
       │
       ├─→ Bug 3 (filtro) NO bloquea a los otros
       │
       ├─→ Bug 4 (agregar) NO bloquea a los otros
       │
       └─→ Bug 5 (error) NO bloquea a los otros

IMPORTANTE: Puedes resolver los bugs EN CUALQUIER ORDEN
porque cada uno es independiente (en este código).

En una app real, algunos bugs pueden BLOQUEAR a otros:
Por ejemplo, si Bug 1 hace que la app no cargue,
no podrás ni siquiera probar los demás bugs.
```

---

## 📈 PROGRESO DEL TALLER

```
PARTE 1: Aprender (LEER)
├─ EXPLICACION_DETALLADA.md
├─ GUIA_VISUAL.md
└─ Este archivo (MAPA_MENTAL.md)
    ↓
PARTE 2: Practicar (HACER)
├─ Ejecutar npm run dev
├─ Ver los bugs en la app
└─ Intentar arreglarlo por ti
    ↓
PARTE 3: Verificar (COMPROBAR)
├─ VERIFICACION_EJERCICIOS.md
├─ Completar todos los pasos
└─ Marcar las checkboxes
    ↓
PARTE 4: Aprender más (PROFUNDIZAR)
├─ Leer SOLUCION_COMPLETA.jsx
├─ Comparar con tu solución
└─ Entender las diferencias
    ↓
✅ TALLER COMPLETADO
   Ahora sabes debuggear React
```

---

## 🌟 PUNTOS CLAVE A RECORDAR

1. **Lee los errores completos**
   - No ignores los mensajes de la Console
   - Te dicen EXACTAMENTE dónde está el problema

2. **Console.log es tu mejor amigo**
   - Úsalo antes y después de cambios
   - Úsalo dentro de loops y filters
   - Úsalo para verificar tipos de datos

3. **DevTools es una herramienta poderosa**
   - Console para ver errores y logs
   - Sources para breakpoints
   - Elements para inspeccionar HTML

4. **Los bugs tienen patrones**
   - Undefined: falta una propiedad
   - Loop infinito: falta array de dependencias
   - No funciona: comparan tipos diferentes
   - UI no actualiza: mutación de estado
   - Pantalla congelada: error no manejado

5. **El debugging es un proceso**
   - Observar → Investigar → Entender → Solucionar → Verificar
   - No es "adivinanza", es lógica

---

## 🚀 PRÓXIMOS PASOS

Después de este taller:

1. Debuggea otros proyectos usando estos métodos
2. Enseña a otros cómo debuggear
3. Crea tus propios ejemplos de bugs y soluciones
4. Contribuye a proyectos open source (encontrarás bugs)
5. Lee el código de otros para entender cómo debuggear mejor

---

**Recuerda: El debugging es una habilidad que se mejora con la práctica. ¡Sigue practicando! 🎯**
