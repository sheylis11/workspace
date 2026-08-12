-- Crear tabla cursos
CREATE TABLE cursos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    profesor VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT true
);

-- Crear tabla estudiantes
CREATE TABLE estudiantes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT,
    email VARCHAR(150) UNIQUE,
    curso_id BIGINT,
    CONSTRAINT fk_curso
        FOREIGN KEY(curso_id)
        REFERENCES cursos(id)
);
