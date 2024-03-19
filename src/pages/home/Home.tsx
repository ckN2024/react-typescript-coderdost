import "./home.css";
import Note from "../../components/note/Note";
import AddNote from "../../components/add-note/AddNote";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme/theme";
import { StateContext } from "../../context/state/state";


function Home() {
  const theme = useContext(ThemeContext);
  const { state, dispatch } = useContext(StateContext);

  return (
    // <ThemeContext.Provider value={theme}>
      <div className={`home ${theme}`}>
        <h2>Notes App ({state.notes.length} state.notes)</h2>
        <AddNote />
        <div>
          {state.notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              priority={note.priority}
              note={note}
              height= "3"
            ></Note>
          ))}
        </div>
      </div>
    // </ThemeContext.Provider>
  );
}

export default Home;
