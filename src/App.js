import React from 'react';
import './App.css';
import Slider from './components/Slider';
import stacksData from './data/stacksData'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="hero">
          <div className="hero__back hero__back--static"></div>
          <div className="hero__back hero__back--mover"></div>
          <div className="hero__front"></div>
        </div>
        <header className="codrops-header">
          <h1 className="codrops-title">Dr. Jhey <span>El arte de la simplicidad</span></h1>
        </header>
        <Slider stacks={stacksData} />
        <img className="loader" src="../src/img/three-dots.svg" width="60" alt="Loader image"/>
      </div>
    </div>
  );
}

export default App;
