import React, { Component } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
    this.callAPIv1 = this.callAPI.bind(this, {'version': 'v1'})
    this.callAPIv2 = this.callAPI.bind(this, {'version': 'v2'})
  }

  callAPI(header) {
    fetch(`${API_URL}/api`, {
      method: 'get',
      headers: header
    })
      .then((response) => {
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
        <button onClick={this.callAPIv1}>Call API v1</button>
        <button onClick={this.callAPIv2}>Call API v2</button>
        <p></p>
        <div className="data">Requested: <b>{this.state.data.requestedVersion}</b></div>
        <div className="data">Response: <b>{this.state.data.version}</b></div>
      </div>
    );
  }
}

export default App;
