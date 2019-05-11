const fs = require('fs')
const replace = require('replace-in-file')
const chalk = require('chalk')

const finalise = async (newProjectPath, projectName) => {
  await insertProjectName(newProjectPath, projectName)

  await setupEnv(newProjectPath, projectName)

  console.log(
    chalk.yellow(
      `Node-api created, don't forget to setup a Sentry project and update env.yml`
    )
  )
}

// Replace all instances of "node-api" with the new project name
// e.g package.json, serverless config etc
const insertProjectName = async (newProjectPath, projectName) => {
  const options = {
    files: `${newProjectPath}/*`,
    from: /node-api/g,
    to: projectName
  }

  await replace(options)
}

// Copy our env.example.yml
const setupEnv = async (newProjectPath, projectName) => {
  return fs.copyFileSync(
    `${newProjectPath}/env.example.yml`,
    `${newProjectPath}/env.yml`
  )
}

module.exports = finalise
