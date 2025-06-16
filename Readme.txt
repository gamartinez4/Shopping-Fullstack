Para ejecutar el proyecto solo es necesario ejecutar los query sql , cambiar la ruta del string a la base de datos que este usando en el proyecto .NET y lanzar la aplicacion react en el puerto 3000 como localhost, igualmente, revisar que se este lanzando el puerto 5001 de las apis de .net. 

Opciones de mejora:


.NET: 
- Utilizar abstracciones en vez de clases como dependencias. Por tiempo no pude hacerlo pero la idea es que en la inyeccion de dependencias de .net se espcifique la clase para cada abstraccion y que los parametros sean propiamente una abtrasccion y no una clase para evitar la dependencias de clases

- Utilizar middleware y atributos para la verificacion de por ejemplo, Tokens de acceso. 

- En los repositorios, dejar metodos mas simples que representen las consultas posibles y no casos muy especificos como si fuera un caso de uso. Tambien por ejemplo, tener la capa de casos de uso propiamente donde se llamen esos repositorios. 

- No depender de entidades diferentes para cada repositorio, (por ejemplo en el repositorio de usuario tengo una Lista de orednes como parametro) esto puede funcionar para "casos urgenetes" pero lo ideal en una buena implementacion es que si va a necesitarse el modelo, es mejor crear un modelo como dtos o alguna libreria de modelos intermedios pero no de una entidad de dominio

-Manejar mejor los errores 

REACT:

- En general lo ideal es tener para cada pagina su view model  en donde se manejara el consumo de apis y de acceso de datos en general. Sin embargo las ultimas vistas que hice ya por tiempo no cumpli esa idea, pero en las primeras trate de dejar un poco la idea de como debe ser

- Las constantes de graph ql en general se ponen en una carpeta aparte ( en general las fuentes de datos ) 

- Se pueden usar inyectores dependencias de vistas como context y manejadores de estado como Redux , sin embargo, no me fue posible por tiempo planear bien su uso o ejecturlos

-Manejar mejor los errores 

- Poner nombres mas apropiados a los proyectos, oor eventualidades me toco poner nombres genericos, pero no era la idea.