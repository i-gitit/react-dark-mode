import React from 'react';
import './App.css';
import { Navbar, Nav } from 'reactstrap';
import DarkModeToggle from "react-dark-mode-toggle";

function App() {

  const [darkMode, setDarkMode] = React.useState(getInitialMode());
  React.useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPrefColorScheme();
    // if mode was saved --> dark / light
    if (isReturningUser) {
      return savedMode;
      // if preferred color scheme is dark --> dark
    } else if (userPrefersDark) {
      return true;
      // otherwise --> light
    } else {
      return false;
    }
    // return savedMode || false;
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <div className="App">
      <div className={darkMode ? "dark-mode" : "light-mode"}>
      
      <Navbar dark expand="md">
        <div className="container">    
            <Nav navbar className="mx-auto">
                <DarkModeToggle
                  checked={darkMode}
                  onChange={() => setDarkMode(prevMode => !prevMode)}
                  size={80}
                />
            </Nav>
        </div>
      </Navbar>

      <div className="container mt-3 p-5">
        <h1>{darkMode ? "Dark Mode🌟" : "Light Mode🌞"}</h1>
        <h2>Toggle the switch to see some magic✨ happen!</h2>
        <div className='row mt-5'>
          <div className="col-12 offset-md-6 col-md-6">
            <img src={darkMode ? '../assets/dark.svg':'../assets/light.svg'} className="img-fluid" alt="Ambiance SVG" ></img>
           
          </div>
        </div>        
      </div>
      </div>
     
    </div>
  );
}

export default App;