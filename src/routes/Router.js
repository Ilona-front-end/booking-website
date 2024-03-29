import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/pages/Home';
import LogIn from '../components/pages/LogIn';
import NotFound from '../components/pages/NotFound';
import Venues from '../components/pages/Venues';
import Venue from '../components/pages/Venue';
import Profile from '../components/pages/Profile';
import SignUp from '../components/pages/SignUp';
import UserVenues from '../components/pages/UserVenues';
import CreateVenue from '../components/pages/CreateVenue';
import BookSingleVenue from '../components/pages/BookSingleVenue';
import UpdateVenue from '../components/pages/UpdateVenue';

function Router() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:id" element={<Venue />} />
        <Route path="/venues/book-venue/:id" element={<BookSingleVenue />} />
        <Route path="/user-venues" element={<UserVenues />} />
        <Route path="/user-venues/update-venue/:id" element={<UpdateVenue />} />
        <Route path="/create-venue" element={<CreateVenue />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
