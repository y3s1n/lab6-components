# ADR-003: Building chat interface using web componenets. Build using progressive enhancement to account for lack of JavaScript

## Context

#### This version contains a base that appears with no JavaScript is available but is enhanced using custom element web componenets when JS is enabled.

1. In HTML, define your custom element with initial markup inside:

```
<simple-chat>
  <div class="messages">
    <div class="message bot">Hello! How can I help you?</div>
  </div>
  <form class="input-area">
    <input type="text" placeholder="Type a message...">
    <button type="submit">Send</button>
  </form>
</simple-chat> 

```

2. Create a custom element class that:

- Extends HTMLElement
- In connectedCallback(), finds the existing markup inside the element
- Attaches event listeners to the form
- Adds the bot logic and message handling
- Does NOT use Shadow DOM (styles are global)

3. Register the custom element:

`customElements.define('simple-chat', SimpleChat);`

4. If JavaScript fails to load, the basic HTML structure remains visible and semantic.

## Expectations

__Key Learning__: Progressive enhancement - start with HTML, enhance with JavaScript. The component works (shows content) even if JavaScript fails.

## Problems and Solutions

_I want to be able to use my css styling but it places the message area in main and the input form in the footer, the custom element contains both and cant be split over the two_

The webcomponent I built this with encapsulated the chatBox and the textarea which were previously were in main and fotter respectively, styling was on the container rather than the elements

__Solution__: moved styling directly to elements rather than the containers

_why cant i use the keyword function?_

All the functions I copied over from chat-dom didnt work if they had function, similarily in my event listeners I had to call my functions using lambda rather than a function

__Answer__: ...

_why do i have to preface everthing with `this`?_

__Answer__: ...

_Bot responses not working_

The call to processMessage was not going through

__Solution__: Use this to specify the function call



