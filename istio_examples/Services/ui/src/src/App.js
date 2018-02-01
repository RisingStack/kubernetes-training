import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      error: false
    }
    this.callAPIv1 = this.callAPI.bind(this, {'version': 'v1'})
    this.callAPIv2 = this.callAPI.bind(this, {'version': 'v2'})
  }

  callAPI(header) {
    fetch('api', {
      method: 'get',
      headers: header
    })
      .then((response) => {
        response.json().then(json => {
          console.log(json)
          this.setState({error: false, data: json})
        })
      })
      .catch((err) => this.setState({error: true, data: err.toString()}))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.callAPIv1}>Call API v1</button>
        <button onClick={this.callAPIv2}>Call API v2</button>
        <p></p>
        {!this.state.error 
          ? [<div key='req'>Requested: <b>{this.state.data.requestedVersion}</b></div>,
            <div key='res'>Response: <b>{this.state.data.version}</b></div>]
          : <div className="error">Error: <b>{this.state.data}</b></div> }
      </div>
    )
  }
}

export default App
