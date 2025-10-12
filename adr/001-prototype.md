# ADR-001: Building a protoype chat interface with pre-written messages styled to look like a chat application

## Context

#### This version is non-functional (messages are static, input doesn't work) - that's expected! The goal is to create the visual design

1. __Build semantic HTML structure__:
- Use a `<main>` container for the chat interface
- Use a `<div>` or `<section>` for the message history area
- Create individual message elements with:
    - Container for each message
    - Class to distinguish user vs. bot messages
    - Avatar or icon indicator
    - Message text content
    - Optional timestamp
- Use a `<form>` for the input area at the bottom
- Include `<input>` for message text and `<button>` to send

2. __Style with CSS__:

- Create a fixed-height chat container with scrolling
- Style message bubbles (different colors for user vs. bot)
- Align user messages to the right, bot messages to the left
- Style the input area to be fixed at the bottom
- Add appropriate spacing, borders, and visual polish
- Consider using Flexbox for message alignment

## Expectations

__Key Learning__: Understanding the HTML structure and CSS layout before adding behavior.