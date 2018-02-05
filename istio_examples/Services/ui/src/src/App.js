import React, { Component } from 'react'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      data: {},
      error: false
    }
    this.callAPIv1 = this.callAPI.bind(this, 'api', {'version': 'v1'})
    this.callAPIv2 = this.callAPI.bind(this, 'api', {'version': 'v2'})
    this.callAPIgit = this.callAPI.bind(this, '/api/git/repo', {'version': 'v1'})
    this.callAPIgitv1 = this.callAPI.bind(this, '/api/git', {'version': 'v1'})
    this.callAPIgitv2 = this.callAPI.bind(this, '/api/git', {'version': 'v2'})
  }

  callAPI(endpoint, headers) {
    fetch(endpoint, {
      method: 'get',
      headers
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json)
            this.setState({error: false, data: json})
          })
        } else {
          throw new Error('Network response was not ok.')
        }
      })
      .catch((err) => this.setState({error: true, data: err.toString()}))
  }

  render() {
    const { data } = this.state

    return (
      <div className="App">
        <button onClick={this.callAPIv1}>Call /api (v1)</button>
        <button onClick={this.callAPIv2}>Call /api (v2)</button>
        <button onClick={this.callAPIgitv1}>Call /api/git (v1)</button>
        <button onClick={this.callAPIgitv2}>Call /api/git (v2)</button>
        <button onClick={this.callAPIgit}>Call /api/git/repo (v1)</button>
        <p></p>
        {!this.state.error 
          ? _.map(data, (value, key) => {return(<div key={key}>{key}: <b>{value.toString()}</b></div>)})
          : <div className="error">Error: <b>{this.state.data}</b></div>
        }
      </div>
    )
  }
}

export default App
