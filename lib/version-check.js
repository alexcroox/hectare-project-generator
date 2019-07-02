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
          console.log(chalk.red('Error confirming latest version, please try again'))
          process.exit()
        }

        if (update.type !== 'latest') {
          console.log(
            chalk.yellow.bold(
              `There is a new version (v${update.latest}) available, installing... If this fails run: npm update -g ${
                pkg.name
              }`
            )
          )

          try {
            execSync(`npm update -g ${pkg.name}`)
          } catch (error) {
            console.error(error)
            console.log(chalk.red(`Error self updating, run manually: npm update -g ${pkg.name}`))
            process.exit()
          }

          console.log(chalk.green.bold('New version installed, please try again'))

          process.exit()
        }

        resolve()
      }
    })
  })
}

module.exports = versionCheck
