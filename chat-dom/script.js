import { getBotResponse } from '../eliza.js';

/**
 *  Sends bot response to addToChatWindow with the bot as the speaker
 * @param {String} response bot response from eliza
 */
function showResponse(response) {
    addToChatWindow(response, 'bot');
}

/**
 * gets user message from processMessage function and sends it to pattern recognition function in eliza
 * "getBotResponse"
 * @param {String} text user message from textarea
 * @returns {string} bot response from eliza
 */
function getResponse(text) {
    return getBotResponse(text);
}

/**
 * Takes user message and sends it to the getResponsefunction 
 * @param {string} text user message from textarea
 */
 function processMessage(text) {
    let response = getResponse(text);

    showResponse(response);
}

/**
 * Captures message and speaker, then builds the dom node
 *  and inserts it directly to the tree
 * @param {String} text the value from the message box
 * @param {String} speaker either bot or user
 */
function addToChatWindow(text, speaker) {
    const chatWindow = document.getElementById('chatBox');
    

    const theSpeaker = document.createElement('div');
    theSpeaker.className = speaker;

    const theMessage = document.createElement('p');
    theMessage.className = 'message';
    theMessage.textContent = text;

    theSpeaker.appendChild(theMessage);
    chatWindow.appendChild(theSpeaker);

    const tWindow = document.getElementById('main')
    tWindow.scrollTop = tWindow.scrollHeight;



}

/**
 * Activates when a user triggers the event listener in init, captures the value in the
 * textarea, clears the textarea, then adds the user message to the chat window by calling the addToChat window function. 
 * Then it calls on the processMessage function to get a response from eliza
 */
function send() {
    let messageBox = document.getElementById('messageBox');
    let text = messageBox.value;

    let chatBox = document.getElementById('chatBox');
    messageBox.value = '';
    messageBox.focus();

    addToChatWindow(text, 'user');
    
    processMessage(text);

}


/**
 * Attaches listeners to the button and textarea and waits for user to submit
 * a message before calling on the send function
 */
function init() {
    document.getElementById('sendBtn').addEventListener('click', function() { send();});
    document.getElementById('messageBox').addEventListener('keydown', function(e) {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            send();
        }
    });
}

window.addEventListener('DOMContentLoaded', init);