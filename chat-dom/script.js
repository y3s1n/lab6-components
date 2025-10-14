

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

}


function init() {
    console.log('In the init function');
    document.getElementById('sendBtn').addEventListener('click', function() { send();});
}

window.addEventListener('DOMContentLoaded', init);