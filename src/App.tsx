import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './ui/Home';
import { AccessControl } from './ui/AccessControl';
import { LockList } from './ui/LockList';
import { LockProvider } from './ui/_context/LockContext';

const App: React.FC = () => {
  return (
    <LockProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LockList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-users/*" element={<AccessControl />} />
        </Routes>
      </Router>
    </LockProvider>
  );
};

export default App;
