import React, { Component } from 'react';
import './App.css';
// import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
      .then(data => {
        this.setState({urls: data.urls})
      })
      .catch(() => this.setState({error: "Hmmm, we're having trouble loading your data. Please try again later."}))
  }

  getNewUrl= (newPost) => {
    let response= fetch("http://localhost:3001/api/v1/urls", {
      method: 'POST',
      body: JSON.stringify({
        "long_url": newPost.urlToShorten,
        "title": newPost.title,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {return res.json()})
    .then(data => {
      this.setState({
        urls: [...this.state.urls, data]
      })
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1 data-cy="title">URL Shortener</h1>
          <UrlForm getNewUrl={this.getNewUrl}/>
        </header>
      <div> {this.state.error && <h1>{this.state.error}</h1>} </div>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
