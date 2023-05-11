import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from 'react-svg-spinner';

const Home = lazy(() => import('../components/pages/Home'));
const LogIn = lazy(() => import('../components/pages/LogIn'));
const NotFound = lazy(() => import('../components/pages/NotFound'));
const Venues = lazy(() => import('../components/pages/Venues'));
const Venue = lazy(() => import('../components/pages/Venue'));
const Profile = lazy(() => import('../components/pages/Profile'));
const SignUp = lazy(() => import('../components/pages/SignUp'));
const UserVenues = lazy(() => import('../components/pages/UserVenues'));
const CreateVenue = lazy(() => import('../components/pages/CreateVenue'));

function SpinnerFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* https://chantastic.github.io/react-svg-spinner */}
      <Spinner size="80px" color="green" thickness={3} gap={5} speed="slow" />
    </div>
  );
}

function Router() {
  return (
    <>
      <Suspense fallback={<SpinnerFallback />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<Venue />} />
          <Route path="/user-venues" element={<UserVenues />} />
          <Route path="/create-venue" element={<CreateVenue />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default Router;
