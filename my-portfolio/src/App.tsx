import React from 'react';
import Introduction from './components/Introduction';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import WorkWithMe from './components/WorkWithMe';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Introduction />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <WorkWithMe />
    </div>
  );
}

export default App;