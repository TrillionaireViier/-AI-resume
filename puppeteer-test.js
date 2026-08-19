import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.stack || err.toString());
  });
  
  await page.goto('https://resume-ashy-tau-75.vercel.app/', { waitUntil: 'networkidle0' });
  
  await browser.close();
})();
