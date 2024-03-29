const fs = require('fs')
const chalk = require('chalk')

//Adding a note
addNote = function (title, body) {

  const notes = getAllNotes()

  var result = notes.find(function (note) {
    return note.title === title
  })

  if (result === undefined) {
    notes.push({ title: title, body: body })
    const stringNotes = JSON.stringify(notes)
    fs.writeFileSync('notes.json', stringNotes)
    console.log(chalk.black.bgGreen('Note Added'))
  }
  else {
    console.log(chalk.white.bold.bgRed('Note Already Added!'))
  }
}

//Removing a Note
removeNote = function (title) {

  const notes = getAllNotes()

  var result = notes.filter(function (note) {
    return note.title !== title
  })

  if (result.length === notes.length) {
    console.log(chalk.white.bold.bgRed('No Title Found to be Removed '))
  }
  else {
    const stringNotes = JSON.stringify(result)
    fs.writeFileSync('notes.json', stringNotes)
    console.log(chalk.black.bgGreen('Note Removed'))
  }
}

//Reading a note
readNote = function (title) {

  const notes = getAllNotes()

  var result = notes.find(function (note) {
    return note.title === title
  })

  if (result === undefined) {
    console.log(chalk.bgRed.bold.white('No Title Found to be Read'))
  }
  else {
    console.log(chalk.bold.yellow('TITLE: ') + chalk.bold.blue(result.title))
    console.log(chalk.bold.yellow('BODY : ') + chalk.bold.blue(result.body))
  }
}

//All the nodes
listNotes = function () {

  const notes = getAllNotes()

  if (notes.length === 0) {
    console.log(chalk.white.bold.bgRed('No Notes Available '))
  }
  else {
    notes.forEach(function (note) {
      console.log(chalk.bold.yellow('TITLE: ') + chalk.bold.blue(note.title))
    })
  }
}

getAllNotes = function () {
  try {
    const bufferData = fs.readFileSync('notes.json')
    const jsonData = bufferData.toString()
    return JSON.parse(jsonData)
  }
  catch (error) {
    return []
  }
}

module.exports = {
  add: addNote,
  remove: removeNote,
  read: readNote,
  list: listNotes
}