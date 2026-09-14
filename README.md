# OVA: Elementos de la Educación a Distancia (V2 - Conexión Base de Datos)

Este Objeto Virtual de Aprendizaje (OVA) interactivo fue desarrollado como un recurso didáctico web, basado en el "Módulo IV: Elementos de la Educación a Distancia" de la Universidad de San Carlos de Guatemala (USAC).

## Novedades en esta versión
Se ha incorporado el código necesario para enviar los resultados de la evaluación final automáticamente a una hoja de cálculo en Google Drive.

## ¿Cómo configurar la Base de Datos (Google Sheets)?
Para que las notas se guarden, necesitas crear el enlace (API) hacia tu cuenta de Google. Sigue estos pasos:

1. Crea una nueva Hoja de cálculo de Google y en la primera fila escribe los encabezados: **Fecha**, **Nombre**, **Carné**, **Correo**, **Punteo** (desde la A1 hasta la E1).
2. En la hoja de cálculo, ve a **Extensiones > Apps Script**.
3. Borra todo el código que aparezca y pega lo siguiente:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var rowData = [];
     rowData.push(new Date()); 
     rowData.push(e.parameter.nombre);
     rowData.push(e.parameter.carnet);
     rowData.push(e.parameter.correo);
     rowData.push(e.parameter.punteo);
     sheet.appendRow(rowData);
     return ContentService.createTextOutput(JSON.stringify({"resultado":"exito"})).setMimeType(ContentService.MimeType.JSON);
   }
   ```
4. Haz clic en **Implementar > Nueva implementación**.
5. Selecciona el tipo **Aplicación web**. En "¿Quién tiene acceso?", elige **Cualquier persona**.
6. Implementa, autoriza los permisos y **copia la URL de la aplicación web**.
7. Abre el archivo `js/script.js` de este proyecto, ve a la línea 327 aproximadamente, y reemplaza el texto `'PEGA_AQUÍ_TU_URL_DE_APPS_SCRIPT'` por la URL que acabas de copiar. Guarda el archivo. ¡Listo!

## ¿Cómo abrir y ejecutar el OVA?
1. Descomprime el archivo `.zip`.
2. Abre la carpeta y haz doble clic en el archivo `index.html`. 

## Integración con Moodle
### ALTERNATIVA A: Subir el OVA HTML como recurso (Recomendada con Google Sheets)
Esta opción es ideal ya que las notas se enviarán automáticamente a tu hoja de Google Drive.
1. En tu curso de Moodle, activa el modo **Edición** > Añadir archivo.
2. Sube el archivo `.zip` y descomprímelo dentro de Moodle.
3. Configura el archivo `index.html` como archivo principal y elige apariencia "Incrustar".

### ALTERNATIVA B: Empaquetarlo como SCORM
Si requieres que la calificación vaya al libro de Moodle directamente, deberás empaquetarlo con una herramienta externa como **eXeLearning**.
