import { chromium } from 'playwright';

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { width: 320, height: 600, name: 'Small Mobile' },
    { width: 375, height: 812, name: 'iPhone' },
    { width: 414, height: 896, name: 'iPhone Max' },
    { width: 768, height: 1024, name: 'Tablet' }
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    try {
      await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
      
      // Scroll down to trigger framer-motion whileInView animations
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 50);
        });
      });

      // Allow final animations to settle
      await page.waitForTimeout(2000);

      // Find all elements that overflow the viewport horizontally
      const overflowingElements = await page.evaluate((viewportWidth) => {
        const elements = document.querySelectorAll('*');
        const overflowing = [];
        
        elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          // Exclude html and body
          if (el.tagName.toLowerCase() === 'html' || el.tagName.toLowerCase() === 'body') return;
          // Check if right edge exceeds viewport
          if (rect.right > viewportWidth && rect.width > 0 && el.tagName.toLowerCase() !== 'script' && el.tagName.toLowerCase() !== 'style') {
            overflowing.push({
              tag: el.tagName.toLowerCase(),
              className: el.className || 'no-class',
              id: el.id || 'no-id',
              width: rect.width,
              right: rect.right
            });
          }
        });
        
        return overflowing;
      }, vp.width);

      if (overflowingElements.length > 0) {
        console.log(`⚠️ FOUND ${overflowingElements.length} OVERFLOWING ELEMENTS:`);
        // Group by classname to avoid spam
        const grouped = {};
        overflowingElements.forEach(el => {
          const key = `<${el.tag} class="${el.className}">`;
          if (!grouped[key]) grouped[key] = 0;
          grouped[key]++;
        });
        Object.entries(grouped).forEach(([key, count]) => {
          console.log(`- ${key} (Count: ${count})`);
        });
      } else {
        console.log(`✅ No horizontal overflow detected.`);
      }
    } catch (err) {
      console.error('Error during test:', err.message);
    }
    
    await page.close();
  }
  
  await browser.close();
}

runAudit();
