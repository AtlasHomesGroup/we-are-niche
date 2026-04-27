#!/usr/bin/env node
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const W = 1200;
const H = 630;
const LOGO_PX = 380;

const logoSvgPath = resolve(root, "public/brand/niche-app-logo.png");
const outPath = resolve(root, "public/brand/og-default.png");

async function main() {
  const logoBuffer = await sharp(await readFile(logoSvgPath))
    .resize(LOGO_PX, LOGO_PX, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const backgroundSvg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="100%" stop-color="#f6f1e8"/>
    </linearGradient>
    <radialGradient id="glow" cx="22%" cy="40%" r="55%">
      <stop offset="0%" stop-color="rgba(238,90,36,0.18)"/>
      <stop offset="100%" stop-color="rgba(238,90,36,0)"/>
    </radialGradient>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#glow)"/>

  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <text x="540" y="180" fill="#ee5a24" font-size="20" font-weight="700" letter-spacing="6">
      THE NICHE ECOSYSTEM
    </text>

    <text x="540" y="270" fill="#0c2536" font-size="86" font-weight="700" letter-spacing="-1">
      We Are Niche
    </text>

    <text x="540" y="340" fill="#56697a" font-size="26" font-weight="400">
      A connected real estate ecosystem
    </text>
    <text x="540" y="375" fill="#56697a" font-size="26" font-weight="400">
      built around technology, data, CRM,
    </text>
    <text x="540" y="410" fill="#56697a" font-size="26" font-weight="400">
      acquisitions, and community.
    </text>

    <line x1="540" y1="460" x2="640" y2="460" stroke="#ee5a24" stroke-width="2"/>

    <text x="540" y="500" fill="#0c2536" font-size="18" font-weight="600" letter-spacing="2">
      DRIVEN BY REAL ESTATE.  POWERED BY TECHNOLOGY.
    </text>

    <text x="540" y="555" fill="#8a98a6" font-size="16" font-weight="500" letter-spacing="3">
      WE-ARE-NICHE.COM
    </text>
  </g>
</svg>
`;

  const logoX = Math.round((540 - LOGO_PX) / 2 + 60);
  const logoY = Math.round((H - LOGO_PX) / 2);

  await mkdir(dirname(outPath), { recursive: true });

  await sharp(Buffer.from(backgroundSvg))
    .composite([{ input: logoBuffer, left: logoX, top: logoY }])
    .png()
    .toFile(outPath);

  console.log(`✓ Wrote ${outPath} (${W}x${H})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
