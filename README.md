# @hectare/project-generator

CLI tool to bootstrap new projects:

- Node API
- Vue.js

![gif](https://raw.githubusercontent.com/alexcroox/hectare-project-generator/master/demo.gif)

## Install

#### Prerequisites

You must have an `NPM_TOKEN` environment variable set globally on your machine.

```
export NPM_TOKEN="xxxx"

source ~/.profile
```

The xxxx value can be found in `LastPass -> @hectare npm token`

Since we are going to be installing a global package we'll need to create a `.npmrc` file in our User folder e.g

`/Users/alex/.npmrc`

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

Now you are ready to install the global private package.

#### Install globally

`npm i @hectare/project-generator -g`

See README.md inside `/templates/` for more info on each template

## Usage

When you are ready to create a new project in your current directory, run:

`hectare-generate`

and follow the prompts.

## Keeping up to date

Running `hectare-generate` will auto check for a new version and self update. This means if there is a change in our template structure you will always be creating new projects with the latest and greatest.
