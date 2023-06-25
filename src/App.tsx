import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppRoutes} from "./AppRoutes";
// import {ThemeButton} from "./components/ThemeButton/ThemeButton";

export type ThemeType = 'dark'|'light'

function App() {

    const [theme, setTheme] = useState<ThemeType>('light')

  return (
    <div className="App">
      {/*<ThemeButton setTheme={setTheme} />*/}
      <AppRoutes theme={theme}/>
    </div>
  );
}

export default App;
