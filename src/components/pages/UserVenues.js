import React, { useState, useEffect, useCallback } from 'react';
import { PROFILE_BASE_URL } from '../../api/api';

// React functional component that renders user's venues or bookings according to the tab that is active
export default function UserProfileVenues() {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('user');

  // useState hooks - declaring state variables and initial values
  const [userProfileVenues, setUserProfileVenues] = useState([]);
  const [userProfileBookings, setUserProfileBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('venues');

  // useCallback hooks - declaring two functions (fetchUserProfileVenues and fetchProfileBookings). Functions are memoized and passed to useEffect hook to prevent unnecessary re-renders
  // functions fetchUserProfileVenues and fetchProfileBookings are used to fetch user's venues or bookings from different APIs
  const fetchUserProfileVenues = useCallback(async () => {
    try {
      const response = await fetch(`${PROFILE_BASE_URL}${userName}/venues`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get information about venues from the API');
      }

      const json = await response.json();
      console.log('fetchUserProfileVenues', json);
      setUserProfileVenues(json);
    } catch (error) {
      console.error('Error message here: ', error);
    }
  }, [userName, token]);

  // useCallback hook - described above (line 14)
  const fetchProfileBookings = useCallback(async () => {
    try {
      const response = await fetch(`${PROFILE_BASE_URL}${userName}/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get information about venues from the API');
      }

      const json = await response.json();
      console.log('UserProfileBookings', json);
      setUserProfileBookings(json);
    } catch (error) {
      console.error('Error message here: ', error);
    }
  }, [userName, token]);

  // function handleTabClick is called when tab button is clicked
  // function handleTabClick sets activeTab state and calls weather function fetchUserProfileVenues weather fetchProfileBookings
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'venues') {
      fetchUserProfileVenues();
    } else if (tab === 'bookings') {
      fetchProfileBookings();
    }
  };

  // useEffect hook - it will run when the component first mounts and when activeTab state changes
  // activeTab state is set to "venues" by default
  // function fetchUserProfileVenues is called when activeTab state is set to "venues"
  // function fetchProfileBookings is called when activeTab state is set to "bookings"
  useEffect(() => {
    if (activeTab === 'venues') {
      fetchUserProfileVenues();
    } else if (activeTab === 'bookings') {
      fetchProfileBookings();
    }
  }, [activeTab, fetchUserProfileVenues, fetchProfileBookings]);

  return (
    <>
      <div className="wrapper-max-width wrapper-padding-x bg-gray-300">
        <button
          className={`font-serif text-gray-600 hover:text-gray-800 shadow-sm hover:ring-1 hover:ring-inset hover:ring-gray-300 rounded-md px-3 py-2 m-4 text-sm font-medium ${
            activeTab === 'venues' ? 'bg-white' : 'bg-gray-200'
          }`}
          onClick={() => handleTabClick('venues')}
        >
          My Venues
        </button>
        <button
          className={`font-serif text-gray-600 hover:text-gray-800 shadow-sm hover:ring-1 hover:ring-inset hover:ring-gray-300 rounded-md px-3 py-2 m-4 text-sm font-medium ${
            activeTab === 'bookings' ? 'bg-white' : 'bg-gray-200'
          }`}
          onClick={() => handleTabClick('bookings')}
        >
          My Bookings
        </button>
      </div>
      <div className="wrapper-max-width wrapper-padding-x">
        {activeTab === 'venues' && (
          <div className="wrapper-max-width wrapper-padding-x">
            <div className="grid grid-cols-2 gap-4">
              {userProfileVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-white shadow overflow-hidden sm:rounded-lg"
                >
                  <p>{venue.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="wrapper-max-width wrapper-padding-x">
            <div className="grid grid-cols-2 gap-4">
              {userProfileBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white shadow overflow-hidden sm:rounded-lg"
                >
                  <p>{booking.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
