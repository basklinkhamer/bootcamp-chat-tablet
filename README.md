# bootcamp-chat-app
This electron app will be used for  the **Electron Session** on the **Sogeti Digital Bootcamp** on the 7th of April, 2017.

## Description

The app contains the following functionality out of the box:
- Connection to a hosted chatserver (an instance of [this project](https://github.com/basklinkhamer/electron-chat-server))
- A nice frontend based on [Angular Material Design](https://material.angularjs.org/latest/)
- User accounts with Gravatar integration (though absolutely no authentication)
- Native notifications through [node-notifier](https://www.npmjs.com/package/node-notifier) when the app window is blurred.

## Prerequisites

Make sure you have the following packages available globally:
- [NodeJS](https://nodejs.org/en/download/package-manager/)
- [Gulp CLI](http://gulpjs.com/)
- [Bower](https://bower.io/)
- [Electron-Forge](https://beta.electronforge.io/)

In case of doubt, run:
```
npm install -g gulp-cli bower electron-forge
```

## Installation

```
npm install && bower install
```

## Run App

```
npm start
```

## Further development

1. Comment the lines adding the `angular-electron` package to the app.
2. Next, run `gulp development`.
3. A webserver will start in your browser and gulp will watch your files.
4. You can now make adjustments to the design and development!
5. If you uncomment the lines from step 1 and cancel the webserver you can run `npm start` again.
(This command runs the `gulp dist` task and immediately runs `electron-forge start`.)

