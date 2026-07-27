const fs = require('fs');

function swapNames(text) {
    let newText = text;
    newText = newText.replace(/chloePhase01Story/g, 'seanPhase01Story');
    newText = newText.replace(/chloeWinStory/g, 'seanWinStory');
    
    newText = newText.replace(/chloe/g, '__T_L_C__');
    newText = newText.replace(/Chloe/g, '__T_U_C__');
    newText = newText.replace(/sean/g, '__T_L_S__');
    newText = newText.replace(/Sean/g, '__T_U_S__');
    
    newText = newText.replace(/__T_L_C__/g, 'sean');
    newText = newText.replace(/__T_U_C__/g, 'Sean');
    newText = newText.replace(/__T_L_S__/g, 'chloe');
    newText = newText.replace(/__T_U_S__/g, 'Chloe');
    
    return newText;
}

let content1 = fs.readFileSync('js/npcstory/chloe/story_chloe_phase01.js', 'utf-8');
fs.writeFileSync('js/npcstory/sean/story_sean_phase01.js', swapNames(content1), 'utf-8');

let content2 = fs.readFileSync('js/winscene/chloe_win01.js', 'utf-8');
fs.writeFileSync('js/winscene/sean_win01.js', swapNames(content2), 'utf-8');

console.log('Done swapping names');
