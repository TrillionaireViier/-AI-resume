import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.stack || err.toString());
  });
  
  await page.goto('https://resume-ashy-tau-75.vercel.app/', { waitUntil: 'networkidle0' });
  
  // Wait for the button and click it
  try {
    await page.waitForSelector('button', { timeout: 5000 });
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    
    // Find the button with "Export to PDF" text
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent.includes('Export to PDF'));
      if (btn) btn.click();
      else console.log('Button not found');
    });
    
    await new Promise(r => setTimeout(r, 5000));
  } catch (e) {
    console.log('Error clicking:', e);
  }
  
  await browser.close();
})();
