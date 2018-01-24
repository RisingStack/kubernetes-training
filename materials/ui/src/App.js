import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
    this.callAPI = this.callAPI.bind(this)
  }

  callAPI() {
    fetch('http://localhost:3000/api/')
      .then((result) => this.setState({data: result.statusText}))
      .catch((err) => this.setState({data: 'Fetching error'}))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.callAPI}>Call API</button>
        <div className="data">{this.state.data}</div>
      </div>
    );
  }
}

export default App;
