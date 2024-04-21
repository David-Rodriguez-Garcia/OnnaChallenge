import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './ui/Home';
import { AccessControl } from './ui/AccessControl';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-users/*" element={<AccessControl />} />
      </Routes>
    </Router>
  );
};

export default App;
