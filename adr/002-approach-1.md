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

## Implementation Problems & adjustments

#### _When I submit the text it appears for a split second then dissapears_:

- Because the button type was not specified it defaults to "submit" this causes the page to reload, every time the page relods the messages dissapear

 __Solution__: explicitly set the type to button rather than submit

--- 
#### _The Enter button clears the text field but doesnt submit the message_:

- The Enter button has an event type of submit and submit naturally refreshes the page which deletes the messages

__Solution__: Create an event listener for the form that looks for the event type of "submit" call a function and pass the event "e" then use `e.preventDefault()` to prevent its default action of refershing the page then call `send()`

---
#### _When a message gets too long it extends to the left, make it so that it translates vertically rather than horizontally_:

- Because the input was previously defined as type="text" the text box wouldnt break or wrap and would remain on a single line, need to use `<textarea>`. Text areas enter event action creates a new line rather than refreshing so that needed refactoring aswell

__Solution__: 

- Replaced input tag with textarea tag to get text box functionality
- Inherited font because text area doesnt by default
- Used box-sizing: border-box with top padding to align text vertically (Cannot use flex box since textarea is not flex child)
- Changed eventlistner from chat form to text area specifically
    - Changed event from submit to keydown
    - if statement to see if enter key is pressed without shift key = send message else = newline
---
#### _improting eliza breaks my eventlisteners_:

__Solution__: I was attempting to import eliza from the same directory but it was one directory over the current so doing `../eliza.js` fixed it.

---
#### _My slider stays at the top whenver i send messages in the chat box i need it to focus on the last message sent_ :

The solution to this is simple, I had to set the scrollTop which identifies where the scroll bar sits equal to the scrollHeight which identifies the vertical length in pixels of how long the scroll bar extends. _The problem was_ that my css is setup so that the height and scroll attributes are in my `<main>` container rather than my `<div id="chatBox>` container so trying to call scrollTop and scrollHeight on chatBox did not work.

__Solution__: I had to initalize a new variable with my main container and set scrollTop as scrollHeight in it.

---






