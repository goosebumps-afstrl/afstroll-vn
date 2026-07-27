import sys
import re

def swap_names(text):
    # First, replace the object names so they aren't affected
    text = text.replace('chloePhase01Story', 'seanPhase01Story')
    text = text.replace('chloeWinStory', 'seanWinStory')
    
    # We want to swap:
    # chloe -> sean
    # Chloe -> Sean
    # sean -> chloe
    # Sean -> Chloe
    
    # Use intermediate tokens
    text = text.replace('chloe', '__T_L_C__')
    text = text.replace('Chloe', '__T_U_C__')
    text = text.replace('sean', '__T_L_S__')
    text = text.replace('Sean', '__T_U_S__')
    
    # Now replace tokens with target strings
    text = text.replace('__T_L_C__', 'sean')
    text = text.replace('__T_U_C__', 'Sean')
    text = text.replace('__T_L_S__', 'chloe')
    text = text.replace('__T_U_S__', 'Chloe')
    
    return text

with open('js/npcstory/chloe/story_chloe_phase01.js', 'r', encoding='utf-8') as f:
    content = f.read()
    
with open('js/npcstory/sean/story_sean_phase01.js', 'w', encoding='utf-8') as f:
    f.write(swap_names(content))
    
with open('js/winscene/chloe_win01.js', 'r', encoding='utf-8') as f:
    content = f.read()

with open('js/winscene/sean_win01.js', 'w', encoding='utf-8') as f:
    f.write(swap_names(content))
