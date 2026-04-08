create database animaciones_a_las_personas_de_el_metro;
Create table usuario ( id int primary key,
nombre varchar(50),
contraseña varchar(50)
);
Create table comentarios ( id int primary key,
descripcion varchar(50)
);
Create table recomendaciones ( id int primary key,
descripcion varchar(50),
estado varchar(50)
);
Create table trabajadores ( id int primary key,
nombre varchar(50),
funcion varchar(50)
);

//
1.es obligatoria y le colocamos el nombre de nuestro proyecto.
2.se coloca para abrir y se coloca el id ya que es lo principal.
3.lo pusimos para poner el nombre y el vachar de 50 para que pueda poner 50  caracteres.
4.se usa numero porque identifica a cada usuario de forma unica,son maximo 50 caracteres.
5.es para cerrar.
6.es para abrir la tabla de comentarios.
7.texto donde se escriben comentarios de maximo 50 caracteres.
8.es para cerrar.
9.es para abrir la tabla de recomendaciones.
10.es para que los usuarios envien sus recomendaciones,son maximo 50 caracteres.
11.texto que indica "pendiente" o "resuelto",son maximo 50 caracteres.
12.es para cerrar.
13.es para abrir la tabla de trabajadores
14.lo pusimos para poner el nombre y el vachar de 50 para que pueda poner 50  caracteres.
15.texto que describe el trabajo que realiza,son con maximo 50 caracteres.
16.es para cerrar todo.
