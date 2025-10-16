# ADR-004: Building entire chat interface in a fully encapsulated custom element using Shadow DOM 

## Context

#### This version contains the entire chat interface in a web-component called chat-interface

1. In HTML, use the custom element as a simple tag:
- `<chat-interface></chat-interface>`

2. Create a custom element class that:

- Extends HTMLElement
- Attaches a Shadow DOM in the constructor or connectedCallback()
- Creates all HTML structure via JavaScript
- Includes <style> tags inside the Shadow DOM for encapsulated styles
- Implements the same chat and Eliza logic
- Uses shadowRoot to query and manipulate internal elements

3. Example structure:

```
class ChatInterface extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Encapsulated styles here */
      </style>
      <div class="chat-container">
        <!-- Structure here -->
      </div>
    `;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Event handling
  }

  addMessage(text, isUser) {
    // Message handling
  }

  getBotResponse(message) {
    // Eliza logic
  }
}

customElements.define('chat-interface', ChatInterface);

```

4. All styles are scoped to the Shadow DOM - they won't leak out, and external styles won't leak in.

## Expectations

__Key Learning__: Full encapsulation with Shadow DOM. The component is completely self-contained and portable.

## API Integration





## Problems and solutions

_There is not html tag in a shadow tree use host: instead_

The color variables declared, and the font family inhereited in the previous root and html blocks did not work

__Solution__: Move them to a host html body,because the shadow tree is its own sub-document in the main document and its scope is limited to the things inside the shadow tree, I.E no control over root or html