const fs = require('fs');
const path = require('path');

// Crear SVG con flores
function createFlowerSVG(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFE4F0;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#FFC0CB;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFB6D4;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Fondo -->
  <rect width="${size}" height="${size}" fill="url(#bgGradient)" rx="${size * 0.1}"/>
  
  <!-- Flor central grande -->
  <g transform="translate(${size/2}, ${size/2})" filter="url(#shadow)">
    <!-- Pétalos -->
    ${[0, 72, 144, 216, 288].map(angle => `
      <ellipse cx="0" cy="${-size * 0.15}" rx="${size * 0.1}" ry="${size * 0.2}" 
               fill="#FF69B4" transform="rotate(${angle})"/>
    `).join('')}
    <!-- Centro -->
    <circle cx="0" cy="0" r="${size * 0.075}" fill="#FFE066"/>
    <circle cx="0" cy="0" r="${size * 0.05}" fill="#FFA500" opacity="0.6"/>
  </g>
  
  <!-- Flores pequeñas decorativas -->
  ${[
    [size * 0.25, size * 0.3, '#FFB6D4'],
    [size * 0.75, size * 0.3, '#FFB6D4'],
    [size * 0.35, size * 0.75, '#FF85C0'],
    [size * 0.65, size * 0.75, '#FF85C0']
  ].map(([x, y, color]) => `
    <g transform="translate(${x}, ${y})" filter="url(#shadow)">
      ${[0, 90, 180, 270].map(angle => `
        <ellipse cx="0" cy="${-size * 0.08}" rx="${size * 0.048}" ry="${size * 0.096}" 
                 fill="${color}" transform="rotate(${angle})"/>
      `).join('')}
      <circle cx="0" cy="0" r="${size * 0.036}" fill="#FFE066"/>
    </g>
  `).join('')}
  
  <!-- Decoración adicional - pétalos flotantes -->
  <g opacity="0.3">
    <ellipse cx="${size * 0.15}" cy="${size * 0.15}" rx="${size * 0.04}" ry="${size * 0.08}" 
             fill="#FFE4F0" transform="rotate(45 ${size * 0.15} ${size * 0.15})"/>
    <ellipse cx="${size * 0.85}" cy="${size * 0.85}" rx="${size * 0.04}" ry="${size * 0.08}" 
             fill="#FFE4F0" transform="rotate(-45 ${size * 0.85} ${size * 0.85})"/>
  </g>
  
  <!-- Borde decorativo -->
  <rect x="2" y="2" width="${size - 4}" height="${size - 4}" 
        fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="3" rx="${size * 0.1}"/>
</svg>`;
}

// Tamaños de iconos requeridos
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Directorio de salida
const outputDir = path.join(__dirname, 'src', 'assets', 'icons');

// Crear directorio si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generar SVGs
sizes.forEach(size => {
  const svg = createFlowerSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(outputDir, filename);
  
  fs.writeFileSync(filepath, svg);
  console.log(`✓ Generado: ${filename}`);
});

console.log('\n✨ ¡SVG generados exitosamente!');
console.log('\nPara convertir a PNG, puedes usar:');
console.log('1. Inkscape (línea de comandos): inkscape --export-type=png icon.svg');
console.log('2. ImageMagick: convert icon.svg icon.png');
console.log('3. Herramientas online como: https://cloudconvert.com/svg-to-png');
console.log('\nO simplemente usa los SVG directamente - los navegadores modernos los soportan.');
