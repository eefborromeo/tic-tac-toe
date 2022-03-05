import { boxes } from './variables.js';
import { addChars } from './move.js';

boxes.forEach(button => button.disabled = true)

// Events
addChars();