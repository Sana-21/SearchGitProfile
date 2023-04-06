import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchItem: "",
      results: [],
      error: null
    };
  }

  searchProfile = () => {
    const { searchItem } = this.state;
    axios.get(`https://api.github.com/search/users?q=${searchItem}`)
      .then(response => {
        this.setState({ results: response.data.items, error: null });
      })
      .catch(error => {
        this.setState({ results: [], error: error.message });
      });
  }

  handleInputChange = (e) => {
    this.setState({ searchItem: e.target.value });
  }

  render() {
    const { searchItem, results, error } = this.state;
    return (
      <div className='Profile'>
        <h1>Github Profile</h1>
        <p>Enter Github profile to search</p>
        <input type='text' placeholder="username" onChange={this.handleInputChange} />
        <br></br>
        <button onClick={this.searchProfile}>Search</button>
        {error ? (
          <p>Error: {error}</p>
        ) : null}

        {results.length > 0 ? (
          <div className='Result'>
            <h2>Search Results</h2>
            <ul>
              {results.map(user => (
                <li key={user.id}>
                   <img src={user.avatar_url} alt="Avatar" />
                   <br></br>
                   <br></br>
                   <a href={user.html_url} target="_blank" rel="noreferrer">
                    {user.login}
                   </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
};

export default App;
