import { getBotResponse } from '../eliza.js';

class simpleChat extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.form = this.querySelector('#chatForm');
        this.textarea = this.querySelector('#messageBox');
        this.button = this.querySelector('#sendBtn');
        this.chatBox = this.querySelector('.chatBox');



         this.button.addEventListener('click', ()  => { this.send();});
         this.textarea.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && !e.shiftKey){
                e.preventDefault();
                this.send();
            }
        });

    }

    send() {
   
        const text = this.textarea.value;
        this.textarea.value = '';
        this.textarea.focus();

        this.addToChatWindow(text, 'user');
        
        this.processMessage(text);

    }

    addToChatWindow(text, speaker) {
    
        const theSpeaker = document.createElement('div');
        theSpeaker.className = speaker;

        const theMessage = document.createElement('p');
        theMessage.className = 'message';
        theMessage.textContent = text;

        theSpeaker.appendChild(theMessage);
        this.chatBox.appendChild(theSpeaker);

        this.chatBox.scrollTop = this.chatBox.scrollHeight;

    }

    showResponse(response) {
        
        this.addToChatWindow(response, 'bot');
    }
    
    getResponse(text) {
        return getBotResponse(text);
    }
    
    processMessage(text) {
        let response = this.getResponse(text);
    
        this.showResponse(response);
    }
}

customElements.define('simple-chat', simpleChat);