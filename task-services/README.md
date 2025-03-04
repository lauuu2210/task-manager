# Prueba técnica Imatia
# [task-services] https://github.com/

## Tabla de Contenidos
- Funcionalidades implementadas de base en el servicio.
- Decisiones tomadas en el desarrollo. 
- Procedimientos de instalación y ejecución.
- Ejemplos de la API.

## Funcionalidades implementadas de base en el servicio

Las funcionalidades implementadas son: 
- Obtención de una tarea por su identificador.
- Obtener un listado de todas las tareas guardadas en memoria.
- Introducir una nueva tarea en memoria.
- Actualizar una tarea de la memoria por su identificador.
- Actualizar el estado de la tarea en memoria por su identificador.
- Eliminar una tarea de memoria.

Asimismo, los diferentes tipos de tareas, estados de las mismas y prioridades se guardan en memoria para que su actualización y cambio en posteriores modificaciones sean más sencillos. Por lo tanto, tambien podremos obtener:
- Listado de tipos de tareas.
- Listado de estados por los que puede pasar una tarea.
- Listado de prioridades que puede tener una tarea.

La base de datos utilizada es H2 en memoria, es decir, una vez que tiremos el servicio dejarán de existir los registros
que fuesen creados. En el fichero src/main/resources/schema.sql se dispone del script con los datos con los que queremos
que arranque el servicio.

## Decisiones tomadas en el desarrollo
- Se ha decidido guardar las listas de tipos, estado y prioridades, en lugar de en la base de datos, en el propio controlador; todo esto para simplificar la arquitectua pero hacer que la ampliación de la misma sea más sencilla a la hora de añadir alguno de estos parámetros.
- Todos los parametros de la tarea son obligatorios.
- El usuario puede modificar la fecha de finalización, tanto a la hora de introducir la tarea como al modificarla, aunque por defecto se introducira la actual.

## Procedimientos de instalación y ejecución
Una vez descargado el proyecto, debemos de cumplir los siguientes requisitos:
- Tener Java 17 instalado.
- Tener Maven a partir de la version 3.6.0 instalado.

Posteriormente, habrá que ejcutar el comando "mvn clean install" desde la consola
de comandos estando en el directorio raiz del proyecto.

Con ello debería de levantarse el servicio. 
Para obtener las peticiones disponibles del mismo: http://localhost:8080/api/

## Ejemplos de la API
**http://localhost:8080/api/tasks**
- Body respuesta:
{
  "id":"da75a13a-aa95-11ec-b909-0242ac120002",
  "date":"2022-03-16T23:00:00.000+00:00",
  "name":"Tarea por defecto",
  "description":"Primera tarea por defecto creada",
  "type":"Task",
  "status":"To Do",
  "priority":"Low"
  }