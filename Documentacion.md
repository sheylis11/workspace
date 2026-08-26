ACTIVIDAD

1)Averiguar como se documenta codigo explicando diferencias entre Back-end y Front-end

R//

#Front-end

El Front-end es la parte de una aplicación con la que interactúa directamente el usuario, como botones, formularios, menús y páginas web.

Para documentarlo se suele explicar:

-Qué hace cada componente o elemento de la interfaz.
-Qué propiedades recibe.
-Qué eventos maneja.
-Qué funciones utiliza.
-Cómo se comunica con el Back-end.
-Qué datos muestra o modifica.
-También es común utilizar comentarios y herramientas como JSDoc para documentar funciones y componentes.

#BACK-END

El Back-end es la parte que funciona detrás de la aplicación y se encarga de procesos como bases de datos, autenticación y APIs.

Para documentarlo se suele explicar:

-Qué hace cada función o módulo.
-Qué datos recibe y devuelve.
-Cómo funcionan los endpoints de una API.
-Qué parámetros necesita cada solicitud.
-Qué errores puede producir.
-Cómo se conecta con la base de datos.
-Qué reglas de negocio implementa.

DIFERENCIA PRINCIPAL: en Front-end la documentación se concentra más en la interfaz, componentes y comportamiento que ve o utiliza
el usuario; en Back-end se concentra en la lógica, APIs, datos, servicios y procesos internos.



2)Averiguar como se documenta codigo para Javascript

R//En JavaScript se puede documentar mediante comentarios normales y, especialmente, mediante JSDoc.
En JSDoc se utilizan etiquetas como:

-@param: explica los parámetros que recibe una función.
-@returns: explica qué devuelve.
-@type: indica el tipo de una variable.
-@throws: indica qué errores puede producir.
-@example: proporciona un ejemplo de uso.
-@deprecated: indica que una función ya no debería utilizarse.

La ventaja de JSDoc es que, además de ayudar a los programadores, permite generar documentación automáticamente y facilita que los 
editores de código proporcionen información sobre las funciones.



3)Averigua como se documenta codigo pare react en espesifico

R//En React, la documentación se centra principalmente en componentes, props, estado, hooks y funciones.

En proyectos React es recomendable documentar:

-Componentes: explicar para qué sirve cada componente.
-Props: indicar qué información recibe y qué tipo de dato espera.
-Hooks: explicar para qué se utilizan hooks personalizados.
-Eventos: explicar acciones como onClick, onChange, etc.
-Estado: explicar qué información almacena y cómo se modifica.
-Funciones: documentar las funciones importantes.
-APIs: explicar qué información obtiene o envía el componente.

Ejemplos: mostrar cómo utilizar los componentes.

Además de JSDoc, en proyectos React se pueden utilizar herramientas como Storybook para documentar y mostrar visualmente componentes 
de interfaz.
