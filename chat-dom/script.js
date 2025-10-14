import { getBotResponse } from '../eliza.js';

function showResponse(response) {
    console.log('In the show function');
    addToChatWindow(response, 'bot');
}

function getResponse(message) {
    console.log('In the get function');
    return getBotResponse(message);
}

 function processMessage(message) {
    console.log('In the process function');
    let response = getResponse(message);

    showResponse(response);
}


function addToChatWindow(message, speaker) {
    console.log('In the add to chat function');
    let chatWindow = document.getElementById('chatBox');
    chatWindow.innerHTML += `<div class="${speaker}"><p class="message">${message}</p></div>`;
}

function send() {
    console.log('In the send function');
    let messageBox = document.getElementById('messageBox');
    let message = messageBox.value;

    let chatBox = document.getElementById('chatBox');
    messageBox.value = '';
    messageBox.focus;

    addToChatWindow(message, 'user');
    
    processMessage(message);

}


function init() {
    console.log('In the init function');
    document.getElementById('sendBtn').addEventListener('click', function() { send();});
    document.getElementById('messageBox').addEventListener('keydown', function(e) {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            send();
        }
    });
}

window.addEventListener('DOMContentLoaded', init);