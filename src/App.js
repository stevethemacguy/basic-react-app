import './app.css';
import React from 'react';


const testData = [
    {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];


class App extends React.Component {
  render() {
    return (
      <div className="header">{this.props.title}</div>,
      <CardList/>
    );
  }
}

class Card extends React.Component {
  render(props) {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img alt="" src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

const CardList = () => {
  return (
    <div className="card-list">
      {/* The spread operator makes it so all properties of the testData object become React props for the Card component */}
      <Card {...testData[0]}/>
      <Card {...testData[1]}/>
    </div>
  );
};

export default App;
