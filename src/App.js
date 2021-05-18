import './app.css';

const App = ({title}) => (
  <div className="header">{title}</div>,
  <CardList/>
);

const Card = () => {
  return (
    <div className="card">Hey</div>
  );
};

const CardList = () => {
  return (
    <div className="card-list">
      <Card/>
    </div>
  );
};

export default App;
