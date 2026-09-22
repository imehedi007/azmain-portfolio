const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const appDir = path.join(rootDir, 'src', 'app');
  const imagesDir = path.join(publicDir, 'images');

  // 1. GENERATE ICON / FAVICON ASSETS
  console.log('Generating favicon and app icons...');
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="netflixRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff1a25" />
      <stop offset="50%" stop-color="#E50914" />
      <stop offset="100%" stop-color="#8a0006" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="#0a0a0a" />
  <rect x="24" y="24" width="464" height="464" rx="92" fill="url(#netflixRed)" />
  <path d="M 24 116 C 24 63, 63 24, 116 24 L 396 24 C 449 24, 488 63, 488 116 L 488 230 L 24 280 Z" fill="#ffffff" opacity="0.1" />
  <text x="256" y="375" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="340" fill="#ffffff" text-anchor="middle" filter="url(#shadow)">A</text>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), iconSvg);

  const iconBuffer = Buffer.from(iconSvg);
  await sharp(iconBuffer).resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(iconBuffer).resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'));
  await sharp(iconBuffer).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(iconBuffer).resize(180, 180).toFile(path.join(appDir, 'apple-icon.png'));
  await sharp(iconBuffer).resize(192, 192).toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  await sharp(iconBuffer).resize(512, 512).toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  await sharp(iconBuffer).resize(32, 32).toFormat('png').toFile(path.join(publicDir, 'favicon.ico'));
  await sharp(iconBuffer).resize(32, 32).toFormat('png').toFile(path.join(appDir, 'favicon.ico'));

  // Webmanifest
  const manifest = {
    name: "Azmain Adil | Executive Portfolio",
    short_name: "Azmain Adil",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    theme_color: "#E50914",
    background_color: "#0a0a0a",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Favicons and webmanifest created!');

  // 2. GENERATE 1200x630 OPEN GRAPH & TWITTER SOCIAL BANNER
  console.log('Generating high-resolution 1200x630 OG social banner...');
  
  // Right side photo of Azmain (azmain-adil-3.jpeg)
  const azmainPhotoPath = path.join(imagesDir, 'azmain-adil-3.jpeg');
  let photoOverlay;
  if (fs.existsSync(azmainPhotoPath)) {
    photoOverlay = await sharp(azmainPhotoPath)
      .resize(680, 630, { fit: 'cover', position: 'top' })
      .toBuffer();
  }

  // Left & Overlay graphic with rich typography and badges
  const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="darkFade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0a0a0a" stop-opacity="1" />
        <stop offset="42%" stop-color="#0a0a0a" stop-opacity="0.98" />
        <stop offset="55%" stop-color="#0a0a0a" stop-opacity="0.85" />
        <stop offset="70%" stop-color="#0a0a0a" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.1" />
      </linearGradient>
      <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0" />
        <stop offset="60%" stop-color="#0a0a0a" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="redAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E50914" />
        <stop offset="50%" stop-color="#ff3842" />
        <stop offset="100%" stop-color="#E50914" />
      </linearGradient>
    </defs>

    <!-- Base Gradient Mask -->
    <rect width="1200" height="630" fill="url(#darkFade)" />
    <rect width="1200" height="630" fill="url(#bottomFade)" />

    <!-- Netflix Red Accent Top Line -->
    <rect x="0" y="0" width="1200" height="6" fill="url(#redAccent)" />

    <!-- Top Left Brand Badge -->
    <g transform="translate(64, 48)">
      <rect width="40" height="40" rx="8" fill="#E50914" />
      <text x="20" y="30" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle">A</text>
      
      <rect x="52" y="6" width="230" height="28" rx="14" fill="#181818" stroke="#333333" stroke-width="1" />
      <circle cx="68" cy="20" r="4" fill="#E50914" />
      <text x="80" y="25" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="11" fill="#e5e5e5" letter-spacing="1.5">EXECUTIVE PORTFOLIO</text>
    </g>

    <!-- Main Headline Typography -->
    <!-- Eyebrow -->
    <text x="64" y="160" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="14" fill="#E50914" letter-spacing="3">NETFLIX-INSPIRED EXPERIENCE</text>

    <!-- Name -->
    <text x="64" y="240" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="76" fill="#ffffff" letter-spacing="-2">AZMAIN ADIL</text>

    <!-- Current Title -->
    <text x="64" y="295" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="28" fill="#f87171" letter-spacing="-0.5">Manager · Green Delta Insurance PLC</text>

    <!-- Summary Paragraph -->
    <text x="64" y="345" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="500" font-size="18" fill="#d4d4d8">University of Dhaka MBA in Insurance · Strategic Operations Supervision</text>
    <text x="64" y="375" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="400" font-size="16" fill="#a1a1aa">20-Branch Operational Restructuring | Underwriting &amp; Reinsurance Management</text>

    <!-- Stat Pills at Bottom -->
    <g transform="translate(64, 440)">
      <!-- Pill 1 -->
      <rect x="0" y="0" width="180" height="68" rx="12" fill="#141414" stroke="#27272a" stroke-width="1.5" />
      <text x="20" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="26" fill="#ffffff">20+</text>
      <text x="20" y="52" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="11" fill="#a1a1aa" letter-spacing="0.5">BRANCHES SUPERVISED</text>

      <!-- Pill 2 -->
      <rect x="196" y="0" width="180" height="68" rx="12" fill="#141414" stroke="#27272a" stroke-width="1.5" />
      <text x="216" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="26" fill="#ffffff">DU MBA</text>
      <text x="216" y="52" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="11" fill="#a1a1aa" letter-spacing="0.5">INSURANCE &amp; BANKING</text>

      <!-- Pill 3 -->
      <rect x="392" y="0" width="180" height="68" rx="12" fill="#141414" stroke="#27272a" stroke-width="1.5" />
      <text x="412" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="26" fill="#ffffff">8+</text>
      <text x="412" y="52" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="11" fill="#a1a1aa" letter-spacing="0.5">ACCREDITATIONS</text>
    </g>

    <!-- URL footer -->
    <g transform="translate(64, 570)">
      <text x="0" y="0" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" font-size="13" fill="#71717a" letter-spacing="1">AUTHENTIC CV &amp; INTERACTIVE CONTENT MANAGEMENT SYSTEM</text>
    </g>
  </svg>`;

  // Composite background + photo + SVG overlays
  const baseCanvas = sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 10, g: 10, b: 10, alpha: 1 }
    }
  });

  const compositeInputs = [];
  if (photoOverlay) {
    compositeInputs.push({
      input: photoOverlay,
      top: 0,
      left: 520
    });
  }

  compositeInputs.push({
    input: Buffer.from(textSvg),
    top: 0,
    left: 0
  });

  const ogBuffer = await baseCanvas
    .composite(compositeInputs)
    .jpeg({ quality: 94 })
    .toBuffer();

  // Save to public and app directories
  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogBuffer);
  fs.writeFileSync(path.join(appDir, 'opengraph-image.jpg'), ogBuffer);
  fs.writeFileSync(path.join(appDir, 'twitter-image.jpg'), ogBuffer);
  console.log('1200x630 OG Social Banner created at:');
  console.log(' - public/og-image.jpg');
  console.log(' - src/app/opengraph-image.jpg');
  console.log(' - src/app/twitter-image.jpg');
}

main().catch(console.error);
