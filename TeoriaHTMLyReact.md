ACTIVIDAD.

1)HTML.

-Cuales so las etiquetas de estructura de un HTML.

R//
- <!DOCTYPE html>: declara que el documento es HTML5.
- <html>: etiqueta base que envuelve todo el contenido.
- <head>: contiene datos no visibles en pantalla como: título, enlaces a CSS, meta tags, etc.
- <title>: define el título que aparece en la pestaña del navegador.
- <meta>: información sobre el documento (charset, viewport, descripción, etc.).
- <body>: contiene todo el contenido visible de la página.
- <header>: encabezado de la página o de una sección.
- <nav>: menú de navegación.
- <main>: contenido principal de la página.
- <section>: agrupa contenido relacionado temáticamente.
- <article>: contenido independiente y auto-contenido (un post, una noticia).
- <aside>: contenido secundario (barra lateral).
- <footer>: pie de página.
- <div>: contenedor genérico sin significado semántico, usado para agrupe la ejecución del programa.

-Cuales son las etiquetas para agregar codigo.

R//
<script>: para insertar o enlazar código JavaScript. 
<style>: para insertar CSS directamente en el HTML.
<link>: para enlazar archivos externos, como hojas de estilo CSS. 
<code>: para mostrar fragmentos de código en el texto visible.
<pre>: para mostrar texto preformateado muy usado junto con <code>.

  -Explica 5 etiquetad de texto.
  
  R//
  
- <h1> a <h6>: títulos y subtítulos, de mayor (h1) a menor (h6) rango
- <strong>: resalta texto con importancia semántica fuerte (se ve en negrita).
- <em>: enfatiza texto (se ve en cursiva), con significado semántico de énfasis.
- <span>: contenedor de texto en línea sin significado propio, usado para aplicar estilos o comportamientos a una parte específica del texto.

  2)JAVASCRIPT.
-Explica como funcionan las variables, tipos de variable, constantes y globales.

  R//

  ¿como funciona?
Espacios de memoria donde se guardan datos que pueden cambiar durante la ejecución del programa.

 variables.
- let: variable de alcance de bloque, se puede reasignar.
- var: forma antigua de declarar variables, alcance de función (no de bloque), puede causar errores por eso ya no se recomienda.
- const: declara una constante, un valor que no se puede reasignar una vez definido

 Tipos de variables. 
- String: cadenas de texto → "hola"
- Number: números enteros o decimales → 10, 3.5
- Boolean: verdadero o falso → true, false
- Array: listas de datos → [1,2,3]
- Object: colecciones de pares clave-valor → {nombre: "Ana", edad: 25}
- Undefined: variable declarada sin valor asignado.
- Null: representa "ningún valor" intencionalmente.

  Constantes y globales.
Globales: se declaran fuera de cualquier función, pueden ser accedidas desde cualquier parte del código.
Locales: se declaran dentro de una función o bloque, solo existen y son accesibles dentro de ese espacio.

  -explica las estructuras de flujo.

  R//
  
- Condicionales:tome decisiones y ejecute distintos bloques de código según si se cumple o no una condición.
- Switch (para múltiples opciones):
- Bucles/ciclos (repiten código):

  3)CSS.
    
-Consulta sectores CSS y modifica como modifican elementos.

   R//
  
-Selector	                            -Ejemplo	                                                    -Qué modifica
Etiqueta (tipo)                      	p { color: blue; }	                                           Todos los elementos <p>
Clase	                                .destacado{ color: red; }	                                     Todos los elementos con class="destacado"
ID	                                  #titulo { font-size: 2em; }	                                   El único elemento con id="titulo"
Universal                            	* { margin: 0; }	                                             Absolutamente todos los elementos
Descendiente	                        div p { }                                                      Los <p> que estén dentro de un <div>
Hijo directo	                        div > p { }	                                                   Solo los <p> que son hijos directos de <div>
Pseudo-clase	                        a:hover { }	                                                   Estilo cuando el cursor pasa sobre el enlace
Pseudo-elemento	                      p::first-line { }	                                             Solo la primera línea del párrafo
Atributo	                            input[type="text"] { }	                                       Elementos que tienen ese atributo específico


  4)REACT
-Hacer una analogia explicativa de un componente de REACT de como se comporta una etiqueta de HTML.

R//
Un componente de React se comporta como una receta personalizada, mientras que una etiqueta HTML es como un ingrediente fijo de la despensa.
La etiqueta HTML ya viene lista, siempre es igual y solo se puede usar tal como es. El componente de React, en cambio, es una combinación de
esos ingredientes (etiquetas) organizada según instrucciones propias, que puede variar su resultado dependiendo de lo que se le indique, y 
que se puede reutilizar tantas veces como se necesite, obteniendo un resultado distinto cada vez según lo que se le entregue.

  -Consulta como funcionan los props en los componentes de REACT.

  R//
Los props (properties) son la forma en que un componente padre le pasa datos a un componente hijo.
Son de solo lectura: el hijo no puede modificarlos directamente.Esto permite reutilizar el mismo componente con datos diferentes cada vez,
igual que una función que recibe parámetros.

-Como y cuando se usa UseEfect en un componente de React.

R//
useEffect sirve para ejecutar código que produce efectos secundarios: cosas que ocurren fuera de lo normal,
  como llamadas a APIs, suscripciones, manipulación del DOM, temporizadores, etc.

- Con [] vacio: se ejecuta una sola vez, al montar el componente.
- Con dependencias [variable]: se ejecuta cada vez que esa variable cambia.
- Sin []: se ejecuta en cada renderizado (poco común, hay que usarlo con cuidado).
- Se usa cuando necesitas sincronizar el componente con algo externo: peticiones a servidores,
eventos del navegador, temporizadores, etc.

-Como de usa Usestate para las variables de un componente

  R//

  UseState permite que un componente tenga estado propio: datos que, cuando cambian,
  hacen que el componente se vuelva a renderizar automáticamente mostrando la información actualizada. contador es la variable de estado (valor actual).
  setContador es la función que se usa para actualizar ese valor.Cada vez que se llama a setContador, React vuelve a renderizar el componente con el nuevo valor.

  
