import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
    this.callAPIhello = this.callAPI.bind(this, 'api/v1')
    this.callAPIgit = this.callAPI.bind(this, 'api/v1/git')
  }

  callAPI(endpoint) {
    console.log(endpoint)
    fetch(`http://localhost:5000/${endpoint}`, { 
      method: 'get'
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          response.json().then(json => {
            console.log(json)
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
