import './add-note.css'
import { useContext, useEffect, useState } from 'react';
import { NoteType, Priority } from '../note/note-type';
import { v4 as uuidv4 } from 'uuid';
import Card from '../card/Card';
import { ThemeContext } from '../../context/theme/theme';
import { StateContext } from '../../context/state/state';
import { ADD_NOTE, SET_EDIT_MODE, UPDATE_NOTE } from '../../actions';
import { addNotes, updateNotes } from '../../services/notes-service';


function AddNote() {
  const [text, setText] = useState("");

  const [priority, setPriority] = useState<Priority>('low');
  let theme = useContext(ThemeContext);

  const {state, dispatch} = useContext(StateContext)

  const addNote = async (note: NoteType) => {
    await addNotes(note);
    dispatch({ type: ADD_NOTE, payload: note });
  };
  
  const updateNote = (updatedNote: NoteType) => {
    updateNotes(updatedNote.id, updatedNote);
    dispatch({ type: UPDATE_NOTE, payload: updatedNote });
    dispatch({ type: SET_EDIT_MODE, payload: false });
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const setNoteContent = (note: NoteType) => {
    setText(note.text);
    setPriority(note.priority); 
  }

  useEffect(()=>{
    if(state.noteToBeEdited && state.editMode) {
      setNoteContent(state.noteToBeEdited);
    }
  }, [state.noteToBeEdited, state.editMode])

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(state.editMode) {
      state.noteToBeEdited && updateNote({
        text,
        priority,
        id: state.noteToBeEdited.id
      })
    } else {
      addNote({
        text,
        priority,
        id: uuidv4(),
      });
    }
    setText("");
    setPriority('low');
  }

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority) // type assertion.
  }

  return (
    <Card
      bgColor={theme === 'dark' ? '#333' : '#ddd'}
      height='2'
      padding='1'
    >
      <form className="add-note">
        <input type="text" onChange={handleChange} value={text} />
        <select onChange={handleSelect} value={priority}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleClick}>{state.editMode ? 'Edit' : 'Add'}</button>
      </form> 
    </Card>
  )
}

export default AddNote