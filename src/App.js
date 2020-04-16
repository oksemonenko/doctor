import React, { Component } from 'react';
import './App.css';
import SliderContainer from './components/SliderContainer';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import stacksData from './data/stacksData'

export default  class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  onChange = (index) => {
    this.setState({
      selectedIndex: index,
    })
  };

  render() {
    const { selectedIndex } = this.state;

    return (
      <div className="App">
        <div className="container">
          <Hero />
          <header className="codrops-header">
            <h1 className="codrops-title"><a href='#'>Dr. Jhey </a><div>Hombre simple</div></h1>
            <Navigation />
          </header>
          <SliderContainer
            stacks={stacksData}
            selectedIndex={selectedIndex}
            onChange={this.onChange}
          />
          <img className="loader" src="../src/img/three-dots.svg" width="60" alt="Loader image"/>
        </div>
      </div>
    );
  }
}

