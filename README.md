# reserva-salas-interbrain

Aplicación para prueba técnica de InterBrain

La consigna consistía en desarrollar un sistema sencillo a modo de demo para la gestión de reservas de salas. Es decir, que permita elegir una fecha y hora, para una sala determinada y asignarle a la reserva una hora vinculada a una persona. 

Algunas consideraciones que tuve en cuenta sobre el modelo de negocio fueron:
- Las salas se encuentran cargadas en la base de datos, en este caso solo hay 5 salas.
- Una reserva solo puede ser en los horarios especificados en el formulario de creación de reservas.
- La aplicación cuenta con dos componentes: una lista de todas las reservas existentes y un formulario para crear una nueva reserva.

Mi solución se encuentra adjuntada en este repositorio, a continuación detallo un poco más sobre ella:

Link a la aplicación: https://quiet-waters-15017.herokuapp.com

# Tecnologías y lenguajes utilizados:

## Backend: Node.js, Sequelize, MySQL

- Para desarrollar el backend, tomé la decisión de utilizar Node.js, aprovechando el desafío para adquirir un poco más de conocimiento sobre el lenguaje. 
- Para persistir las reservas a una base de datos y realizar migraciónes de tablas utilicé Sequelize, un ORM bastante adecuado a mis necesidades y Sequelize-CLI como dependencia de desarrollo.
- Como motor de base de datos utilicé MySQL.
- Las variables de entorno del servidor que relizan la conexión con la base de datos estan configuradas con dotenv.

## Frontend: Angular 11, Angular Material y Bootstrap 5

- Decidí utilizar Angular por los mismos motivos que elegí Node como lenguaje de backend, para aumentar un poco más mi conocimiento sobre ellos, ya que en ambos casos mi dominio es bastante básico.
- Desarrolé dos componentes principales, uno es 'reservas', en el cual está toda la lógica del formulario de creación de reservas, el otro es 'reservas-list', donde se muestra una lista con todas las reservas y se puede cancelar cualquiera de ellas. 
- Bootstrap 5 es un framework bastante útil que simplifica la creación de la mayoría de componentes que se utilizan al crear una página web.
- Angular Material facilita muchos componentes con una gran variedad de comportamientos para los mismos.

## Deploy de la app en Heroku

- Tomé la decisión de realizar un deploy en la plataforma Heroku, la cual provee addons como JawsDB MySQL, para hostear una base de datos en MySQL y así poder guardar las reservas en ella

### Espero les guste mi solución a la consigna, muchas gracias por la oportunidad!
