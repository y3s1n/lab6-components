import { getBotResponse } from '../eliza.js';

function showResponse(response) {
    console.log('In the show function');
    addToChatWindow(response, 'bot');
}

function getResponse(text) {
    console.log('In the get function');
    return getBotResponse(text);
}

 function processMessage(text) {
    console.log('In the process function');
    let response = getResponse(text);

    showResponse(response);
}

/**
 * 
 * @param {*} text 
 * @param {*} speaker 
 */
function addToChatWindow(text, speaker) {
    console.log('In the add to chat function');
    const chatWindow = document.getElementById('chatBox');
    

    const theSpeaker = document.createElement('div');
    theSpeaker.className = speaker;

    const theMessage = document.createElement('p');
    theMessage.className = 'message';
    theMessage.textContent = text;

    theSpeaker.appendChild(theMessage);
    chatWindow.appendChild(theSpeaker);



}

function send() {
    console.log('In the send function');
    let messageBox = document.getElementById('messageBox');
    let text = messageBox.value;

    let chatBox = document.getElementById('chatBox');
    messageBox.value = '';
    messageBox.focus;

    addToChatWindow(text, 'user');
    
    processMessage(text);

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