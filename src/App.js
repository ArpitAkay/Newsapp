import React, { Component } from 'react'
import NavBar from './component/NavBar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

class App extends Component {

  state = {
    progress: 10
  }

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <>
        <Router>
          <LoadingBar color='#f11946' progress={this.state.progress} />
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="current affairs" topic="current affairs" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" topic="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" topic="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" topic="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" topic="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" topic="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" topic="sports" />} />
            <Route exact path="/cricket" element={<News setProgress={this.setProgress} key="cricket" topic="cricket" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" topic="technology" />} />
          </Routes>
        </Router>
      </>
    )
  }
}

export default App;