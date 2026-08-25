import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';

const root = fileURLToPath(new URL('..', import.meta.url));
const baseUrl = process.env.QA_BASE_URL || 'http://127.0.0.1:4173';
const outputPath = path.join(root, 'qa.json');
const screenshotDir = path.join(root, 'qa-screenshots');
const chrome = process.env.CHROME_BIN || '/opt/data/toolchain/chromium/chrome-headless-shell/chrome-headless-shell';
const routes = [
  '/', '/balcony-system', '/rooftop-system', '/portable-system',
  '/portable-system/d100', '/portable-system/panel', '/solar-panel',
  '/projects', '/about', '/faqs', '/checkout',
];
const profiles = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];
const exactAddress = 'Patongo, ตำบลป่าตอง อำเภอกะทู้ จังหวัดภูเก็ต 83150';
const routeChecks = {
  '/': ['คำถามที่พบบ่อย'],
  '/balcony-system': ['หน้าแรก', 'กรอบสีเงิน', 'สีดำล้วน', 'ต่อแผง', 'กรุงเทพฯ', 'ต้องใช้ช่างไฟฟ้าในการติดตั้งไหม?'],
  '/rooftop-system': ['ธนาคารกรุงเทพ', 'ธนาคารออมสิน (GSB)', 'ธนาคารอาคารสงเคราะห์ (ธอส.)'],
  '/portable-system': ['แบตเตอรี่พกพาและแผงโซลาร์พับได้ในประเทศไทย'],
  '/portable-system/d100': ['ชาร์จโซลาร์', 'ประเภทแบตเตอรี่', 'ความจุแบตเตอรี่', 'อินเวอร์เตอร์ AC'],
  '/portable-system/panel': ['กำลังไฟพิกัด', 'ขนาดเมื่อกาง', 'รอยืนยันข้อมูล'],
  '/solar-panel': ['แผงโซลาร์ Dark Feather 450 Wp — กระจก-กระจก IP68', '30 mm มีกรอบ', 'เกรดเซลล์ (bin)'],
  '/projects': ['หลังคาโรงงานและอาคารพาณิชย์', 'หลังคาโค้งโกดังข้าว', 'ติดตั้งแล้ว 68 MW', 'รูป'],
  '/about': ['25+ ปี', '1–3 วัน'],
  '/faqs': ['หัวข้อคำถามที่พบบ่อย', 'คำถามที่พบบ่อย'],
  '/checkout': ['Cart', 'ORDER SUMMARY'],
};
const forbidden = {
  '/balcony-system': ['Do I need an electrician to install it?', 'Silver-frame', 'All-black', '· per panel'],
  '/portable-system/d100': ['Specification model:', 'Battery type:', 'Solar charging:'],
  '/portable-system/panel': ['To be added', 'Rated output:'],
  '/projects': ['Commercial & Industrial rooftops', 'Curved granary rooftop', '68 MW installed', ' photos'],
  '/about': ['25+ yrs', '1–3 days'],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitForServer(url, attempts = 80) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch { /* retry */ }
    await delay(250);
  }
  throw new Error(`Dev server did not become ready at ${url}`);
}

async function scrollToText(page, text) {
  await page.evaluate((needle) => {
    document.documentElement.style.scrollBehavior = 'auto';
    const element = [...document.querySelectorAll('body *')]
      .filter((node) => node.children.length === 0 && node.textContent.includes(needle))
      .sort((a, b) => a.textContent.length - b.textContent.length)[0];
    element?.scrollIntoView({ block: 'center' });
  }, text);
  await delay(500);
}

const server = process.env.QA_BASE_URL ? null : spawn(
  'npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
  { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] },
);
const results = [];
const screenshots = [];
let browser;

