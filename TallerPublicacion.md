taller

Parte 1 — Investigación teórica

 1. Cómo llega un usuario a tu sitio
    
  - Qué pasa, paso a paso, desde que alguien escribe una URL en el navegador hasta que ve la página. Menciona: resolución DNS,
 conexión TCP, handshake TLS, petición HTTP, respuesta.

R.Resolución DNS: el navegador busca la dirección IP asociada al dominio que escribimos, por ejemplo, www.google.com. El DNS traduce el nombre del dominio a una dirección que permite localizar el servidor.
Conexión TCP: el navegador establece una conexión con el servidor mediante un proceso de tres pasos llamado handshake TCP (SYN, SYN-ACK y ACK). Esto permite iniciar una comunicación fiable.
Handshake TLS: si la página utiliza HTTPS, el navegador y el servidor negocian una conexión cifrada. Además, el navegador verifica el certificado digital del servidor para comprobar su identidad.
Petición HTTP: una vez establecida la conexión, el navegador envía una solicitud HTTP, normalmente mediante el método GET, para pedir el contenido de la página.
Respuesta HTTP: el servidor procesa la solicitud y devuelve una respuesta con un código de estado, como 200 OK, y el contenido solicitado.
Visualización de la página: el navegador interpreta el HTML, aplica los estilos CSS, ejecuta JavaScript y carga recursos como imágenes. Finalmente, muestra la página web en pantalla.
(https://developer.mozilla.org/es/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works )

    Partes de una URL: esquema, subdominio, dominio, TLD, puerto, ruta, query string, fragmento.
R.Esquema (https://): indica el protocolo utilizado para acceder al recurso. HTTPS cifra la comunicación.

Subdominio (blog): identifica una sección o servicio del dominio.

Dominio (ejemplo): es el nombre principal del sitio web.

TLD (.com): es el dominio de nivel superior, situado al final del nombre.

Puerto (:8080): indica el puerto del servidor al que se conecta el navegador. En HTTP y HTTPS suelen utilizarse los puertos 80 y 443, respectivamente.

Ruta (/articulos/web): señala el recurso o la sección solicitada dentro del sitio.

Query string (?id=25): contiene parámetros que pueden enviar información al servidor; en este ejemplo, id tiene el valor 25.

Fragmento (#introduccion): permite dirigirse a una sección específica de la página. Normalmente, no se envía al servidor en la petición HTTP.
( https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL )

Diferencia entre **dominio**, **subdominio** y **hosting**. ¿Por qué se contratan por separado?

R.
Diferencia entre dominio, subdominio y hosting
Dominio: es el nombre o dirección principal de un sitio web, por ejemplo, ejemplo.com. Permite que las personas encuentren el sitio sin tener que recordar su dirección IP.

Subdominio: es una sección o dirección adicional que pertenece al dominio principal, por ejemplo, blog.ejemplo.com o tienda.ejemplo.com. Se utiliza para organizar diferentes servicios o secciones de una página web.

Hosting (alojamiento web): es el servicio que proporciona espacio y recursos en un servidor para guardar los archivos de una página web y permitir que las personas accedan a ella por Internet.

¿Por qué se contratan por separado?
El dominio se registra con un proveedor para reservar el nombre y mantener el derecho a utilizarlo.

El hosting se contrata para almacenar los archivos y mantener la página disponible en Internet.

El subdominio normalmente se crea y configura desde la administración del dominio, sin necesidad de comprar otro dominio. Puede dirigir a otro servidor o servicio.
(https://developers.cloudflare.com/fundamentals/manage-domains/)

2. DNS

  Qué es el DNS y por qué se le llama "la agenda de contactos de internet".
  
  R. el DNS es como la agenda de contactos de Internet, porque permite que las personas accedan a los sitios web usando nombres fáciles de recordar,
  en lugar de tener que escribir direcciones IP numéricas.
  (https://tecnetone.com/glosario/dns)

 Jerarquía: root servers → TLD servers → servidores autoritativos → resolver recursivo.
  R.La jerarquía de servidores DNS está formada por los servidores raíz, los TLD, los autoritativos y el resolver recursivo. Estos trabajan juntos
  para convertir nombres de dominio, como google.com, en direcciones IP que permiten a las computadoras comunicarse. Cuando buscas una página web, estos servidores colaboran para encontrar la dirección correcta.
(https://sys4net.com/blog/que-es-un-servidor-dns/)

 Tipos de registro. Explica para qué sirve cada uno y da un ejemplo del valor que llevaría:
  - `A` y `AAAA`
  - `CNAME`
  - `ALIAS` / `ANAME` (y por qué existen si ya hay CNAME)
  - `MX`
  - `TXT` (incluye SPF, DKIM y verificación de propiedad de dominio)
  - `NS`
  - `SOA`

  - R.Tipos de registros DNS
A: relaciona un dominio con una IPv4. Ejemplo: 192.0.2.10.

AAAA: relaciona un dominio con una IPv6. Ejemplo: 2001:db8::10.

CNAME: apunta un subdominio a otro dominio. Ejemplo: www.midominio.com → midominio.com.

ALIAS / ANAME: permiten apuntar el dominio principal a otro dominio. Existen porque un CNAME tradicional tiene restricciones en el dominio raíz.

MX: indica el servidor que recibe los correos. Ejemplo: 10 mail.midominio.com.

TXT: almacena textos para SPF (autoriza remitentes de correo), DKIM (verifica firmas de correo) y propiedad del dominio. Ejemplo: v=spf1 include:_spf.google.com ~all.

NS: indica los servidores DNS del dominio. Ejemplo: ns1.proveedor.com.

SOA: contiene información administrativa de la zona DNS, como el servidor principal y los tiempos de actualización.
(https://www.cloudflare.com/es-la/learning/dns/dns-records/)

- Qué es el **TTL** y por qué un cambio de DNS "no se ve de inmediato".

R.El TTL es el tiempo, medido en segundos, que una dirección IP se guarda en caché antes de que el DNS tenga que consultarla nuevamente.
(https://www.ibm.com/mx-es/think/topics/time-to-live)

 Qué es la **propagación DNS** y cuánto suele tardar realmente.

 R.La propagación DNS es el proceso por el cual los cambios de un dominio se actualizan poco a poco en los servidores DNS de Internet.
 (https://es.wikipedia.org/wiki/Propagaci%C3%B3n_de_DNS)

 3. Dominios

Qué es un **registrador** (registrar) y qué diferencia hay con un proveedor de DNS y con un hosting.

R.
Registrador (registrar): es una empresa autorizada para registrar nombres de dominio, como ejemplo.com. Permite comprar o renovar el registro de un dominio y administrar su titularidad.

- Proveedor de DNS: es el servicio que administra los registros DNS de un dominio. Estos registros indican, por ejemplo, a qué dirección IP debe dirigirse el navegador o qué servidores reciben el correo electrónico.

- Hosting (alojamiento web): es el servicio que proporciona un servidor para almacenar los archivos, las imágenes, el código y otros recursos de una página web, de modo que los visitantes puedan acceder a ella.

  ¿Cuál es la diferencia?

  Registrador: Registrar y renovar el nombre del dominio.
  Proveedor de DNS:Indicar a qué servidores se dirige el dominio.
  Hosting: Guardar los archivos y ejecutar la página web.
  (https://www.icann.org/resources/pages/domain-name-industry-2017-06-20-en)

   TLD genéricos vs. de código de país (`.com`, `.dev`, `.app`, `.co`, `.com.co`). ¿Cuáles tienen requisitos especiales?

  R.
