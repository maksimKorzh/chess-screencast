const puppeteer = require('puppeteer');
const videoshow = require('videoshow');
const fs = require('fs');

(async() => {
  const browser = await puppeteer.launch({/*headless: false*/});
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  const options = {format : 'png', everyNthFrame: 1};

  let frameCount = 0;
  client.on('Page.screencastFrame', async (frame) => {
    console.log('casting frame: ' + frameCount);
    console.log(frame.metadata);
    await client.send('Page.screencastFrameAck', {sessionId: frame.sessionId});
    fs.writeFileSync('./frames/frame' + frameCount + '.png', frame.data, 'base64');
    
    // make next move
    await page.keyboard.press('ArrowRight');
    
    frameCount++;
  });
  
  await page.goto('https://www.chess.com/games/view/584213');
  
  // navigate to the beginning of the game
  for (let i=0; i < 100; i++) await page.keyboard.press('ArrowLeft');
  
  await client.send('Page.startScreencast', options);
  
  await new Promise((resolve) => {
    setTimeout(resolve, 25000); // record for 25 seconds
  });
  
  await client.send('Page.stopScreencast');
  console.log('Done capturing');
  process.exit(0)

})();




