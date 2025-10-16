# lab6-components

COMP305 Fall 2025 Lab 6 assignment

## Overview

This project implements a chat interface using four different approaches, each in its own directory:

- **Prototype (HTML/CSS only)**
- **chat-dom (Vanilla JavaScript DOM manipulation)**
- **chat-webcomponent-pe (Web Component with Progressive Enhancement)**
- **chat-webcomponent-gd (Web Component with Shadow DOM/Full Encapsulation, Cloudflare Workers AI integration)**

Below are brief explanations, reflections, and implementation notes for each approach.

---

## 1. Prototype (HTML/CSS only)

**Directory:** `chat-prototype-html-css/`

- **Description:**  
	A static, non-interactive chat interface built with semantic HTML and styled with CSS. All messages are hardcoded; there is no JavaScript or interactivity.
- **Purpose:**  
	Focuses on structure and layout, ensuring a visually appealing and accessible design before adding behavior.

**Reflection:**  
This approach is the simplest and most accessible. It’s ideal for rapid prototyping and design validation, but cannot support any interactivity or dynamic content.

---

## 2. chat-dom (Vanilla JavaScript DOM Manipulation)

**Directory:** `chat-dom/`

- **Description:**  
	Adds interactivity to the chat using standard JavaScript and DOM methods. Messages are dynamically created, and the Eliza bot logic is implemented in JS.
- **Purpose:**  
	Demonstrates how to manipulate the DOM, handle events, and manage state with vanilla JavaScript.

**Reflection:**  
This approach is flexible and easy to understand for those familiar with JS. However, as the UI grows, code can become harder to maintain and reuse. All logic and state are global or tied to specific DOM elements, which can lead to bugs if not carefully managed.

**Challenge:**  
A common issue was the form submitting and reloading the page. This was solved by setting the button type to `"button"` instead of the default `"submit"`.

---

## 3. chat-webcomponent-pe (Web Component with Progressive Enhancement)

**Directory:** `chat-webcomponent-pe/`

- **Description:**  
	Uses a custom element (`<simple-chat>`) that enhances existing HTML markup when JavaScript is enabled. If JS fails, the static HTML remains visible and usable.
- **Purpose:**  
	Emphasizes progressive enhancement: start with a working HTML base, then add interactivity via JS.

**Reflection:**  
This approach improves accessibility and resilience. The chat works (at least visually) even if JS is disabled. However, styles are global, so there’s a risk of CSS conflicts. The component is more reusable than the DOM-only version, but not fully encapsulated.

---

## 4. chat-webcomponent-gd (Web Component with Shadow DOM & Cloudflare Workers AI)

**Directory:** `chat-webcomponent-gd/`

- **Description:**  
	Implements the chat as a fully encapsulated custom element (`<chat-interface>`) using Shadow DOM. All structure and styles are scoped inside the component. This version also integrates with Cloudflare Workers AI for LLM-powered responses, using a secure backend endpoint for API calls.
- **Purpose:**  
	Demonstrates full encapsulation and reusability using modern web standards, and explores integration with external AI services.

**Reflection:**  
This is the most robust and portable approach. Styles and logic are fully isolated, preventing conflicts with the rest of the page. However, it’s more complex to implement and debug. Some global CSS features (like root variables) don’t work inside Shadow DOM and must be redefined in the component.

**Challenge:**  
CSS variables and fonts defined in `:root` or `html` are not available in Shadow DOM. The solution was to move them to `:host` or redefine them inside the component. Integrating Cloudflare Workers AI required setting up a secure backend endpoint and handling API communication securely from the frontend.

---

## Comparison & Trade-offs

| Approach                | Interactivity | Encapsulation | Accessibility | Complexity | Reusability |
|-------------------------|:------------:|:-------------:|:-------------:|:----------:|:-----------:|
| Prototype (HTML/CSS)    |      No      |      N/A      |     High      |   Lowest   |    Low      |
| chat-dom (JS/DOM)       |     Yes      |      Low      |     Medium    |   Low      |    Low      |
| webcomponent-pe         |     Yes      |   Partial     |     High      |  Medium    |  Medium     |
| webcomponent-gd         |     Yes      |     High      |    Medium*    |   High     |   High      |

\* Shadow DOM can impact accessibility if not handled carefully.

**Trade-offs:**  
- **Simplicity vs. Power:** The prototype is easiest to build but least functional. Shadow DOM is most powerful but requires more knowledge.
- **Encapsulation:** Only the Shadow DOM approach fully isolates styles and logic.
- **Progressive Enhancement:** The PE approach is most resilient to JS failures.
- **Maintainability:** Web components (especially with Shadow DOM) are easier to maintain and reuse in larger projects.

---

## Implementation Notes

- All approaches use the same basic chat UI and Eliza bot logic for fair comparison.
- See the `adr/` directory for detailed architectural decisions and rationale.
- For the Shadow DOM version, API integration was tested using Cloudflare Workers AI for LLM responses, with a secure backend endpoint.

---

## Links & Documentation

- [Prototype HTML/CSS](./chat-prototype-html-css/index.html)
- [chat-dom](./chat-dom/index.html)
- [Web Component PE](./chat-webcomponent-pe/index.html)
- [Web Component GD](./chat-webcomponent-gd/index.html)
- [Architectural Decision Records](./adr/)

---
