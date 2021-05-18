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
      <>
        <div className="header">{this.props.title}</div>
        <Form/>
        <CardList/>
      </>
    );
  }
}

class Form extends React.Component {
  render() {
    return (
      <form>
        <input placeholder={`Type to Search`}/>
        <button>Add New Card</button>
      </form>
    );
  }
}

class Card extends React.Component {
  render(props) {
    // Each Card Component instance has it's own 'this' reference, each card in the CardList can uses separate profile data.
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
      {/* The .map operator maps each object in the testData array to a 'profile' variable, and then returns an array of Cards.*/}
      {/* Using ...profile makes it so all properties of the profile object (at testData[index]) become React props available to the Card component */}
      {testData.map(profile => <Card {...profile}/>)}
      {/* The result is an array of Cards, like this: [<Card/>,<Card/>,<Card/>] */}
    </div>
  );
};

export default App;
