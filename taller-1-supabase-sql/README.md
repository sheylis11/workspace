# Taller 1 — Supabase + SQL CRUD

## Objetivos
Aprender a:
- Crear proyectos en Supabase
- Crear tablas SQL
- Relacionar tablas
- Insertar datos
- Consultar datos
- Actualizar registros
- Eliminar registros
- Realizar consultas SQL complejas
- Comprender cómo Supabase genera APIs automáticamente
- Entender la importancia de las relaciones entre tablas

## Estructura del taller
- `sql/create_tables.sql` — creación de tablas `cursos` y `estudiantes`
- `sql/insert_data.sql` — datos iniciales para ambas tablas
- `sql/crud_queries.sql` — ejemplos CRUD y consultas avanzadas
- `supabase-api/` — scripts Node.js para consumir la API REST de Supabase

## Instrucciones generales

### Parte 1 — Crear tablas en Supabase
1. Abrir Supabase en https://supabase.com
2. Crear una cuenta y un nuevo proyecto
3. Abrir el SQL Editor
4. Ejecutar el contenido de `sql/create_tables.sql`

### Parte 2 — Insertar datos iniciales
Ejecutar el contenido de `sql/insert_data.sql`

### Parte 3 — Consultar datos
Usar las consultas en `sql/crud_queries.sql` para revisar la tabla `cursos` y `estudiantes`.

### Parte 4 — Consumir la API REST
1. En Supabase, ir a `Settings` → `API`
2. Copiar el `Project URL` y la `anon public key`
3. En la carpeta `supabase-api/`, crear un archivo `.env` o exportar las variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
4. Ejecutar los scripts con Node.js:
   - `npm install` dentro de `supabase-api/`
   - `npm run get`
   - `npm run post`
   - `npm run patch`
   - `npm run delete`

### Parte 5 — Ejercicios prácticos
- Insertar 5 estudiantes nuevos usando SQL
- Insertar 3 cursos nuevos usando SQL
- Crear consultas con `WHERE`, `ORDER BY`, `LIMIT`, `JOIN`, `GROUP BY`, `LIKE`
- Actualizar nombres y profesores
- Cambiar estudiantes de curso
- Eliminar estudiantes o cursos incorrectos

## Buenas prácticas
- Siempre validar datos antes de insertar o actualizar
- Usar relaciones `FOREIGN KEY` para mantener integridad referencial
- No borrar datos sin comprender su impacto en la base de datos
- Usar `console.table` en los scripts Node.js para leer resultados fácilmente
