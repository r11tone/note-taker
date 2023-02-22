const util = require("util");
const fs = require("fs");
const uuid = require("uuid/v1");
const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);

class Store {
    read() {
        return readfile("db/db.json", "utf8")
    }
    write(note) {
        return writefile("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then((notes) => {
            let allNotes;
            try {
                allNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                allNotes = []
            }
            return allNotes
        })
    }
    addNote(note) {
        const { title, text } = note
        if (!title || !text) {
            throw new Error("title and text cannot be blank")
        }
        const newNote = { title, text, id: uuid() }
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote)
    }
    deleteNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes))
    }
}

module.exports = new Store ()