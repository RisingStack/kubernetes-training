import React, { Component } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
    this.callAPIhello = this.callAPI.bind(this, 'api/v1')
    this.callAPIgit = this.callAPI.bind(this, 'api/v1/git')
  }

  callAPI(endpoint) {
    fetch(`${API_URL}/${endpoint}`, {
      method: 'get'
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({data: json})
          })
        }
      })
      .catch((err) => this.setState({data: `Fetching error: ${err}`}))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.callAPIhello}>Call API</button>
        <button onClick={this.callAPIgit}>Call API git</button>
        <div className="data">{this.state.data}</div>
      </div>
    );
  }
}

export default App;
