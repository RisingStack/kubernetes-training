import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
    this.callAPIv1 = this.callAPI.bind(this, {'version': 'v1'})
    this.callAPIv2 = this.callAPI.bind(this, {'version': 'v2'})
  }

  callAPI(header) {
    fetch(`http://192.168.99.100:30010/api`, { 
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
        <button onClick={this.callAPIv1}>Call API</button>
        <button onClick={this.callAPIv2}>Call API with v2 header</button>
        <div className="data">{this.state.data}</div>
      </div>
    );
  }
}

export default App;
