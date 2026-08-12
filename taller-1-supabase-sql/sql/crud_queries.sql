-- Ver cursos
SELECT * FROM cursos;

-- Ver estudiantes
SELECT * FROM estudiantes;

-- SELECT columnas específicas
SELECT nombre, edad
FROM estudiantes;

-- WHERE
SELECT *
FROM estudiantes
WHERE edad > 20;

-- ORDER BY
SELECT *
FROM estudiantes
ORDER BY edad DESC;

-- LIMIT
SELECT *
FROM estudiantes
LIMIT 3;

-- JOIN estudiantes + cursos
SELECT 
    estudiantes.nombre AS estudiante,
    estudiantes.edad,
    cursos.nombre AS curso,
    cursos.profesor
FROM estudiantes
INNER JOIN cursos
ON estudiantes.curso_id = cursos.id;

-- COUNT por curso
SELECT curso_id, COUNT(*)
FROM estudiantes
GROUP BY curso_id;

-- LIKE
SELECT *
FROM estudiantes
WHERE nombre LIKE 'A%';

-- Múltiples condiciones
SELECT *
FROM estudiantes
WHERE edad > 20
AND curso_id = 1;

-- UPDATE edad
UPDATE estudiantes
SET edad = 30
WHERE id = 1;

-- UPDATE correo
UPDATE estudiantes
SET email = 'nuevo@email.com'
WHERE id = 2;

-- DELETE estudiante
DELETE FROM estudiantes
WHERE id = 1;
