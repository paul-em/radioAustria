var fs = require('fs'),
  PNG = require('pngjs').PNG;
var dir = fs.readdirSync('./app/images/logos/');
dir.forEach(function (file) {
  if (file.substr(-8) === '-128.png') {
    var found = false, radius;
    fs.createReadStream(__dirname + '/app/images/logos/' + file)
      .pipe(new PNG({
        filterType: 4
      }))
      .on('parsed', function () {
        console.log('processing file', file);
        for (var x = 0; x < this.width; x++) {
          for (var y = 0; y < this.height; y++) {
            var idx = (this.width * y + x) << 2;

            if (!found && this.data[idx + 3] !== 0) {
              found = true;
              if (file.indexOf('oe3') !== -1 || file.indexOf('oe1') !== -1) {
                radius = (this.height / 2) - x;
              } else {
                radius = (this.height / 2) - x - 1;
              }
            }

            if (found) {
              var distX = Math.abs(x - (this.width / 2) + 1);
              var distY = Math.abs(y - (this.height / 2) + 1);
              var distMiddle = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
              if(Math.floor(distMiddle) === radius) {
                if(file.indexOf('oe3') !== -1 || file.indexOf('oe1') !== -1){
                  this.data[idx] = 255;
                  this.data[idx + 1] = 255;
                  this.data[idx + 2] = 255;
                }
                this.data[idx + 3] = 255 - Math.round((distMiddle - radius) * 255);
              } else if (distMiddle > radius) {
                this.data[idx + 3] = 0;
              } else if (this.data[idx + 3] === 0) {
                this.data[idx] = 255;
                this.data[idx + 1] = 255;
                this.data[idx + 2] = 255;
                this.data[idx + 3] = 255;
              }
            }
          }
        }
        console.log('write file', "/app/images/logos/" + file.substr(0, file.length - 4) + '-round.png');
        this.pack().pipe(fs.createWriteStream(__dirname + "/app/images/logos/" + file.substr(0, file.length - 4) + '-round.png'));
      });
  }
});


