# Radioverso App

Radioverso es una aplicación de música desarrollada con React Native que permite a los usuarios escuchar música de diferentes géneros y ver información del artista. La aplicación utiliza una API para obtener la música y la información del artista almacenada en una base de datos MongoDB.

## Características

- Reproducción de música por género.
- Muestra información del artista, incluyendo enlaces a redes sociales.
- Funcionalidad de mute y unmute.
- Navegación entre diferentes pantallas como Cuenta, Géneros y Entradas.

## Requisitos

- Node.js
- Expo CLI
- MongoDB
- Google Cloud Storage

## Instalación

1. Clona este repositorio:
    ```sh
    git clone https://github.com/wirbidotcom/radioverso-app.git
    cd radioverso-app
    ```

2. Instala las dependencias del proyecto:
    ```sh
    npm install
    ```

3. Inicia el servidor de desarrollo:
    ```sh
    expo start
    ```

## Configuración del Backend

El backend está desarrollado con Flask y se conecta a una base de datos MongoDB y Google Cloud Storage para almacenar y servir los archivos de música e imágenes.

1. Clona el repositorio del backend (asegúrate de configurar tus credenciales de Google Cloud y MongoDB):
    ```sh
    git clone https://github.com/tuusuario/Api-Radioverso.git
    cd radioverso-backend
    ```

2. Instala las dependencias del backend:
    ```sh
    pip install -r requirements.txt
    ```

3. Configura las credenciales de Google Cloud y MongoDB en el archivo de configuración del backend.

4. Inicia el servidor Flask:
    ```sh
    flask run
    ```

## Uso

- Al iniciar la aplicación, los usuarios pueden navegar a través de diferentes géneros de música haciendo clic en los iconos de los planetas en la pantalla principal.
- La aplicación mostrará la información del artista y permitirá la reproducción de música del género seleccionado.
- Los usuarios pueden navegar a otras secciones como "Mi cuenta", "Géneros" y "Entradas" desde el menú superior.

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir, por favor sigue estos pasos:

1. Realiza un fork del proyecto.
2. Crea una nueva rama con tu función (`git checkout -b feature/nueva-funcion`).
3. Realiza los cambios necesarios y haz commit (`git commit -m 'Añadir nueva función'`).
4. Empuja tus cambios a la rama (`git push origin feature/nueva-funcion`).
5. Abre un Pull Request.


