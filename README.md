# react-cli

A Command Line Interface for React Web Applications. Based on Ember CLI (https://github.com/ember-cli/ember-cli).

## Usage

### Prerequisites

Node v4.x (or greater) and npm 3.x.

### Installation

Currently, there's no `npm` package so to install, you have to clone the repository locally:

`git clone https://github.com/reactcli/react-cli.git && cd react-cli && npm install && npm link`

### Usage

Once installed, creating a new React project is simple. If you already have an empty directory for your project, you can run:

`react init`

Or, if you need to create a new folder along with your project:

`react new your-project-title`

Once you have your project created, the fun can begin. Currently, `react-cli` supports a very limited set of commands. As we get through the Todo items, this list will grow:

* `react help <command-name>` - Shows the `react-cli` help for the given command. If none is supplied, all help will be shown.

* `react build` - Builds the application and puts the output in the `dist` folder of your project.

* `react serve` - Serves the application using the development server and listens for changes using LiveReload.

* `react generate <type> <name>` - Generates new assets for the `type` of item specified. (see `help` for more details)

## Contributing

There's nothing complicated yet. Just clone the repo, `npm install && npm link`, and start hacking!

### Todos

- [x] `react test` support.
  - [x] Test generation for components
  - [x] Test execution
  - [x] Support for testing in the browser
- [ ] `addon` support
- [ ] Clean up the output
 - [ ] Update, rather than stack, output per task
 - [ ] Show Broccoli output table
 - [ ] Better error display
- [ ] Per-project Blueprint Customization
- [ ] Project Configuration
  - [ ] ES5 vs. ES6 generation
  - [ ] Server port
  - [ ] Project structure (flat vs. pods-ish)?
