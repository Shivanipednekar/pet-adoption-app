import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NewUser from './components/NewUser';
import ExistingUser from './components/ExistingUser';
import AdoptionList from './components/AdoptionList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<NewUser />} />
        <Route path="/login" element={<ExistingUser />} />
      <Route path="/adoption-list" element={<AdoptionList />} />
      </Routes>
    </Router>
  );
}

export default App;
