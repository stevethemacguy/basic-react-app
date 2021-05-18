import './app.css';
import React from 'react';

class App extends React.Component {

  constructor() {
    super();
    this.title = 'Yo';
  }

  render() {
    return (
      <div className="header">{this.props.title}</div>,
      <CardList/>
    );
  }
}

class Card extends React.Component {
  render() {
    return (
      <div className="github-profile">
        <img alt="" src="https://placehold.it/75" />
        <div className="info">
          <div className="name">Name here...</div>
          <div className="company">Company here...</div>
        </div>
      </div>
    );
  }
}

class CardList extends React.Component {
  render() {
    return (
      <div className="card-list">
        <Card/>
        <Card/>
      </div>
    );
  }
}

export default App;
