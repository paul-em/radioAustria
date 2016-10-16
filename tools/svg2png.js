var svg2png = require('svg2png');
var fs = require('fs');
var sizes = [
  512,
  256,
  192,
  152,
  144,
  128,
  64,
  32,
  16
];

var dir = fs.readdirSync('./app/images/logos/');
dir.forEach(function (file) {
  if (file.substr(-4) === '.svg') {
    sizes.forEach(function (size) {
      svg2png('./app/images/logos/' + file, './app/images/logos/' + file.substr(0, file.length - 7) + size + '.png', size / 512, function (err) {
        if(err){
          console.log(err);
        } else {
          console.log(file.substr(0, file.length - 7) + size + '.png - done');
        }
      });
    });
  }
});

