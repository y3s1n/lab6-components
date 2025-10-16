import { getBotResponse } from '../eliza.js';

class chatInterface extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
           this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap');

                :host {
                    font-family: Zalando Sans, sans-serif, helvetica;
                    --primary-color: white;
                    --secondary-color: rgb(131, 30, 226);
                    --accent-color: rgb(56, 130, 227);
                    --border-color: rgb(184, 182, 182);
                    
                    
                
                }


                * {
                    margin: 0;
                    padding: 0;
                }

              
                #wrapper {
                    background: linear-gradient(to bottom right, var(--secondary-color), var(--accent-color));
                    padding: 30px 40px;
                
                }


                .content-box {
                    box-sizing: border-box;
                    max-width: 700px;
                    min-width: 300px;
                    min-height:  600px;
                    height: 91vh;
                
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    
                    
                    border-radius: 20px;
                    overflow: hidden;
                    
                    background-color: var(--primary-color);
                         
                }

                header {
                    height: 20%;
                    text-align: center;
                    gap: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary-color);
                    background-color: var(--accent-color);
                    
                }



                .chatBox {
                
                    border-top: 1px solid var(--border-color);
                    border-bottom: 1px solid var(--border-color);
                    height: 350px;
                    overflow-y: auto;

                }

                form {
                    height: 150px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 10px;
                    
                }

                form textarea {
                    font: inherit;
                    line-height: 1.2;
                    box-sizing: border-box;
                    padding-top: 13px;   
                    resize: none;
                    width: 75%;
                    max-height: 54px;
                    border: 1px solid var(--border-color) ;
                    border-radius: 30px;
                    margin-right: 15px;
                

                    font-size: 1.2em;
                    padding-left: 10px;
                    background-color: rgb(237, 238, 241);

                }

                form textarea::placeholder {
                    font-size: large;
                }

                form textarea:focus {
                    outline: none;
                    border-color: rgb(134, 133, 133) ;
                }

                form button {
                    border-radius: 30px;
                    height: 55px;
                    width: 100px;
                    min-width: 60px;
                    color: var(--primary-color);
                    background-color: var(--accent-color);
                    border: 1px solid var(--border-color);
                    font-weight: 550;
                    font-size: large; 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 10px;
                    transition: 150ms ease;
                }

                form button:hover {
                    background-color: rgb(77, 107, 242);

                }


                .bot {
                    display: flex;
                    justify-content: start;
                    --bubble-bg: rgba(93, 114, 127, 0.103);
                    --bubble-border: rgba(93, 114, 127, 0.103);
                    --bubble-fg: black;
                    margin-left: 20px;
                    margin-right: 15px;
                    margin-bottom: 5px;
                    margin-top: 5px;
                    
                }
                
                .bot .message {border-bottom-left-radius: 0;}

                .user {
                    display: flex;
                    justify-content: end;
                    --bubble-bg: rgb(56, 130, 227);
                    --bubble-border: rgba(56, 130, 227, 0.699);
                    --bubble-fg: white;
                    margin-right: 20px;
                    margin-left: 15px;
                    
                    
                }
                
                .user .message {border-bottom-right-radius: 0;}

                .message {
                    display: inline-block;
                    padding: 1em 1em;
                    border: 1px solid var(--bubble-border, #ddd);
                    background: var(--bubble-bg, #fff);
                    color: var(--bubble-fg, #111);
                    border-radius: 20px;
                
                    
                    max-width: 34ch;
                    overflow-wrap: break-word;
                    
                    margin-top: 5px;
                    margin-bottom: 5px;

                }

            </style>

            <div id="wrapper">
                <div class="content-box">
                    <header>
                        <h1>Chat Assistant</h1>
                        <p>Approach 3: chat using a fully encapsulated custom element with Shadow DOM and internal styles</p>

                    </header>
                    <div class="chatBox">
                            <div class="bot">
                                <div class="message">Hello! How can I help you?</div>
                            </div>
                    </div>
                        <form id="chatForm">
                            <textarea name="textbox" id="messageBox" placeholder="Type a message..."></textarea>
                            <button id="sendBtn" type="button" >Send</button>
                        </form>
               </div>
            </div>
            `;





        this.form = this.shadowRoot.querySelector('#chatForm');
        this.textarea = this.shadowRoot.querySelector('#messageBox');
        this.button = this.shadowRoot.querySelector('#sendBtn');
        this.chatBox = this.shadowRoot.querySelector('.chatBox');

     


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
     *  Sends bot response to addToChatWindow with the bot as the speaker
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
    // getResponse(text) {
    //     return getBotResponse(text);
    // }

    async getResponse(text) {
        const res = await fetch("https://little-frog-30ef.yesinq77.workers.dev/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ text })
        });
        const data = await res.json();
        return data.text || "(no reply)";
    }
    

    /**
     * Takes user message and sends it to the getResponsefunction 
     * @param {string} text user message from textarea
     */
    // processMessage(text) {
    //     let response = this.getResponse(text);
    
    //     this.showResponse(response);
    // }
    async processMessage(text) {
        const response = await this.getResponse(text);
        this.showResponse(response);
    }
}

customElements.define('chat-interface', chatInterface);