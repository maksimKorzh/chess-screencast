var videoshow = require('videoshow')

var secondsToShowEachImage = 0.5
var finalVideoPath = 'video.mp4'

// setup videoshow options
var videoOptions = {
  fps: 24,
  loop: secondsToShowEachImage,
  transition: false,
  videoBitrate: 1024 ,
  videoCodec: 'libx264', 
  size: '800x600',
  outputOptions: ['-pix_fmt yuv420p'],
  format: 'mp4' 
}

// array of images to make the 'videoshow' from
var images = [];

for (let i=1; i < 70; i++) images.push('./frames/frame' + i + '.png');

videoshow(images, videoOptions)
.save(finalVideoPath)
.on('start', function (command) { 
  console.log('encoding ' + finalVideoPath + ' with command ' + command) 
})
.on('error', function (err, stdout, stderr) {
  return Promise.reject(new Error(err)) 
})
.on('end', function (output) {
  // do stuff here when done
})
