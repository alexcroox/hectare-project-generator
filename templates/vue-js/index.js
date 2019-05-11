const rimraf = require('rimraf')

const finalise = async (newProjectPath, projectName) => {
  console.log('Vue.js coming soon....')

  // Temp, delete the generated folder
  rimraf.sync(newProjectPath)

  process.exit()
}

module.exports = finalise
