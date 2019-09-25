const xlsxj = require("xlsx-to-json-lc");
const fs = require('fs');


const output = 'output';
if (!fs.existsSync(output)){
    fs.mkdirSync(output);
}

console.log('Scouter started');

xlsxj({
    input: "database/paths.xlsx", 
    output: "output/points.json",
    sheet: "puncte"
  }, (err, result) => {
    if (err) {
        console.log('Scouter failed to discovered the points');
    } else {
        console.log('Scouter discovered the points');
    }
  }
);

xlsxj({
    input: "database/paths.xlsx", 
    output: "output/tracks.json",
    sheet: "trasee"
  }, (err, result) => {
    if (err) {
        console.log('Scouter failed to discovered the trails');
    } else {
        console.log('Scouter discovered the trails');
    }
  }
);