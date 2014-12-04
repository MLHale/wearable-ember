# Wearable-ember

This is a demonstration app for integrating an ember-based-cli application with Apache Cordova, and Metawear.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)
* [cordova](https://github.com/apache/cordova-js)

## Installation

* `git clone https://github.com/MLHale/wearable-ember' this repository
* change into the new directory
* `npm install`
* `bower install`
* `npm install -g cordova`

## Running / Development

To run in the browser
* `ember server`
* Visit your app at http://localhost:4200
* Consider using something like [ripple] (http://ripple.incubator.apache.org/)

To run on your device:
* Pair the device via usb
* `ember cordova:build --platform android`
* `ember cordova run --platform android`

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Deploying

*(for web) Run `ember build` then move the dist/ directory to your cordova build directory.
*(for device) Run `ember cordova:build --platform android` then move /cordova/platforms/android/[filename].apk to your device.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* ember-cli-cordova: https://github.com/poetic/ember-cli-cordova
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

