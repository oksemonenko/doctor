import React from 'react';
import './App.css';
import SliderContainer from './components/SliderContainer';
import Hero from './components/Hero';
import stacksData from './data/stacksData'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Hero />
        <header className="codrops-header">
          <h1 className="codrops-title">Dr. Jhey <span>El arte de la simplicidad</span></h1>
        </header>
        <SliderContainer stacks={stacksData} />
        <img className="loader" src="../src/img/three-dots.svg" width="60" alt="Loader image"/>
      </div>
    </div>
  );
}

export default App;
