DROP TABLE IF EXISTS TASKS;

CREATE TABLE TASKS (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  date TIMESTAMP NOT NULL,
  name VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  priority VARCHAR(50) NOT NULL,
  description VARCHAR(500) NOT NULL
);

INSERT INTO
  TASKS
VALUES
  (
    'da75a13a-aa95-11ec-b909-0242ac120002',
    '2022-03-17 00:00:00.000000000',
    'Tarea por defecto',
    'To Do',
    'Task',
    'Low',
    'Primera tarea por defecto creada'
  );

INSERT INTO
  TASKS
VALUES
  (
    'da75a13a-aa95-11ec-b909-0242ac120003',
    '2022-03-18 00:00:00.000000000',
    'Diseño de logotipo',
    'To Do',
    'Epic',
    'Medium',
    'Diseño de un logotipo para una empresa'
  );

INSERT INTO
  TASKS
VALUES
  (
    'da75a13a-aa95-11ec-b909-0242ac120004',
    '2022-03-22 00:00:00.000000000',
    'Investigación de mercado',
    'To Do',
    'Research',
    'High',
    'Investigación de las tendencias del mercado en la actualidad para la realización de una aplicación'
  );

INSERT INTO
  TASKS
VALUES
  (
    'da75a13a-aa95-11ec-b909-0242ac120005',
    '2022-03-15 00:00:00.000000000',
    'Desarrollo de software',
    'To Do',
    'Task',
    'Low',
    'Desarrollo de la aplicación que encaje en las tendencias de mercado estudiadas en el último año'
  );

INSERT INTO
  TASKS
VALUES
  (
    'da75a13a-aa95-11ec-b909-0242ac120006',
    '2022-03-11 00:00:00.000000000',
    'Creación de presupuesto',
    'To Do',
    'Epic',
    'Medium',
    'Elaboración del presupuesto para ofrecerselo al un cliente correspondiendo con los requisitos especificados en la reunión anterior'
  );

INSERT INTO
  TASKS
VALUES
  (
    'da75a13a-aa95-11ec-b909-0242ac120007',
    '2022-06-10 00:00:00.000000000',
    'Investigación de competidores',
    'To Do',
    'Research',
    'High',
    'Realizar un estudio completo de los productos de los competidores'
  );

INSERT INTO
  TASKS
VALUES
  (
    'da75a13a-aa95-11ec-b909-0242ac120033',
    '2022-03-18 00:00:00.000000000',
    'Formula 1',
    'In Progress',
    'Epic',
    'Let him cook',
    'Fernando Alonso va a conseguir la victora 33. ¿Como que 33?'
  );

INSERT INTO
  TASKS
VALUES
  (
    'da75a13a-aa95-11ec-b909-0242ac120022',
    '2023-03-30 00:00:00.000000000',
    'Desarrollo aplicación tipo trello',
    'Done',
    'Epic',
    'Let him cook',
    'Realización del proyecto propuesto, desarrollo de una aplicación estilo Trello de gestión de tareas'
  );