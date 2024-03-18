import "./note.css"
import {ColorLight, ColorDark, Priority} from './note-type'
import Card from "../card/Card"
import { FaTrash, FaEdit} from 'react-icons/fa'
import { useContext } from "react"
import { ThemeContext } from "../../context/theme/theme"

type NoteProps = {
  id: string;
  text: string;
  priority: Priority;
  editNote: (id:string) => void;
  deleteNote: (id: string) => void;
}

function Note(props: NoteProps) {
  const theme = useContext(ThemeContext)
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
          <FaEdit onClick={() => props.editNote(props.id)} />
          <FaTrash onClick={() => props.deleteNote(props.id)} />
        </div>
      </>
    </Card>
    
  )
}

export default Note;