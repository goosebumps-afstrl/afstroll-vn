const fs = require('fs');
const files = [
  'js/logic.js',
  'js/npcstory/chloe/story_chloe_phase01.js',
  'js/winscene/chloe_win01.js',
  'js/npcstory/sean/story_sean_phase01.js',
  'js/winscene/sean_win01.js'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let buf = fs.readFileSync(f);
    if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
      console.log('BOM found in ' + f + ', removing...');
      fs.writeFileSync(f, buf.slice(3));
    }
  }
});
