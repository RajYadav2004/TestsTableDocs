import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TestsDocs from './components/screens/TestsDocs';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<TestsDocs/>} />
      <Route path='/:id' element={<TestsDocs/>} />
      <Route path='/Admin' element={<Admin/>} />
    </Routes>
    {/* <TestsDocs/> */}

    </>
  );
}

export default App;
