'use strict'

// This is a simple tool to rotate ALL .jpg images in the folder where executed
// by 90 degrees.

var fs = require('fs')
var easyimg = require('easyimage')
var allFiles

function getFiles(filterFiles) {
  fs.readdir("./", filterFiles)
}

getFiles(filterFiles)

function filterFiles (err, files) {
  var re = /.jpg$/i
  if (err) {
    console.log('An error occured reading the files:', err);
  } else {
    allFiles = files.filter(function(cur, index, arr) {
      return re.test(cur)
    })
    rotateImage()
  }
}

function rotateImage() {
  if (allFiles.length >= 1) {
    var image = allFiles.pop()
    easyimg.rotate({
      src: image,
      dst: image,
      degree: "90"
    }).then(function(result) {
      rotateImage()
    },function(err) {
      console.log('An error occurred:', err);
    })
  }
}
