import './App.css';
import Note from './components/note/Note';
import { Notes } from './components/note/data'
import AddNote from './components/add-note/AddNote';
import { useState } from 'react';
import { NoteType } from './components/note/note-type';

function App() {
  const [notes, setNotes] = useState(Notes)

  const addNote = (note:NoteType) => {
    setNotes([note, ...notes])
  }

  return (
    <div className="App">
      <h2>Notes App</h2>
      <AddNote addNote={addNote} />
      <div>
        {
          notes.map((note) => (
            <Note key={note.id} text={note.text} priority={note.priority}></Note>
          ))
        }
      </div>
    </div>
  );
}

export default App;
