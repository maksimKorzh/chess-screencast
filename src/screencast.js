// init video recorder
const PuppeteerVideoRecorder = require('puppeteer-video-recorder');
const puppeteer = require('puppeteer');
const path = require('path');

// async delay
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

// main
(async() => {
  // init browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // init recorder
  const recorder = new PuppeteerVideoRecorder({
    format: 'jpeg',
    quality: 100,
    maxWidth: 1920,
    maxHeight: 1080,
    everyNthFrame: 2 // don't skip frames
  });
  
  await recorder.init(page, '.');
  
  // navigate to game page
  await page.goto('https://www.chess.com/a/2CVzszZxSr7bL');
  await recorder.start();
  
  // capture video
  for (let i = 0; i < 30; i++) { // move number
    await delay(500);
    
    await document.querySelector('span[class="game-controls-secondary-button-icon icon-font-chess chevron-right"]').click();
    //await page.keyboard.press('ArrowRight');
    await delay(500);
    console.log('recording move ' + (i + 1));
  }
  
  // clean ups
  await recorder.stop();
  await browser.close();
})();
