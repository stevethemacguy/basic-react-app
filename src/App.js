import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

const App = (props) => {
  // ProfileDataState is set to the starting state (i.e. an object with a 'profileData' array).
  // setProfileData is the updater function, which is used to update the ProfileDataState.
  const [profileDataState, setProfileData] = useState({
    profileData: []
  });

  const addNewProfile = (newProfileData) => {
    // Setting the state can be do with either an object or a function (a string or number works too). The returned value is the new state.
    setProfileData(previousState => ({
      // Creates a new array. The existing array is shallow copied using the spread operator, and then the new data object is appended onto the array.
      profileData: [...previousState.profileData, newProfileData]
      // If you don't like the spread operator, you can use Array.concat instead. This also works. However, you CAN'T use
      // previousState.profileData.push(newProfileData) because push will NOT return a new array. Push returns the length of the existing array.
      //profileData: previousState.profileData.concat(newProfileData)
    }))
  };

  return (
    <>
      <div className="header">{props.title}</div>
      {/* Pass the function to the Child Component as a prop. This allows the child to update the data in the 'parent's' state*/}
      <Form onSubmitFunction={addNewProfile}/>
      <CardList profiles={profileDataState.profileData}/>
    </>
  );
};

const Form = (props) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from refreshing when the form is submitted
    const response = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmitFunction(response.data);
    // Optional. Clears the user's input text once they've added the card.
    setUserName('');
  };

  // Alternatively, you can use the traditional .then() instead of async/await
  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Prevent the page from refreshing when the form is submitted
  //   axios.get(`https://api.github.com/users/${userName}`)
  //   .then((response) => {
  //     props.onSubmitFunction(response.data);
  //     // Optional. Clears the user's input text once they've added the card.
  //     setUserName('');
  //   })
  // };

  const handleOnChange = (event) => {
    // Note: You don't have to use an object or function when updating the state. You can also just use the value.
    setUserName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder={`Enter GitHub Username`}
        value={userName}
        onChange={handleOnChange}/>
      <button>Add New Card</button>
    </form>
  );
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

const Card = (props) =>  {
  const profile = props;
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

export default App;
