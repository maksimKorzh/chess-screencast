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
    format: 'jpg',
    quality: 100,
    maxWidth: 1920,
    maxHeight: 1080,
    everyNthFrame: 1 // How many frames to ignore befor taking the next screenshots
  });
  
  // init recorder
  await recorder.init(page, '.');
  
  // navigate to game page
  await page.goto('https://www.chess.com/a/2CVzszZxSr7bL');
  await delay(1000);
  
  // click on 'Details' to enable autoplay button
  await page.evaluate(`document.querySelector('a[data-cy="analysis-tab-button-details-tab"]').click()`);
  await delay(5000);
  await recorder.start();
    
  // click on 'Play' button to start the game
  //await page.evaluate(`document.querySelectorAll('button[class="ui_v5-button-component ui_v5-button-basic game-controls-primary-button"]')[2].click()`);
  //await delay(25000);

  // capture video
  for (let i = 0; i < 20; i++) { // move number
    
      await page.evaluate(`document.querySelectorAll('button[class="ui_v5-button-component ui_v5-button-basic game-controls-primary-button"]')[3].click()`);
    //await page.evaluate(`document.querySelector('span[class="game-controls-secondary-button-icon icon-font-chess chevron-right"]').click()`);
    //await page.keyboard.press('ArrowRight');
    
    await delay(1000);
    console.log('recording move ' + (i + 1));
  }
  
  // clean ups
  await recorder.stop();
  await browser.close();
})();


// analysis-review-tab.chunk.client.a60d0906.js
// 3952 ; Const De; Next.onClick
// wpJsonpChessCom_analysis[7][1].3952
// wpJsonpChessCom_analysis[7][1]['3952']



