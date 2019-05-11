const fs = require('fs')

const copyDirectoryContents = async (sourcePath, destinationPath) => {
  const filesToCreate = fs.readdirSync(sourcePath)

  filesToCreate.forEach(file => {
    const origFilePath = `${sourcePath}/${file}`

    // Get stats about the current file
    const stats = fs.statSync(origFilePath)

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')

      // npm changes .gitignore to .npmignore on publish, we need to reverse this
      if (file === '.npmignore') {
        file = '.gitignore'
      }

      const writePath = `${destinationPath}/${file}`
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${destinationPath}/${file}`)

      // Recursive call
      copyDirectoryContents(
        `${sourcePath}/${file}`,
        `${destinationPath}/${file}`
      )
    }
  })
}

module.exports = copyDirectoryContents
