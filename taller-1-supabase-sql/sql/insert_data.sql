-- Insertar cursos
INSERT INTO cursos (nombre, profesor)
VALUES
('React Básico', 'Carlos'),
('Base de Datos', 'Laura'),
('JavaScript Avanzado', 'Andrés');

-- Insertar estudiantes
INSERT INTO estudiantes (nombre, edad, email, curso_id)
VALUES
('Ana', 20, 'ana@email.com', 1),
('Luis', 22, 'luis@email.com', 2),
('María', 19, 'maria@email.com', 1),
('Pedro', 25, 'pedro@email.com', 3);
