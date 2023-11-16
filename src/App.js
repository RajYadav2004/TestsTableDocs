import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TestsDocs from './components/screens/TestsDocs';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<TestsDocs/>} />
    </Routes>
    </>
  );
}

export default App;
