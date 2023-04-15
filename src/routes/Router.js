import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/pages/Home';
import LogIn from '../components/pages/LogIn';
import NotFound from '../components/pages/NotFound';
import Venues from '../components/pages/Venues';
import Venue from '../components/pages/Venue';

function Router() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/venues' element={<Venues />} />
        <Route path='/venue/:id' element={<Venue />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Router;