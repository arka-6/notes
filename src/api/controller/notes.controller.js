const AppFileUtil = require('../util/file.util');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const getAllNotes = (req, res) => {

    res.json(AppFileUtil.readData('note'));

}

const saveNote = (req, res) => {

    try {
        const noteBody = req.body;
        if (noteBody.noteText) {
            noteBody.id = getRandomInt(10000, 99999);
            let notes = AppFileUtil.readData('note');
            notes.push(noteBody);
            AppFileUtil.writeData('note', notes);
        }
        res.json({ success: true });
    } catch (ex) {
        res.status(500).json({ 'error': ex })
    }

}

const editNote = (req, res) => {

    try {
        const noteId = req.params.id;
        const noteBody = req.body;
        if (noteId && noteBody.noteText) {
            noteBody.id = noteId;
            const notes = AppFileUtil.readData('note');
            const noteToEdit = notes.find((n) => n.id == noteId);
            noteToEdit.noteText = noteBody.noteText;
            AppFileUtil.writeData('note', notes);
        }
        res.json({ success: true });
    } catch (ex) {
        res.status(500).json({ 'error': { 'message': 'An Error has occurred' } })
    }

}

const deleteNote = (req, res) => {

    try {
        const noteId = req.params.id;
        if (noteId) {
            const notes = AppFileUtil.readData('note');
            const noteToDeleteIndex = notes.findIndex((n) => n.id == noteId)
            notes.splice(noteToDeleteIndex, 1);
            AppFileUtil.writeData('note', notes);
        }
        res.json({ success: true });
    } catch (ex) {
        res.status(500).json({ 'error': { 'message': 'An Error has occurred' } })
    }

}

module.exports = {
    getAllNotes,
    saveNote,
    editNote,
    deleteNote
}