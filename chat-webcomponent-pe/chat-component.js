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

        this.textarea.disabled = false;
        this.button.disabled = false;


        this.setupEventListeners();
    }

    /**
     * Connects listeners to track button clicks and the enter key
     */
    setupEventListeners() {
         this.button.addEventListener('click', ()  => { this.send();});
         this.textarea.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && !e.shiftKey){
                e.preventDefault();
                this.send();
            }
        });

    }

    
    /**
     * Activates when a user triggers the event listener in init, captures the value in the
     * textarea, clears the textarea, then adds the user message to the chat window by calling the addToChat window function. 
     * Then it calls on the processMessage function to get a response from eliza
     */
    send() {
   
        const text = this.textarea.value;
        this.textarea.value = '';
        this.textarea.focus();

        this.addToChatWindow(text, 'user');
        
        this.processMessage(text);

    }

    /**
     * Captures message and speaker, then builds the dom node
     *  and inserts it directly to the tree
     * @param {String} text the value from the message box
     * @param {String} speaker either bot or user
     */
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

    /**
     * Sends bot response to addToChatWindow with the bot as the speaker
     * @param {String} response bot response from eliza
     */
    showResponse(response) {
        
        this.addToChatWindow(response, 'bot');
    }

    /**
     * gets user message from processMessage function and sends it to pattern recognition function in eliza
     * "getBotResponse"
     * @param {String} text user message from textarea
     * @returns {string} bot response from eliza
     */
    getResponse(text) {
        return getBotResponse(text);
    }
    
    /**
     * Takes user message and sends it to the getResponsefunction 
     * @param {string} text user message from textarea
     */
    processMessage(text) {
        let response = this.getResponse(text);
    
        this.showResponse(response);
    }
}

customElements.define('simple-chat', simpleChat);