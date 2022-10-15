const NOTES_KEY = 'notes';

function addLocalNote(noteText) {
    const notes = getLocalNotes();
    notes.push(noteText);
    setNotes(notes);
}

function removeLocalNote(index) {
    const notes = getLocalNotes();
    notes.splice(index, 1);
    setNotes(notes);
}

function setNotes(notes) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function getLocalNotes() {
    const noteString = localStorage.getItem(NOTES_KEY);
    if (noteString) {
        return JSON.parse(noteString);
    } else {
        return [];
    }
}

function refreshNotes() {
    const notes = getLocalNotes();
    const noteListDOM = document.getElementById('noteList');
    noteListDOM.innerHTML = '';
    notes.forEach(note => {
        if (note) {
            const noteDOM = document.createElement('div');
            noteDOM.classList.add('note');
            noteDOM.innerHTML = note;
            noteListDOM.appendChild(noteDOM);
        }
    });
}

function openNoteEditor() {
    const saveBtnDOM = document.getElementById('saveBtn');
    saveBtnDOM.disabled = true;
    const noteEditorModalDOM = document.getElementById('noteEditorModal');
    noteEditorModalDOM.classList.remove('hide');
}

function closeNoteEditor() {
    const noteEditorDOM = document.getElementById('noteEditor');
    noteEditorDOM.value = '';
    const noteEditorModalDOM = document.getElementById('noteEditorModal');
    noteEditorModalDOM.classList.add('hide');
}

function saveNote() {
    const noteEditorDOM = document.getElementById('noteEditor');
    const noteValue = noteEditorDOM.value;
    if (noteValue) {
        addLocalNote(noteValue);
        refreshNotes();
    }
    closeNoteEditor();
}

function onInputChange() {
    const noteEditorDOM = document.getElementById('noteEditor');
    const saveBtnDOM = document.getElementById('saveBtn');
    const noteValue = noteEditorDOM.value;
    if (noteValue) {
        saveBtnDOM.disabled = false;
    } else {
        saveBtnDOM.disabled = true;
    }
}

refreshNotes();