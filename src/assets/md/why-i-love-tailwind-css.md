In this article I'm going to describe *four* main reason why I love so much
[tailwindcss](https://tailwindcss.com).


# 1. Speed up the development process

Usually whenever you need to add style to your page you need to context 
switch from one file (.html) to another (.css). 
With tailwind css you have a Utility-First tool where almost all the needed css
instruction are made available in pre-existing classes. 
You need only to use them directly in the .html file without writing a single line of CSS.

So you pass from this:

```html  
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```  

To this:

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```  

Wait a moment, I know what you’re thinking. What about the [separation of concern](https://en.wikipedia.org/wiki/Separation_of_concerns) design principle:


## Each section addresses a separate concern, a set of information that affects the code of a computer program Obtaining the exact same design.
That is right, but think a moment to the benefit you gain:


* You aren’t wasting energy inventing class names. And trust me, when you come up with a css class name then you need to remember it in order to “reuse” it effectively

* Near zero context switch: you can focus on your page layout

When you realize how _productive_ you can be working exclusively in HTML with predefined utility classes, working any other way will feel like torture.

# 2. Responsive Design made easy

There are lots of utility, framework or library that makes this possible, but in this Tailwind CSS really shines. By default, Tailwind uses a mobile first breakpoint system, where the default is the mobile screen, then 
if you want to change the layout you can simply override it:


```html
<!-- This will center text on mobile, and left align it on screens 640px and wider -->
<div class="text-center sm:text-left"></div>

```

# 3. Dark Mode in one keyword

Here how to set the layout for dark mode, it is done exactly in the same file together with the bright version:

```html
 <!-- Will be automatically black or white depeneding on the operating system preference -->
  <div class="bg-white dark:bg-black">
    <!-- ... -->
  </div>

```

If you want to manually handle this just put a *dark* class  in the HTML tree:

```html
<!-- Dark mode enabled -->
<html class="dark">
<body>
  <!-- Will be black -->
  <div class="bg-white dark:bg-black">
    <!-- ... -->
  </div>
</body>
</html>

```
# 4. Ready For Production

Tailwind CSS is incredibly performance focused and aims to produce the smallest CSS file possible by only generating the CSS you are actually using in your project.

During the build phase for production tailwind is able to cut all the classes not needed from your css file. Creating a css file so small you don’t have to worry about complex solutions like code-splitting your CSS for each page, and can instead just ship a single small CSS file that’s downloaded once and cached until you redeploy your site.



# Credits

[Tailwind CSS](https://tailwindcss.com)

[Tailwind CSS: Dark Mode](https://tailwindcss.com/docs/dark-mode)

[Tailwind CSS: Responsive Design](https://tailwindcss.com/docs/responsive-design)
