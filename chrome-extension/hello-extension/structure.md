# Chrome Extensions
[Development basics](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/)

## Structure an extension project
```
o- my-extension/
   |-- manifest.json
   |-- background.js
   |o- scripts/
   |   |-- content.js
   |   |-- react.production.min.js
   |-- popup/
   |   |-- popup.html
   |   |-- popup.js
   |   |-- popup.css
   |o- images/
       |-- icon-16.png
       |-- icon-32.png
       |-- icon-48.png
       |-- icon-128.png
```

## Using Typescript
[chrome-types](https://github.com/GoogleChrome/chrome-types)