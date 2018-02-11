const path = require('path')
// const main = require('./app.js')

var appRoot = path.join(__dirname);

require('electron-compile').init(appRoot, require.resolve('./app/main'));
