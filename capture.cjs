const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  
  await page.goto('https://anoop-kumar-saxena-portfolio.vercel.app');
  
  console.log("Waiting for the loading screen to disappear...");
  
  // The user's screenshot shows "Hire Advocate Now" which means the main page is loaded.
  try {
    // Wait for a specific text on the page that only exists after the loader
    await page.waitForFunction(() => {
      return document.body.innerText.includes('Hire Advocate Now') || 
             document.body.innerText.includes('Available for Consultation');
    }, { timeout: 20000 });
    
    console.log("Main content detected! Waiting an extra 3 seconds for animations to settle...");
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'public/assets/projects/anoop.jpg' });
    console.log("Screenshot captured successfully!");
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    // fallback screenshot just in case
    await page.screenshot({ path: 'public/assets/projects/anoop.jpg' });
  }
  
  await browser.close();
})();
