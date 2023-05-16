import React, { useState, useEffect, useCallback } from 'react';
import { PROFILE_BASE_URL } from '../../api/api';
import defaultVenueImg from '../../assets/default-venue-img.jpg';
import getRatingStars from '../../utils/ratingStars';
import { mapTime } from '../../utils/mapTime';
import { formateDate } from '../../utils/dateFormatting';
import { deleteData } from '../../utils/deleteData';
import { VENUES_BASE_URL } from '../../api/api';
import AttentionMessage from '../shared/AttentionMessage';

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
        throw new Error('Failed to get information about venues from the API'); // throw new Error() will trigger the catch block and handle the error
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
        throw new Error('Failed to get information about venues from the API'); // throw new Error() will trigger the catch block and handle the error
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
        {/* ERROR MESSAGE IF NEEDED */}
        {!token && (
          <AttentionMessage
            heading="Atention!"
            text="You need to log in to be able to manage your venues and bookings"
          />
        )}
      </div>
      <div className="wrapper-max-width wrapper-padding-x">
        {activeTab === 'venues' && (
          <div className="mx-auto my-20 grid max-w-[1000px] grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:mx-0 lg:grid-cols-2">
            {userProfileVenues.map(
              ({
                id,
                media,
                name,
                rating,
                description,
                location,
                maxGuests,
                created,
              }) => (
                <div key={id}>
                  {media && media.length > 0 ? (
                    <img
                      className="aspect-[3/2] w-full rounded-2xl object-cover"
                      src={media[0]}
                      alt={name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultVenueImg;
                      }}
                    />
                  ) : (
                    <img
                      className="aspect-[3/2] w-full rounded-2xl object-cover"
                      src={defaultVenueImg}
                      alt="Default"
                    />
                  )}
                  <h2 className="mt-2 text-base leading-6 text-gray-900">
                    {name}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    {getRatingStars(rating)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {description}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    City: {location.city}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    Max guests: {maxGuests}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    Posted: {mapTime(created)} ago
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-6">
                    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px] mx-auto">
                      Update
                    </button>
                    <button
                      className="rounded-md bg-red-600 px-3 py-2 mt-4 md:mt-0 lg:mt-0 text-sm font-semibold text-white shadow-sm hover:bg-red-700 ring-1 ring-inset ring-red-600 hover:ring-gray-200 w-[180px] mx-auto"
                      onClick={() =>
                        deleteData(
                          VENUES_BASE_URL,
                          id,
                          token,
                          setUserProfileVenues
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="mx-auto my-20 grid max-w-[1000px] grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:mx-0 lg:grid-cols-2">
            {userProfileBookings.map(
              ({ id, dateFrom, dateTo, guests, created }) => (
                <div key={id}>
                  <h2 className="mt-2 text-base leading-6 text-gray-900">
                    Venue id: {id}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    From: {formateDate(dateFrom)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    Until: {formateDate(dateTo)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    Guests: {guests}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    Booked {mapTime(created)} ago
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
