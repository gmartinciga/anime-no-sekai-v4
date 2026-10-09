# Anime no Sekai - Versión 3 interactiva

## Abrir en Windows
1. Extrae el ZIP completo.
2. Entra en la carpeta `anime-no-sekai`.
3. Haz doble clic en `index.html` para abrirlo en Firefox, Chrome o Edge.

No necesita Python, Node.js, internet ni servidor local para el catálogo o las actividades. Si hay conexión a internet se cargarán fuentes de Google Fonts; sin conexión se usarán fuentes alternativas.

## Funciones
- Catálogo de 12 animes, búsqueda, géneros, ordenación, fichas y favoritos.
- Encuesta: elige y califica animes del 1 al 5; comentario opcional. Puedes modificar cada valoración.
- Batallas: seis parejas; un voto local por enfrentamiento, modificable.
- Trivia: cinco preguntas con corrección y mejor puntuación local.

## Privacidad y límites
Los votos, comentarios, resultados y favoritos se almacenan mediante `localStorage` en el navegador y dispositivo actual. No se comparten con otras personas, no se envían a servidores y se perderán si borras los datos del sitio. Los porcentajes de batallas reflejan únicamente tu elección local y no son estadísticas de una comunidad. En algunos navegadores o modos privados el almacenamiento puede estar restringido.

## Archivos
- `index.html`: estructura.
- `css/style.css`: estilos.
- `js/app.js`: catálogo integrado y funciones originales.
- `js/interacciones.js`: encuestas, batallas y trivia.
- `data/animes.json`: copia informativa del catálogo.


## Autoría
- Versión 1 - Creadora: Melani Laferte Martín.
- La atribución se muestra en «Acerca de» y en el pie de página.

## Usar en un celular Android
**Opción recomendada: publicar como sitio estático**
1. Crea una cuenta en GitHub (https://github.com/) y un repositorio público, por ejemplo `anime-no-sekai`.
2. Sube el **contenido** de esta carpeta (`index.html`, `css`, `js`, `data`) a la raíz del repositorio. No subas el ZIP sin descomprimir.
3. En el repositorio, abre Settings > Pages. En Build and deployment, elige Deploy from a branch, rama `main` y carpeta `/(root)`. Guarda los cambios.
4. Espera a que GitHub muestre el enlace de publicación (normalmente `https://USUARIO.github.io/anime-no-sekai/`).
5. Abre ese enlace desde Chrome o Firefox en Android. Opcionalmente usa el menú del navegador > «Añadir a pantalla de inicio» para crear un acceso directo. No es una aplicación nativa ni garantiza funcionamiento sin conexión.

**Opción sin publicar: abrir archivos locales**
1. Copia el ZIP al celular, descomprímelo y mantén la estructura de carpetas.
2. Desde la app Archivos intenta abrir `index.html` con un navegador compatible. Según el navegador y la versión de Android, la apertura de archivos `file://` y el guardado de favoritos/votos pueden estar restringidos.
3. Si no abre o no guarda datos, utiliza la opción de GitHub Pages.

**Importante:** los votos, favoritos y puntuaciones siguen siendo locales a cada navegador y dispositivo. No se sincronizan entre Android y Windows. Para resultados compartidos hace falta una base de datos y un servicio web.
