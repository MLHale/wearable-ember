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

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.
* To run on your device:
** Pair the device via usb
** ember cordova:build --platform android
** ember cordova run

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Run 'ember build' then move the dist/ directory to your cordova build directory.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* ember-cli-cordova: https://github.com/poetic/ember-cli-cordova
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

