# ADR-002: Building on the protoype chat interface by adding interactivity using standard JavaScript and DOM methods

## Context

#### This version is functional and must utalize DOM elements and Eliza messaging bot to add interactivity

1. Start with similar HTML structure you made first, but with an empty messages container (messages will be added via JavaScript).

2. In JavaScript:

- Select DOM elements (message container, input, button)
- Create a function to add messages to the chat
- Implement Eliza-style pattern matching logic
- Add event listener for the send button
- Add event listener for Enter key in the input field
- Create message elements dynamically with `createElement`
- Append them to the message container
- Auto-scroll to the bottom after adding messages
- Clear the input field after sending

3. Pattern matching should:

- Take user input string
- Check for keywords/patterns
- Return an appropriate bot response
- Add both user and bot messages to the chat

5. Style similar to prototype, no need to change it.

## Expectations

__Key Learning__: How to manipulate the DOM, handle events, and manage state with vanilla JavaScript