try {
  await fs.rm(screenshotDir, { recursive: true, force: true });
  await fs.mkdir(screenshotDir, { recursive: true });
  await waitForServer(baseUrl);
  browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const profile of profiles) {
    for (const route of routes) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(String(error)));
      await page.setViewport({ width: profile.width, height: profile.height, deviceScaleFactor: 1 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem('solvio-lang', 'th');
        localStorage.setItem('solvio_guide_popup_seen', '1');
      });
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await delay(500);
      const state = await page.evaluate(() => ({
        htmlLang: document.documentElement.lang,
        text: document.body.innerText,
        content: document.body.textContent,
        ariaLabels: [...document.querySelectorAll('[aria-label]')].map((node) => node.getAttribute('aria-label')),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        menuLabel: document.querySelector('button[aria-label*="เมนู"]')?.getAttribute('aria-label') ?? null,
      }));
      const checks = [];
      checks.push({ name: 'http', pass: response?.ok() ?? false, actual: response?.status() ?? null });
      checks.push({ name: 'html-lang-th', pass: state.htmlLang === 'th', actual: state.htmlLang });
      checks.push({ name: 'no-horizontal-overflow', pass: state.overflow <= 1, actual: state.overflow });
      checks.push({ name: 'no-page-errors', pass: errors.length === 0, actual: errors });
      if (profile.name === 'mobile') {
        checks.push({ name: 'thai-mobile-menu-label', pass: state.menuLabel === 'เปิดเมนู', actual: state.menuLabel });
      }
      if (route !== '/checkout') {
        checks.push({ name: 'thai-address', pass: state.content.includes(exactAddress), actual: exactAddress });
      }
      for (const expected of routeChecks[route]) {
        checks.push({ name: `contains:${expected}`, pass: state.content.includes(expected) || state.text.includes(expected) || state.ariaLabels.includes(expected) });
      }
      for (const blocked of forbidden[route] ?? []) {
        checks.push({ name: `omits:${blocked}`, pass: !state.text.includes(blocked) });
      }

      if (route === '/rooftop-system') {
        const businessTab = await page.$x("//button[contains(., 'เจ้าของกิจการ')]");
        if (businessTab[0]) {
          await businessTab[0].click();
          await delay(500);
          const businessText = await page.evaluate(() => document.body.textContent);
          for (const bank of ['ธนาคารกสิกรไทย', 'ธนาคารกรุงศรีอยุธยา (กรุงศรี)', 'ธนาคาร SME D Bank']) {
            checks.push({ name: `business-bank:${bank}`, pass: businessText.includes(bank) });
          }
        } else {
          checks.push({ name: 'business-bank-tab', pass: false });
        }
      }

      const failed = checks.filter((check) => !check.pass);
      results.push({ profile: profile.name, route, pass: failed.length === 0, checks });

      const shotKey = `${profile.name}:${route}`;
      const shotPlans = {
        'desktop:/balcony-system': ['ต้องใช้ช่างไฟฟ้าในการติดตั้งไหม?', 'desktop-balcony-faq.png'],
        'mobile:/balcony-system': ['ต้องใช้ช่างไฟฟ้าในการติดตั้งไหม?', 'mobile-balcony-faq.png'],
        'mobile:/portable-system/d100': ['ประเภทแบตเตอรี่', 'mobile-d100-specs.png'],
        'mobile:/portable-system/panel': ['รอยืนยันข้อมูล', 'mobile-panel-specs.png'],
        'desktop:/projects': ['หลังคาโรงงานและอาคารพาณิชย์', 'desktop-projects.png'],
        'desktop:/solar-panel': ['30 mm มีกรอบ', 'desktop-solar-comparison.png'],
      };
      if (shotPlans[shotKey]) {
        const [text, filename] = shotPlans[shotKey];
        await scrollToText(page, text);
        const target = path.join(screenshotDir, filename);
        await page.screenshot({ path: target, fullPage: false });
        screenshots.push(path.relative(root, target));
      }
      await page.close();
    }
  }

  const englishPage = await browser.newPage();
  await englishPage.setViewport({ width: 1440, height: 900 });
  await englishPage.evaluateOnNewDocument(() => {
    localStorage.setItem('solvio-lang', 'en');
    localStorage.setItem('solvio_guide_popup_seen', '1');
  });
  await englishPage.goto(`${baseUrl}/balcony-system`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await delay(400);
  const englishText = await englishPage.evaluate(() => document.body.innerText);
  results.push({
    profile: 'english-regression',
    route: '/balcony-system',
    pass: englishText.includes('Do I need an electrician to install it?') && englishText.includes('Silver-frame'),
    checks: [{ name: 'english-copy-preserved', pass: englishText.includes('Do I need an electrician to install it?') && englishText.includes('Silver-frame') }],
  });
  await englishPage.close();

  const failed = results.filter((result) => !result.pass);
  const report = {
    runner: 'scripts/thai-coverage-qa.mjs',
    baseUrl,
    routes,
    profiles,
    screenshots,
    totals: { cases: results.length, passed: results.length - failed.length, failed: failed.length },
    pass: failed.length === 0,
    results,
  };
  await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report.totals));
  if (failed.length) process.exitCode = 1;
} finally {
  await browser?.close();
  if (server) server.kill('SIGTERM');
}
