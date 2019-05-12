const chalk = require('chalk')
const updateNotifier = require('update-notifier')
const { execSync } = require('child_process')

// Check if we are using the latest version
// If not, force install the latest and exit
const versionCheck = pkg => {
  return new Promise(resolve => {
    updateNotifier({
      pkg,
      callback: (error, update) => {
        if (error) {
          console.log(
            chalk.red('Error confirming latest version, please try again')
          )
          process.exit()
        }

        if (update.type !== 'latest') {
          console.log(
            chalk.yellow.bold('There is a new version available, installing...')
          )

          execSync(`npm update -g ${pkg.name}`)

          console.log(
            chalk.green.bold('New version installed, please try again')
          )

          process.exit()
        }

        resolve()
      }
    })
  })
}

module.exports = versionCheck
