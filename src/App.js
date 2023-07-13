import React, { useState } from 'react'
import NavBar from './component/NavBar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <LoadingBar color='#f11946' progress={progress} />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="current affairs" topic="current affairs" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" topic="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" topic="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" topic="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" topic="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" topic="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" topic="sports" />} />
          <Route exact path="/cricket" element={<News setProgress={setProgress} key="cricket" topic="cricket" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" topic="technology" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;