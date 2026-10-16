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

  R..com, .dev y .app son genéricos; .co es de Colombia y .com.co es su variante comercial. Cualquiera puede registrar .co y .com.co. El
  requisito especial es de .dev y .app: están en la lista HSTS preload, así que exigen HTTPS. 
( https://www.godaddy.com/help/about-co-domains-5806 · https://kb.porkbun.com/article/96-hsts-preload-and-google-registry)

¿Qué es WHOIS y la privacidad de dominio?

R: WHOIS es la base pública con los datos del titular del dominio. La privacidad publica datos de contacto alternos en vez de los 
(https://www.icann.org/en/resources/compliance/complaints/whois/privacy-proxy-registration)

¿Qué son los nameservers y qué es “apuntar el dominio”?

R:Son los servidores DNS que responden por tu dominio. Apuntar es reemplazar los nameservers del registrador por los del nuevo proveedor, 
sin transferir el dominio. Copia antes tus registros DNS. 
(https://www.namesilo.com/blog/en/how-to-connect-your-domain-to-cloudflare · https://developers.cloudflare.com/dns/nameservers/index.md)

Precios reales de .com y .co en dos registradores. ¿Por qué cambia la renovación?

R:
       	Porkbun	              Namecheap
.com   	10,08 → 11,08	        6,79 → 14,78
.co    	14,76 → 31,20     	   11,98 → 39,98 

( https://domainoffer.net/tld/com/porkbun · https://domainoffer.net/tld/co/namecheap)

4. HTTPS y certificados

¿Qué es TLS/SSL y qué protege?

R:Da cifrado, integridad y autenticación a los datos en tránsito entre el navegador y el servidor. 
securityscientist
( https://www.securityscientist.net/blog/12-questions-and)

¿Qué es una CA y qué es Let’s Encrypt?

R: Una CA emite certificados tras verificar al solicitante. Let’s Encrypt es una CA que ofrece certificados DV, gratis y automáticos. 
( https://letsencrypt.org/docs/faq/)

Diferencia entre DV, OV y EV.

R: DV verifica solo el control del dominio; OV agrega el nombre de la organización; EV exige la verificación más rigurosa. 
(https://enterno.io/en/articles/ssl-certificate-types)

¿Qué es un certificado wildcard?

R: Cubre un dominio y todos sus subdominios de un nivel. En Let’s Encrypt se valida con DNS-01 (registro TXT). 
(https://hostingchecker.net/blog/understanding-ssl-certificate-types)

¿Qué significa “certificado no válido para este nombre”?

R: El certificado es válido, pero no es para el hostname que pediste. Con dominios personalizados suele pasar porque la plataforma aún no emitió el certificado (DNS sin propagar). 
(https://stackharbor.com/en/knowledge-base/cpfix-err-cert-common-name-invalid-wrong-cert/)

¿Qué es HSTS?

R: Es un header que le indica al navegador que solo use HTTPS con ese sitio. 
w3cub
(https://docs.w3cub.com/http/headers/strict-transport-security)

5. Modelos de alojamiento

 Explica cada modelo (ventajas, desventajas, uso).

R. 
Modelo       	                    Ventajas	                  Desventajas	                              ¿Cuándo usarlo?

Compartido                       Barato y sin             Sin root; falla con picos de tráfico o       Blog o portafolio, WordPress
(Hostinger, cPanel)           administrar servidor	       vecinos ruidosos	                    

VPS                              CPU/RAM dedicadas          Tú configuras seguridad                    Control total o varias apps 
(Droplet, Linode, EC2           y acceso root               y mantenimiento	                           en un servidor

Dedicado (OVH, Hetzner)        Recursos exclusivos          Más complejo de mantener;                              
                                  y predecibles              pagas la máquina completa

¿Qué es un CDN y qué resuelve?

R: Una red de servidores que cachea contenido cerca del usuario, reduciendo latencia y carga del servidor de origen. 
cloudflare
( https://developers.cloudflare.com/reference-architecture/architectures/cdn/index.md)

Sitio estático vs. dinámico/SSR.

R: El estático sirve archivos ya generados. El dinámico o SSR genera la respuesta en el servidor en cada petición.
(https://quasar.dev/quasar-cli-vite/developing-ssg/deploying)

¿Por qué una app Vite/CRA compilada es un sitio estático?

R: El build genera una carpeta dist/ desplegable en cualquier lugar: son solo archivos, sin React corriendo en el servidor. 
hostinger
(https://www.hostinger.com/tutorials/?p=148062)

¿Qué es una SPA y por qué da 404 al recargar /dashboard?

R: Es una app con un solo index.html y rutas manejadas en el navegador. Al recargar, el hosting busca un archivo con esa ruta en vez de servir index.html. Se arregla con un fallback a index.html. 
rapidevelopers
(https://www.rapidevelopers.com/md/lovable-issues/fixing-404-errors-on-page-refresh-in-lovable-spas)

6. Comparativa de plataformas

 Compara GitHub Pages, Netlify, Vercel, Cloudflare Pages y Render.

	



Cuál elegirías y por qué?

R: Para una SPA React/Vite con Supabase, Cloudflare Pages: ancho de banda ilimitado, SPA resuelto, previews ilimitados y uso comercial permitido. Su límite es 500 builds al mes.
(https://developers.cloudflare.com/pages/platform/limits)

7. Supabase en producción

¿Qué es un BaaS y qué ofrece Supabase?

R: Un BaaS da el backend ya armado. Supabase incluye Postgres, Auth, Storage, Realtime y Edge Functions.
(https://makerkit.dev/blog/saas/supabase-pricing)

 anon key vs. service_role. ¿Cuál va en el frontend?

R: La anon va en el frontend: es segura con RLS activado. La service_role jamás: se salta RLS y solo va en el backend. Ambas se están deprecando a fin de 2026 a favor de las llaves publishable y secret. 
(https://supabase.com/docs/guides/database/secure-data · https://supabase.com/docs/guides/api/api-keys)

¿Qué es RLS y por qué es obligatorio?

R: Es control de acceso por fila en Postgres. Es obligatorio porque Supabase expone la base de datos directamente a los clientes, y la llave pública del navegador la puede usar cualquiera. 
(https://makerkit.dev/docs/next-supabase/row-level-security)

Política RLS para leer y editar solo las propias filas.

R:
sql
alter table public.tasks enable row level security;

create policy "Leer mis filas" on public.tasks
  for select to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Editar mis filas" on public.tasks
  for update to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

(https://supabase.com/docs/guides/database/postgres/row-level-security)

CORS y Site URL/Redirect URLs. ¿Qué pasa sin la URL de producción?

R: En Edge Functions el CORS se maneja manualmente. El Site URL viene por defecto en localhost:3000 y hay que cambiarlo a producción. Si no, los redirects van a localhost o Supabase los bloquea. 
(https://supabase.com/docs/guides/functions/cors.md · https://supabase.com/docs/guides/auth/redirect-urls.md)

 Límites del plan gratuito de Supabase.

R: 2 proyectos, 500 MB de base, 1 GB de storage, 50.000 usuarios activos/mes, y pausa tras una semana de inactividad. 
(https://supabase.com/docs/pricing · https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/9

8. Variables de entorno y seguridad

¿Qué es una variable de entorno y por qué .env va en .gitignore?

R: Es configuración fuera del código (claves, URLs). Va en .gitignore porque puede contener variables sensibles y Git guarda el historial para siempre. 
(https://vitejs.dev/guide/env-and-mode)

¿Por qué VITE_ y qué implica?

R: Solo las variables con ese prefijo llegan al cliente, y como se reemplazan en el build, quedan visibles en el JS: todo lo VITE_ es público. 
(https://vitejs.dev/guide/env-and-mode)

Secreto de build vs. secreto de runtime.

R: El de build se incrusta al compilar; en una SPA queda público. El de runtime vive en un servidor y sigue privado, por ejemplo en una Edge Function. 
(https://rapidevelopers.com/supabase-tutorial/how-to-use-supabase-edge-functions)

¿Qué hacer si subiste una clave a Git?

R: Rota la clave primero: asume que ya está comprometida. Luego limpia el historial, porque borrar o revertir no la quita de commits anteriores. 
(https://techearl.com/git-remove-secret-from-history)

9. Build y despliegue

¿Qué hace npm run build y qué contiene dist/?

R: Empaqueta, minifica y aplica tree shaking, y deja el resultado en dist/, listo para desplegar: index.html y JS/CSS compilados. 
hostinger
( https://www.hostinger.com/tutorials/?p=148062)

Minificación, tree shaking, code splitting y hashing.

R:
Minificación: reduce tamaño quitando espacios y acortando nombres. 
hostinger
Tree shaking: elimina código que nunca se llama. 
hostinger
Code splitting: divide la app en fragmentos para cargar solo lo necesario. 
hostinger
Hashing: agrega un hash al nombre de archivo para cachear sin servir versiones viejas. 
hostinger

(https://www.hostinger.com/tutorials/?p=148062)

¿Qué es CI/CD y GitHub Actions?

R: CI/CD es compilar, probar y publicar automáticamente cada cambio. GitHub Actions es el sistema de GitHub para definir esos flujos en archivos YAML (.github/workflows/).
(https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

 Desplegar desde rama (gh-pages) vs. workflow de Actions.

R: Con rama, cada push a la rama publica la carpeta elegida. Con Actions controlas el build y despliegas con actions/deploy-pages, sin rama de compilados, y sin el límite de 10 builds por hora. 


( https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site · https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
