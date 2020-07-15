const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
  console.log(chalk.inverse('Your notes'));
  const notes = loadNotes();
  notes.forEach(note => console.log(note.title))
}
const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find(note => note.title === title);

  debugger;

  if(!duplicateNote){
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log('New note added')
  }else {
    console.log('Note title taken!')
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSsON);
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(x => x.title !== title);
  if(notesToKeep.length === notes.length){
    console.log(chalk.red.inverse('No note found!'));
  }else{
    console.log(chalk.green.inverse('Note removed!'))
  }
  saveNotes(notesToKeep);
}

const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    debugger;
    return JSON.parse(dataJSON);
  }catch (e) {
    return []
  }

}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(x => x.title === title);
  if(note){
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  }else{
    console.log(chalk.red.inverse("No note found"))
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
}
