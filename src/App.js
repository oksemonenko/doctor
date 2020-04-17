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
      count: 0,
    };
  }

  onChange = (index, updateCount = false) => {
    const { count } = this.state;
    const updatedCount = updateCount ? count + 1 : count;
    this.setState({
      selectedIndex: index,
      count: updatedCount,
    })
  };

  render() {
    const { selectedIndex, count } = this.state;

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
            count={count}
            onChange={this.onChange}
          />
          <img className="loader" src="../src/img/three-dots.svg" width="60" alt="Loader image"/>
        </div>
      </div>
    );
  }
}

