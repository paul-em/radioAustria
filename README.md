## Radio Austria

> This is a radio player for austrian radio stations (Ö3, Fm4, Ö1, + 9 district radios)
 There is a web version available at [radio.paulem.eu](https://radio.paulem.eu) and a chrome packaged app. 
 But packaged apps are soon to be history and therefore this repository aims to bring the radioplayer to [Electron](http://electron.atom.io/). 

### Included in this app

* [Polymer](http://polymer-project.org), [Paper](https://elements.polymer-project.org/browse?package=paper-elements) and [Iron](https://elements.polymer-project.org/browse?package=iron-elements) elements
* [Material Design](http://www.google.com/design/spec/material-design/introduction.html) layout 
* Routing with [Page.js](https://visionmedia.github.io/page.js/)
* End-to-end Build Tooling (including [Vulcanize](https://github.com/Polymer/vulcanize))

## Getting Started

To be able to contribute:

1. Get a copy of the code.
2. Install the dependencies if you don't already have them.

### Install dependencies

#### Quick-start (for experienced users)

With Node.js installed, run the following one liner from the root of the project download:

```sh
npm install -g gulp bower && npm install && bower install && npm run rebuild
```

#### Prerequisites (for everyone)

The app requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages (like Polymer).
- MPRIS-Service w/ DBUS, enables MPRIS features.

**To install dependencies:**

1)  Check your Node.js version.

```sh
node --version
```

The version should be at or above 0.12.x. 

2)  If you don't have Node.js installed, or you have a lower version, go to [nodejs.org](https://nodejs.org) and click on the big green Install button. 

3)  Install `gulp` and `bower` globally.

```sh
npm install -g gulp bower
```

This lets you run `gulp` and `bower` from the command line.

4)  Install the project's local `npm` and `bower` dependencies.

```sh
cd RadioAustria && npm install && bower install
```

This installs the element sets (Paper, Iron, Platinum) and tools the starter kit requires to build and serve apps.

5)  Rebuild MPRIS-Service for Electron.
```sh
npm run rebuild
```

### Development workflow

#### Serve / watch

```sh
gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.

#### Run with Electron

```sh
npm start
```

This runs the project by building, vulcanizing and starting the Electron shell.

#### Build & Vulcanize

```sh
gulp
```

Build and optimize the current project, ready for deployment. This includes linting as well as vulcanization, image, script, stylesheet and HTML optimization and minification.

## Application Theming

Polymer 1.0 introduces a shim for CSS custom properties. We take advantage of this in `app/styles/app-theme.html` to provide theming for your application. You can also find our presets for Material Design breakpoints in this file.

[Read more](https://www.polymer-project.org/1.0/docs/devguide/styling.html) about CSS custom properties.


## Dependency Management

Polymer uses [Bower](http://bower.io) for package management. This makes it easy to keep your elements up to date and versioned. For tooling, we use npm to manage Node.js-based dependencies.

## Contributing

We are open to all new contributors. Feel free to create some pull requests and just contact us if you want to be collaborator.
