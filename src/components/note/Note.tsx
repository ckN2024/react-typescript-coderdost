import "./note.css"
import {ColorLight, ColorDark, Priority, NoteType} from './note-type'
import Card from "../card/Card"
import { FaTrash, FaEdit} from 'react-icons/fa'
import { useContext } from "react"
import { ThemeContext } from "../../context/theme/theme"
import { StateContext } from "../../context/state/state"
import { DELETE_NOTE, SET_EDIT_MODE, SET_NOTE_FOR_EDIT } from "../../actions"
import { deleteNotes } from "../../services/notes-service"

type NoteProps = {
  id: string;
  text: string;
  priority: Priority;
  note: NoteType;
}

function Note(props: NoteProps) {
  const theme = useContext(ThemeContext)
  const {state, dispatch} = useContext(StateContext)
  const editNote = (note: NoteType) => {
    dispatch({ type: SET_EDIT_MODE, payload: true });
    dispatch({ type: SET_NOTE_FOR_EDIT, payload: note });
  };

  const deleteNote = async (id: string) => {
    await deleteNotes(props.id)
    dispatch({ type: DELETE_NOTE, payload: id });
  };

  return (
    <Card 
      bgColor={theme === 'dark' ? props.priority && ColorDark[props.priority] : props.priority && ColorLight[props.priority]}
      height='2'
      padding='1'
    >
      <>
        <div>
          {props.text}
        </div>
        <div className='right-corner'>
          <FaEdit onClick={() => editNote(props.note)} />
          <FaTrash onClick={() => deleteNote(props.id)} />
        </div>
      </>
    </Card>
    
  )
}

export default Note;