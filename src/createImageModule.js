// createImageModule.js
const fs = require('fs');
const path = require('path');

const imageDirectory = path.join(__dirname, 'src', 'images'); // Use __dirname to get the current directory
const images = fs.readdirSync(imageDirectory);

const imagePaths = images.map((image) => path.join('/', imageDirectory, image));

module.exports = imagePaths;
