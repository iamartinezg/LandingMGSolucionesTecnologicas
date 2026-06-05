# MG Soluciones Tecnológicas — Sitio Web

## Estructura del proyecto

```
mg-soluciones/
├── index.html              ← Página de inicio
├── css/
│   └── styles.css          ← Estilos globales + responsive
├── js/
│   └── main.js             ← JavaScript (menú, animaciones, formulario)
├── images/
│   ├── logo.png            ← Logo principal (ya incluido)
│   └── brands/             ← Carpeta para logos de marcas (agregar aquí)
│       ├── lenovo.png
│       ├── hp.png
│       ├── dell.png
│       ├── asus.png
│       ├── microsoft.png
│       ├── adobe.png
│       ├── vmware.png
│       ├── acronis.png
│       ├── sophos.png
│       ├── fortinet.png
│       ├── eset.png
│       ├── kaspersky.png
│       ├── cisco.png
│       ├── ubiquiti.png
│       └── mikrotik.png
└── pages/
    ├── servicios.html
    ├── marcas.html
    ├── nosotros.html
    ├── blog.html
    └── contacto.html
```

## Pendientes para personalizar

### 1. Información de contacto
Buscar y reemplazar en TODOS los archivos:
- `+57 (XXX) XXX-XXXX` → su número real
- `57XXXXXXXXXX` → número sin espacios para WhatsApp (ej: 573001234567)
- `info@mgsoluciones.com` → su correo real
- `Bogotá, Colombia` → dirección completa si desea

### 2. Logos de marcas
Agregar archivos PNG de los fabricantes en `images/brands/`.
Los nombres deben coincidir exactamente con los listados arriba.
Si no agrega un logo, aparecerá el nombre del fabricante en texto como fallback.

### 3. Mapa de Google Maps (contacto.html)
Reemplazar el bloque `.map-placeholder` por un iframe de Google Maps:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!..."
  width="100%" height="340" style="border:0;border-radius:12px;"
  allowfullscreen="" loading="lazy">
</iframe>
```

### 4. Estadísticas (index.html, nosotros.html)
Ajustar los números de:
- Años de experiencia
- Clientes activos
- Proyectos exitosos

### 5. Redes sociales (footer en todos los archivos)
Reemplazar los `href="#"` de LinkedIn, Facebook e Instagram con las URLs reales.

### 6. Blog
Los artículos tienen `href="#"`. Cuando publique entradas reales, crear
páginas individuales y actualizar los enlaces.

### 7. Formulario de contacto
Actualmente el formulario muestra un mensaje de éxito simulado.
Para hacerlo funcional, conectarlo a:
- **Formspree**: `<form action="https://formspree.io/f/XXXXXXXX">`
- **EmailJS**: integración por JavaScript
- **Backend propio**: PHP / Node.js

---

## Responsive — Breakpoints cubiertos

| Tamaño          | Rango         |
|-----------------|---------------|
| Móvil pequeño   | hasta 360px   |
| Móvil estándar  | 361 – 480px   |
| Móvil grande    | 481 – 768px   |
| Tablet portrait | 769 – 1024px  |
| Laptop          | 1025 – 1280px |
| Desktop         | 1281 – 1440px |
| Ultra-wide      | 1441px+       |

---

## Cómo ver el sitio localmente

Abra `index.html` directamente en su navegador, o use un servidor local:

```bash
# Con Python (si lo tiene instalado)
python -m http.server 8080
# Luego abrir: http://localhost:8080

# Con Node.js
npx serve .
```

---
*MG Soluciones Tecnológicas © 2025*
