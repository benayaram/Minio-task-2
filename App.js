import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MediaUpload from './components/MediaUpload';
import MediaView from './components/MediaView';
import SearchFilter from './components/SearchFilter';

function App() {
  return (
    <Router>
      <div>
        <h1>Media Library App</h1>
        <Route>
          <Route exact path="/upload" component={MediaUpload} />
          <Route exact path="/view/:mediaType/:mediaId" component={MediaView} />
          <Route exact path="/search" component={SearchFilter} />
        </Route>
      </div>
    </Router>
  );
}

export default App;