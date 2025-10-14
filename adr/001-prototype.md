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


## Implementation

Chat-prototype HTML structure;

- Body
    - Wrapper
        - Container
            - Header
                - Top of chat
            - Main
                - Chat Body
                - User/ Bot messages
            - Footer
                - Input form
                - Notification


CSS Structure

_Initital setup_ : 
- Imported Font (Zalando Sans)
- Defined custom colors: Primary color: White , Secondary color: Purple, Accent color: Light blue, Border color: Light gray.
- Reset Margins


_Wrapper_ :
- Sized with padding
- Created color gradient

_Content Box_ :
- Sized content box to with defined min height and width to account for screen sizes
- Aligned content box with flex box

_Header_ :
- Sized with percentage (20% of content box) to account for display sizes
- Aligned with flex box
- Colored with secondary, border var

_Main_ :
- Sized with pertenctage (55% of content box) to account for display sizes
- Allowed overflow on the y axis to scroll through text

_Footer_ :
- Sized with pertenctage (25% of content box) to account for display sizes

_Form_ :
- Sized elements with pixels
- Aligened with flex box

## Implementation Trouble

Dynamic sizing was the hardest part of this project. Using any size unit for wrapper almost always caused interferance when display is resized, padding ensured fixed border regardless of screen size. Content box carried all elements so fixed max width and min height with pixels and kept width and height relative with 100%, and 94vh respectively. Header, main, footer, couldnt be sized using fixed units due to conflicts with each other when screen resizing happened, the best solution was using percentage sizing to ensure each section remains in correct proprotions inside the content box when resizing happened.