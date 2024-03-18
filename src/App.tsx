import './App.css';
import { useState } from 'react';
import { ThemeContext } from './context/theme/theme';
import Home from './pages/home/Home';
import Switch from "react-switch";

function App() {
  const [theme, setTheme] = useState('dark');
  const [checked, setChecked] = useState(false);

  const changeHandler = (check:boolean) => {
    setChecked(!checked);
    if(check) {
      setTheme('dark');

    } else {
      setTheme('light');
    }
      
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Switch 
        onChange={changeHandler} 
        checked={checked}
        className='react-switch'
        onColor="#ddd"
        offColor="#333"
      ></Switch>
      <Home></Home>
    </ThemeContext.Provider>
    
  );
}

export default App;
