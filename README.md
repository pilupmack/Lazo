---
Título: Lazo
Descripción: Documentación general del sistema Lazo y sus principales funcionalidades.
Autor: Pilar Porcal Mackinnon
Etiquetas: [Adopción Responsable, Reencuentro de Mascotas, Comunidad Animal, Bienestar Animal]
---

# Lazo
## Adopción, Reencuentro y Comunidad Animal

---

### Descripción del sistema

Lazo es una plataforma web orientada al bienestar animal y a la construcción de una comunidad comprometida con su cuidado. El sistema reúne diferentes herramientas destinadas a facilitar la adopción responsable, la difusión de mascotas perdidas y la conexión entre personas que comparten el amor por los animales.

La plataforma cuenta con espacios dedicados a la búsqueda de hogares para mascotas en adopción y a la difusión de casos de animales perdidos, permitiendo acceder a información detallada y realizar búsquedas mediante distintos criterios.

Además, el proyecto contemplaría una sección de comunidad, pensada para promover encuentros, actividades y eventos relacionados con mascotas. Este espacio busca fomentar la socialización entre animales, fortalecer los vínculos entre sus cuidadores y generar una red de personas interesadas en el bienestar animal, creando un entorno de apoyo, colaboración y convivencia responsable.

De esta manera, Lazo no solo funcionaría como una herramienta de búsqueda y adopción, sino también como un punto de encuentro para construir una comunidad más conectada y comprometida con los animales.

---

### Funcionalidades implementadas

#### Página de inicio

* Carrusel automático de tarjetas informativas sobre las principales páginas de la plataforma:
  * Adopciones
  * Mascotas perdidas
  * Comunidad

* Cada tarjeta incluye un botón que dirige al usuario a la página correspondiente.
* Visualización de las últimas 4 mascotas reportadas como perdidas.
* Visualización aleatoria de 9 mascotas disponibles para adopción.
* Generación dinámica de las tarjetas de mascotas mediante JavaScript.
* Acceso a la ficha detallada de cada mascota a través de botones incluidos en las tarjetas.
* Botón de acceso al catálogo completo de mascotas perdidas.
* Botón de acceso al catálogo completo de mascotas en adopción.
* Contador (falso) de estadísticas sobre la actividad e impacto de la plataforma.
* Sección de testimonios generados aleatoriamente con experiencias de usuarios de la comunidad.
* Sección de llamada a la acción (Call To Action) que invita a los usuarios a registrarse y formar parte de la comunidad.

#### Mascotas en adopción

* Visualización del catálogo completo de mascotas disponibles para adopción.
* Filtros por:
  * Especie
  * Sexo
  * Ubicación
* Búsqueda por coincidencias en la descripción.
* Formulario para agregar nuevas mascotas al catálogo.
* Validación de campos del formulario.
* Mensajes de confirmación y error.
* Acceso a fichas individuales de cada mascota.

#### Mascotas perdidas

* Visualización del catálogo completo de mascotas reportadas como perdidas.
* Filtros por:
  * Especie
  * Sexo
  * Última ubicación conocida
* Búsqueda por coincidencias en la descripción.
* Ordenamiento de resultados por fecha.
* Acceso a fichas individuales de cada mascota.

#### Ficha de detalle

* Visualización completa de la información de cada mascota.
* Galería de imágenes con fotografía principal y miniaturas.
* Navegación entre imágenes de la galería mediante las miniaturas.
* Visualización de mascotas relacionadas según características similares (su especie y si están perdidos o en adopción).

---

### Consideraciones

- Los datos de las mascotas se almacenan localmente mediante estructuras JavaScript.
- Algunas secciones futuras, como "Comunidad", se encuentran previstas dentro de la navegación pero aún no fueron implementadas.

---

### Enlaces

- [**Repositorio**](https://github.com/pilupmack/Lazo)
- [**Archivos del proyecto en Drive**](https://drive.google.com/drive/folders/12l_ke0B5wbls91PT7d2MG67PMf5neLMP?usp=sharing)
- [**Sitio web / Demo**](https://pilupmack.github.io/Lazo/)

---

### Información académica

Proyecto desarrollado por Pilar Porcal Mackinnon para la asignatura Programación 1.
