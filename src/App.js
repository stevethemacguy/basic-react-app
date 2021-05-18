import './app.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    // The state MUST be an object in a class component. It can't be a string or normal like with a functional component.
    profileData: []
  };

  addNewProfile = (newProfileData) => {
    // SetState can either take an object or a function. The returned value is the new state
    this.setState(previousState => ({
      // Creates a new array. The existing array is shallow copied using the spread operator, and then the new data object is appended onto the array.
      profileData: [...previousState.profileData, newProfileData]
      // If you don't like the spread operator, you can use Array.concat instead. This also works. However, you CAN'T use
      // previousState.profileData.push(newProfileData) because push will NOT return a new array. Push returns the length of the existing array.
      //profileData: previousState.profileData.concat(newProfileData)
    }))
  };

  render() {
    return (
      <>
        <div className="header">{this.props.title}</div>
        {/* Pass the function to the Child Component as a prop. This allows the child to update the data in the 'parent's' state*/}
        <Form onSubmitFunction={this.addNewProfile}/>
        <CardList profiles={this.state.profileData}/>
      </>
    );
  }
}

class Form extends React.Component {
  state = {
    userName: ''
  }

  handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from refreshing when the form is submitted
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then((response) => {
      this.props.onSubmitFunction(response.data);
      // Optional. Clears the user's input text once they've added the card.
      this.setState({userName: ''});
    })
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder={`Enter GitHub Username`}
          value={this.state.userName}
          onChange={event => this.setState({userName: event.target.value})}/>
        <button>Add New Card</button>
      </form>
    );
  }
}

const CardList = (props) => {
  return (
    <>
      <div className="card-list">
        {/* The .map operator maps each object in the testData array to a 'profile' variable, and then returns an array of Cards.*/}
        {/* Using ...profile makes it so all properties of the profile object (at testData[index]) become React props available to the Card component */}
        {props.profiles.map(profile => <Card {...profile} key={profile.id}/>)}
        {/* The result is an array of Cards, like this: [<Card/>,<Card/>,<Card/>] */}
      </div>
    </>
  );
};

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

export default App;
