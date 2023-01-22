import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import Homepage from './Homepage';
import MainPage from './MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route exact path="/MainPage" element={<MainPage />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

