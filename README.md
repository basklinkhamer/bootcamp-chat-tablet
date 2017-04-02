# bootcamp-chat-tablet
Cordova-based tablet version of the [bootcamp-chat-app](https://github.com/basklinkhamer/bootcamp-chat-app)

## Description

The app contains the following functionality out of the box:
- Connection to a hosted chatserver (an instance of [this project](https://github.com/basklinkhamer/electron-chat-server))
- A nice frontend based on [Angular Material Design](https://material.angularjs.org/latest/)
- User accounts with Gravatar integration (though absolutely no authentication)
### TODO:
- Add notifications when the app window is blurred.

## Prerequisites

Make sure you have the following packages available globally:
- [NodeJS](https://nodejs.org/en/download/package-manager/)
- [Gulp CLI](http://gulpjs.com/)
- [Bower](https://bower.io/)
- [Apache Cordova](https://cordova.apache.org/)

In case of doubt, run:
```
npm install -g gulp-cli bower cordova
```

## Installation

```
npm install && bower install
```

## Run App

```
cordova run browser
```

## Further development

1. Run `gulp development`
2. A webserver will start in your browser and gulp will watch your files
3. You can now make adjustments to the design and development!
4. Add your favorite platform and test on devices.
