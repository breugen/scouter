const xlsxj = require("xlsx-to-json-lc");
const fs = require('fs');


const output = 'output';
if (!fs.existsSync(output)){
    fs.mkdirSync(output);
}

console.log('Scouter started');

xlsxj({
    input: "database/paths.xlsx", 
    output: "output/points-raw.json",
    sheet: "puncte"
  }, (err, points) => {
    if (err) {
      console.log(err, 'Scouter failed to discover the points');
    } else {
      const processedPoints = points.map(point => {
        point.id = parseInt(point.id);
        point.altitude = parseInt(point.id);
        point.publicTransport = Boolean(point.publicTransport);
        point.car = Boolean(point.car);
        return point;
      });

      fs.writeFileSync('output/points.json', JSON.stringify(processedPoints));

      console.log('Scouter discovered the points');
    }
  }
);

xlsxj({
    input: "database/paths.xlsx", 
    output: "output/trails-raw.json",
    sheet: "trasee"
  }, (err, trails) => {
    if (err) {
        console.log('Scouter failed to discovered the trails');
    } else {
        const processedTrails = trails.map(trail => {
          trail.id = parseInt(trail.id);
          trail.points = JSON.parse(trail.points);
          trail.time = parseInt(trail.time);
          trail.reverseTime = parseInt(trail.reverseTime);
          return trail;
        });

        fs.writeFileSync('output/trails.json', JSON.stringify(processedTrails));

        console.log('Scouter discovered the trails');
    }
  }
);