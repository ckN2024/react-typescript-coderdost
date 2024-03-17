import './App.css';
import Note from './components/note/Note';
import { Notes } from './components/note/data'

function App() {
  return (
    <div className="App">
      <h2>React with typescript</h2>
      <div>
        {
          Notes.map((note) => (
            <Note key={note.id} text={note.text} priority={note.priority}></Note>
          ))
        }
      </div>
    </div>
  );
}

export default App;
