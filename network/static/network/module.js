import { EmojiButton } from 'https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@latest/dist/index.min.js';
        
const button = document.querySelector('#emoji-button');
const textarea = document.querySelector('#post-textarea');
const picker = new EmojiButton({
    theme: 'dark'
});
        
button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent page reload
    picker.togglePicker(button);
});
        
picker.on('emoji', (emoji) => {
    textarea.value += emoji.emoji; // Append emoji to textarea
});