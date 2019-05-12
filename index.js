#!/usr/bin/env node

const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const clipboardy = require('clipboardy')
const pkg = require('./package.json')

const copyDirectoryContents = require('./lib/copy-directory')
const versionCheck = require('./lib/version-check')

console.log(chalk.black.bgGreen(`Hectare Project Generator v${pkg.version}`))

// Check we have the latest version before allowing selection
const init = async () => {
  await versionCheck(pkg)
  prompt()
}

const CURRENT_DIRECTORY = process.cwd()
const templates = ['node-api', 'vue-js']
const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: templates
  },
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name:',
    validate: input => {
      return input && input.trim() !== ''
    }
  }
]

const prompt = async () => {
  let answers = await inquirer.prompt(QUESTIONS)

  const templateChoice = answers.template
  const templatePath = `${__dirname}/templates/${templateChoice}/template`
  const projectName = answers.projectName
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase()
  const newProjectPath = `${CURRENT_DIRECTORY}/${projectName}`

  // Make our new project folder
  fs.mkdirSync(newProjectPath)

  await copyDirectoryContents(templatePath, newProjectPath)

  // Run template specific next steps
  const finalise = require(`./templates/${templateChoice}`)
  await finalise(newProjectPath, projectName)

  let nextCommand = `cd ${projectName} && npm i && npm run dev`

  // Write the command to the clipboard for convience
  clipboardy.writeSync(nextCommand)

  console.log(
    chalk.green(
      chalk.magenta(projectName),
      'created, now run the following, it has been auto copied to your clipboard'
    )
  )
  console.log(chalk.inverse(nextCommand))
}

init()
