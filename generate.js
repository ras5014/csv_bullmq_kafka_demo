const fs = require("fs");

const file = fs.createWriteStream("big_sample.csv");
file.write("id,name,email\n"); // header

for (let i = 1; i <= 10000; i++) {
  file.write(`${i},User${i},user${i}@example.com\n`);
}

file.end();
console.log("big_sample.csv generated!");
