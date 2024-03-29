import './App.css';
import { useEffect, useState } from 'react';
import { ThemeContext } from './context/theme/theme';
import Home from './pages/home/Home';
import Switch from "react-switch";
import { NoteType } from './components/note/note-type';
import { useReducer } from 'react';
import { StateContext } from './context/state/state';
import { ADD_NOTE, DELETE_NOTE, INIT_NOTES, SET_EDIT_MODE, SET_NOTE_FOR_EDIT, UPDATE_NOTE } from './actions';
import { getNotes } from './services/notes-service';
import DetailedNote from './pages/detailed-note/DetailedNote';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/:id",
    element: <DetailedNote></DetailedNote>,
  },
]);

type StateType = {
  notes:NoteType[],
  editMode: boolean,
  noteToBeEdited: NoteType | null,
}

function App() {
  let defaultTheme;

  // dark theme auto detection
  if(window.matchMedia && window.matchMedia('prefers-color-scheme: dark').matches) {
    defaultTheme = 'dark'
  } else {
    defaultTheme = 'light'
  }

  const [theme, setTheme] = useState(defaultTheme);
  const [checked, setChecked] = useState(defaultTheme === 'dark');

  const [state, dispatch] = useReducer((state: StateType, action: {type:string, payload:any})=>{
    switch(action.type) {
      case INIT_NOTES :
        return {...state, notes: action.payload}

      case SET_EDIT_MODE : 
        return {...state, editMode: action.payload}

      case SET_NOTE_FOR_EDIT : 
        return {...state, noteToBeEdited: action.payload}

      case ADD_NOTE:
        return {...state, notes:[action.payload, ...state.notes]}
      case DELETE_NOTE:
        const index = state.notes.findIndex((note) => note.id === action.payload);
        let editedNotes = [...state.notes];
        editedNotes.splice(index, 1);
        return {...state, notes:editedNotes}
      case UPDATE_NOTE:
        const indexUpdated = state.notes.findIndex((note) => note.id === action.payload.id);
        let editedNotesUpdated = [...state.notes];
        editedNotesUpdated.splice(indexUpdated, 1, action.payload);
        return {...state, notes:editedNotesUpdated}

      default:
        return state;
    }
  }, {notes: [] , editMode: false, noteToBeEdited: null})

  const checkForTheme = (check:boolean) => {
    if(check) {
      setTheme('dark');
  
    } else {
      setTheme('light');
    }
  }

  const changeHandler = (check:boolean) => {
    setChecked(!checked); 
    checkForTheme(check) 
  }
  
  useEffect(()=>{
    async function initializeNotes() {
      const notes = await getNotes()
      dispatch({type: INIT_NOTES, payload: notes})
    }

    initializeNotes();
    checkForTheme(checked);
  }, [state.notes])

  return (
    <StateContext.Provider value={{state, dispatch}}>
      <ThemeContext.Provider value={theme}>
        <Switch 
          onChange={changeHandler} 
          checked={checked}
          className='react-switch'
          onColor="#ddd"
          offColor="#333"
        ></Switch>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </StateContext.Provider>
    
    
  );
}

export default App;
