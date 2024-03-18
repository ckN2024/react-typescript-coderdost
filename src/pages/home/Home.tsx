import './home.css';
import Note from '../../components/note/Note';
import { Notes } from '../../components/note/data'
import AddNote from '../../components/add-note/AddNote';
import { useState, useContext } from 'react';
import { NoteType } from '../../components/note/note-type';
import { ThemeContext } from '../../context/theme/theme';

function Home() {
  const [notes, setNotes] = useState(Notes)
  const [editMode, setEditMode] = useState(false);
  const [noteToBeEdited, setNoteToBeEdited] = useState<NoteType | null>(null);

  const theme = useContext(ThemeContext)

  const addNote = (note:NoteType) => {
    setNotes([note, ...notes])
  }

  const updateNote = (updatedNote: NoteType) => {
    const index = notes.findIndex(note => note.id === updatedNote.id);
    let editedNotes = [...notes]
    editedNotes.splice(index, 1, updatedNote);
    setNotes(editedNotes);
    setEditMode(false);
  }

  const editNote = (id: string) => {
    const note = notes.find(note => note.id === id);
    setEditMode(true);
    
    if(note) {
      setNoteToBeEdited(note)
    }
  }

  const deleteNote = (id: string) => {
    const index = notes.findIndex(note => note.id === id);
    let editedNotes = [...notes]
    editedNotes.splice(index, 1);
    setNotes(editedNotes);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`home ${theme}`}>
        <h2>Notes App ({notes.length} notes)</h2>
        <AddNote addNote={addNote} editMode={editMode} noteToBeEdited={noteToBeEdited} updateNote={updateNote}/>
        <div>
          {
            notes.map((note) => (
              <Note key={note.id} id={note.id} text={note.text} priority={note.priority} editNote={editNote} deleteNote={deleteNote}></Note>
            ))
          }
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Home;