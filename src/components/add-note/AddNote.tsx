import './add-note.css'
import { useContext, useEffect, useState } from 'react';
import { NoteType, Priority } from '../note/note-type';
import { v4 as uuidv4 } from 'uuid';
import Card from '../card/Card';
import { ThemeContext } from '../../context/theme/theme';

type AddNoteProps = {
  addNote: (note: NoteType) => void;
  editMode: boolean;
  noteToBeEdited: NoteType | null;
  updateNote: (updatedNote: NoteType) => void;
}

function AddNote(props: AddNoteProps) {
  const [text, setText] = useState("");

  const [priority, setPriority] = useState<Priority>('low');
  let theme = useContext(ThemeContext);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const setNoteContent = (note: NoteType) => {
    setText(note.text);
    setPriority(note.priority); 
  }

  useEffect(()=>{
    if(props.noteToBeEdited && props.editMode) {
      setNoteContent(props.noteToBeEdited);
    }
  }, [props.noteToBeEdited, props.editMode])

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(props.editMode) {
      props.noteToBeEdited && props.updateNote({
        text,
        priority,
        id: props.noteToBeEdited.id
      })
    } else {
      props.addNote({
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
        <button onClick={handleClick}>{props.editMode ? 'Edit' : 'Add'}</button>
      </form> 
    </Card>
  )
}

export default AddNote