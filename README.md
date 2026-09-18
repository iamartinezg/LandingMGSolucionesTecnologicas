# MG Soluciones Tecnológicas — Sitio web

Sitio corporativo estático. No requiere backend, base de datos ni proceso de compilación:
se publica subiendo los archivos tal cual.

---

## Estructura

```
.
├── index.html              Página de inicio
├── pages/
│   ├── servicios.html      Detalle de las 6 líneas de servicio
│   ├── marcas.html         Fabricantes y portafolio por categoría
│   ├── nosotros.html       Empresa, misión, visión, valores, alianzas
│   ├── blog.html           Noticias con filtros por categoría
│   └── contacto.html       Datos, mapa, formulario y preguntas frecuentes
├── css/styles.css          Hoja de estilos única
├── js/main.js              Menú, filtros, acordeón, validación del formulario
├── images/
│   ├── logo.png            Logotipo corporativo
│   ├── favicon.svg         Favicon vectorial (principal)
│   ├── favicon-32.png      Respaldo para navegadores antiguos
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── brands/             15 logotipos de fabricantes (SVG)
│   └── blog/               9 imágenes de artículos (SVG)
├── robots.txt
├── sitemap.xml
└── CNAME                   Dominio para GitHub Pages
```

---

## Publicación en GitHub Pages

1. Suba todo el contenido a la raíz del repositorio.
2. En **Settings → Pages**, seleccione la rama `main` y la carpeta `/ (root)`.
3. El archivo `CNAME` ya apunta a `mgserviciosti.com`. Configure en su proveedor de
   dominio los registros DNS que indica GitHub.

Para ver el sitio localmente antes de publicar:

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```

---

## Activar el formulario de contacto

El formulario usa **FormSubmit**, que no requiere crear cuenta ni clave de API.

**Paso único:** la primera vez que alguien envíe el formulario, FormSubmit mandará un
correo de confirmación a `iamartinezg@mgserviciosti.com`. Abra ese correo y haga clic en
el enlace de activación. A partir de ese momento los mensajes llegan directamente a su
bandeja.

Puede hacer la primera prueba usted mismo desde el sitio ya publicado.

El endpoint está en `pages/contacto.html`:

```html
<form action="https://formsubmit.co/ajax/iamartinezg@mgserviciosti.com" method="POST">
```

Campos ocultos incluidos:

| Campo | Función |
|---|---|
| `_subject` | Asunto del correo que recibe |
| `_template` | Formato de tabla, más legible |
| `_captcha` | Desactivado para no interrumpir al visitante |
| `_honey` | Campo trampa antispam, invisible para personas |

Si prefiere otro servicio, reemplace el `action` por el de Formspree, EmailJS o Getform.
El JavaScript envía por `fetch` con `Accept: application/json`, compatible con todos ellos.

---

## Personalización frecuente

### Datos de contacto
Están en las 6 páginas y en el pie. Para cambiarlos, busque y reemplace:

| Valor actual | Dónde aparece |
|---|---|
| `+57 313 803 9679` | Texto visible |
| `573138039679` | Enlaces `tel:` y `wa.me` |
| `iamartinezg@mgserviciosti.com` | Enlaces `mailto:` y formulario |
| `Cra. 109A #151-09` | Contacto y pie |

### Estadísticas
Los indicadores (`2+`, `10+`, `5+`, `6`) aparecen en `index.html` (tarjeta del hero,
banda azul oscuro y panel «Por qué elegirnos») y en `pages/nosotros.html`.

### Redes sociales
En el pie de cada página, los tres enlaces tienen `href="#"`. Reemplácelos por las
URL reales de LinkedIn, Facebook e Instagram.

### Artículos del blog
Cada artículo es un `<article class="post">` con el atributo `data-cat`, que determina
en qué filtros aparece. Los valores admitidos son:

```
ciberseguridad · cloud · microsoft · infraestructura · redes · transformacion
```

Un artículo puede pertenecer a varias categorías separándolas con `|`:

```html
<article class="post" data-cat="cloud|infraestructura">
```

Para añadir uno nuevo, copie un bloque existente y cambie imagen, etiqueta, fecha,
fuente, titular, resumen y enlace. Los filtros lo detectan automáticamente.

### Logotipos de marcas
Están en `images/brands/` como SVG cuadrados de 64×64. Para sustituir alguno por otra
versión, conserve el mismo nombre de archivo y una proporción cuadrada.

---

## Detalles técnicos

**Responsive.** Puntos de quiebre en 1100, 1024, 768, 560 y 380 píxeles, más reglas
para móvil horizontal e impresión. Verificado sin desbordamiento horizontal en 6
páginas × 8 resoluciones, de 320 a 1920 píxeles.

**Accesibilidad.** Enlace de salto al contenido, `aria-current` en la navegación,
`aria-expanded` y `aria-controls` en menú y acordeón, `aria-pressed` en filtros,
`role="alert"` en errores de formulario, contorno de foco visible, áreas táctiles de
44 píxeles mínimo en móvil y respeto por `prefers-reduced-motion`.

**Rendimiento.** Una sola hoja de estilos y un solo archivo JavaScript, cargado con
`defer`. Imágenes en SVG (peso mínimo y nitidez en cualquier pantalla) con `loading="lazy"`
y dimensiones declaradas para evitar saltos de maquetación. Sin dependencias externas
salvo la tipografía de Google Fonts, precargada con `preconnect`.

**SEO.** Título y descripción propios por página, etiquetas Open Graph, un solo `<h1>`
por página, HTML semántico, `sitemap.xml` y `robots.txt`.

---

## Pendientes opcionales

- Redactar las páginas de política de privacidad y términos y condiciones
  (actualmente enlazadas con `href="#"`).
- Añadir las URL reales de redes sociales.
- Sustituir las cifras de trayectoria a medida que la empresa crezca.

---

© MG Soluciones Tecnológicas
