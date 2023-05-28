import React, { useState, useEffect, useCallback } from 'react';
import {
  PROFILE_BASE_URL,
  VENUES_BASE_URL,
  BOOKINGS_BASE_URL,
} from '../../api/api';
import defaultVenueImg from '../../assets/defaultVenueImg.jpg';
import getRatingStars from '../../utils/ratingStars';
import { mapTime } from '../../utils/mapTime';
import { formateDate } from '../../utils/dateFormatting';
import { deleteData } from '../../utils/deleteData';
import AttentionMessage from '../shared/AttentionMessage';
import ErrorMessage from '../shared/ErrorMessage';
import { FiCheckSquare } from 'react-icons/fi';
import { TbSquare } from 'react-icons/tb';
import LoaderCircle from '../shared/Loader';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from '../../utils/ScrollToTop';

// React functional component that renders user's venues or bookings according to the tab that is active
export default function UserProfileVenues() {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('user');

  const location = useLocation();
  const serchParams = new URLSearchParams(location.search);
  const tabParam = serchParams.get('tab') || 'venues';

  // useState hooks - declaring state variables and initial values
  const [userProfileVenues, setUserProfileVenues] = useState([]);
  const [userProfileBookings, setUserProfileBookings] = useState([]);
  const [activeTab, setActiveTab] = useState(tabParam);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({});

  // useHistory hook
  const navigate = useNavigate(); // get navigate function

  // useCallback hooks - declaring two functions (fetchUserProfileVenues and fetchProfileBookings). Functions are memoized and passed to useEffect hook to prevent unnecessary re-renders
  // functions fetchUserProfileVenues and fetchProfileBookings are used to fetch user's venues or bookings from different APIs
  const fetchUserProfileVenues = useCallback(async () => {
    try {
      setIsLoading(true); // set isLoading state to true before the fetch request
      const response = await fetch(
        `${PROFILE_BASE_URL}${userName}/venues?_owner=true&_bookings=true`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const responseErrorJSON = await response.json();
        const responseErrorMessage = responseErrorJSON.errors[0].message;
        console.log(
          '!response.ok, venues block responseErrorMessage:',
          responseErrorJSON
        );
        console.log(
          '!response.ok, venues block status code: ',
          responseErrorJSON.statusCode
        );
        setErrorMessage(responseErrorMessage);
        throw new Error(responseErrorMessage); // throw new Error() will trigger the catch block and handle the error
      } else {
        setErrorMessage(null);
        const json = await response.json();
        setUserProfileVenues(json);
        console.log('fetchUserProfileVenues', json);
      }

      // const json = await response.json();
      // console.log('fetchUserProfileVenues', json);
      // setUserProfileVenues(json);
    } catch (error) {
      console.error('Error message fetchUserProfileVenues (catch): ', error);
    } finally {
      setIsLoading(false); // set isLoading state to false after the fetch request is finished
    }
  }, [userName, token]);

  // We get bookings from fetchProfileBookings function and then we fetch booking details (fetchBookingDetails) for each booking
  const fetchBookingDetails = useCallback(
    async (bookings) => {
      try {
        setIsLoading(true); // set isLoading state to true before the fetch request
        const bookingIds = bookings.map((booking) => booking.id);
        const fetchPromises = bookingIds.map((id) =>
          fetch(`${BOOKINGS_BASE_URL}${id}?_customer=true&_venue=true`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((bookingDetail) => {
              console.log('Booking Details: ', bookingDetail);
              setBookingDetails((prevDetails) => ({
                ...prevDetails,
                [id]: bookingDetail,
              }));
            })
        );
        await Promise.all(fetchPromises);
      } catch (error) {
        console.error('Error message fetchBookingDetails (catch): ', error);
      } finally {
        setIsLoading(false); // set isLoading state to false after the fetch request is finished
      }
    },
    [setBookingDetails, token]
  );

  // useCallback hooks - declaring two functions (fetchUserProfileVenues and fetchProfileBookings). Functions are memoized and passed to useEffect hook to prevent unnecessary re-renders
  // functions fetchUserProfileVenues and fetchProfileBookings are used to fetch user's venues or bookings from different APIs
  const fetchProfileBookings = useCallback(async () => {
    try {
      setIsLoading(true); // set isLoading state to true before the fetch request
      const response = await fetch(`${PROFILE_BASE_URL}${userName}/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const responseErrorJSON = await response.json();
        const responseErrorMessage = responseErrorJSON.errors[0].message;
        console.log(
          '!response.ok, venues block responseErrorMessage:',
          responseErrorJSON
        );
        console.log(
          '!response.ok, venues block status code: ',
          responseErrorJSON.statusCode
        );
        setErrorMessage(responseErrorMessage);
        throw new Error(responseErrorMessage); // throw new Error() will trigger the catch block and handle the error
      } else {
        setErrorMessage(null);
        const bookings = await response.json(); // JSON data will be used in fetchBookingDetails function
        setUserProfileBookings(bookings);
        console.log('fetchProfileBookings', bookings);
        fetchBookingDetails(bookings);
      }
    } catch (error) {
      console.error('Error message fetchProfileBookings (catch): ', error);
    } finally {
      setIsLoading(false); // set isLoading state to false after the fetch request is finished
    }
  }, [userName, token, fetchBookingDetails]);

  // function handleTabClick is called when tab button is clicked
  // function handleTabClick sets activeTab state and calls weather function fetchUserProfileVenues weather fetchProfileBookings
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'venues') {
      fetchUserProfileVenues();
    } else if (tab === 'bookings') {
      fetchProfileBookings();
    }
    navigate(`/user-venues?tab=${tab}`); // update url with new tab parameter
  };

  // handleTabClick with ternary operator
  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  //   const fetchFunction = tab === 'venues' ? fetchUserProfileVenues : fetchProfileBookings;
  //   fetchFunction();
  // };

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

  if (isLoading) {
    return <LoaderCircle />;
  }

  // Error message
  // if (error) {
  //   return <ErrorMessage errorText={error} />;
  // }

  return (
    <>
      <ScrollToTop />
      <div className="wrapper-max-width wrapper-padding-x bg-gray-300">
        {/* TABS */}
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
        {/* ATTENTION MESSAGE IF NEEDED */}
        {!token && (
          <AttentionMessage
            heading="Atention!"
            text="You need to log in to be able to manage your venues and bookings"
          />
        )}

        {/* API ERROR MESSAGE */}
        {errorMessage && <ErrorMessage errorText={errorMessage} />}
      </div>
      <div className="wrapper-max-width wrapper-padding-x">
        {activeTab === 'venues' && userProfileVenues.length > 0 ? (
          <ul className="mx-auto my-20 grid max-w-[1000px] grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:mx-0 lg:grid-cols-2">
            {userProfileVenues.map(
              ({
                id,
                media,
                name,
                price,
                rating,
                description,
                location,
                maxGuests,
                created,
                bookings,
              }) => (
                <li key={id}>
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
                  <div className="mt-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      {name}
                    </h2>
                    <span className="text-lg font-medium leading-6 text-blue-800">
                      {price} NOK
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    {getRatingStars(rating)}
                  </p>
                  <p className="my-4 text-sm leading-6 text-gray-500">
                    {description}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    City: {location.city}
                  </p>
                  {location.country && (
                    <p className="mt-1 text-sm leading-6 text-gray-900">
                      Country: {location.country}
                    </p>
                  )}
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    Max guests: {maxGuests}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-900">
                    Posted: {mapTime(created)} ago
                  </p>
                  {/* Booking history */}
                  <div className="my-8 border-t border-gray-200 pt-8">
                    <p className="text-sm font-medium text-gray-900">
                      Booking history
                    </p>

                    <div className="text-sm text-gray-700 mt-4">
                      Total number: {bookings.length}
                    </div>
                    <div className="text-sm text-gray-700 mt-2">
                      <div className="space-y-6">
                        {bookings.map((booking) => (
                          <div className="relative flex gap-x-4">
                            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                              <div className="w-px bg-gray-200"></div>
                            </div>
                            <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                              <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                            </div>
                            <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                              <span className="font-medium text-gray-900">
                                User:{' '}
                              </span>
                              <span>
                                {formateDate(booking.dateFrom)} {'-'}{' '}
                                {formateDate(booking.dateTo)}
                              </span>
                              <span> ( </span>
                              {booking.guests} guests<span> ) </span>
                            </p>
                            <span className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                              {mapTime(booking.created)} ago
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-6">
                    <Link
                      to={`/user-venues/update-venue/${id}`}
                      className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px] mx-auto"
                    >
                      Update
                    </Link>
                    <button
                      className="rounded-md bg-red-600 px-3 py-3 mt-4 md:mt-0 lg:mt-0 text-sm font-semibold text-white shadow-sm hover:bg-red-700 ring-1 ring-inset ring-red-600 hover:ring-gray-200 w-[180px] mx-auto"
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
                </li>
              )
            )}
          </ul>
        ) : (
          <AttentionMessage
            heading="Attention!"
            text="You don't have any venues yet. Go to Create Venue page to add your first venue."
          />
        )}

        {activeTab === 'bookings' && (
          <div>
            {/* ATTENTION MESSAGE IF NEEDED */}
            {userProfileBookings.length === 0 && (
              <AttentionMessage
                heading="Ups!"
                text="You don't have any bookings yet"
              />
            )}

            <ul className="mx-auto my-20 grid max-w-[1000px] grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:mx-0 lg:grid-cols-2">
              {Object.values(bookingDetails).map((bookingDetail) => (
                <li key={bookingDetail.id}>
                  <div>
                    {bookingDetail.venue.media &&
                    bookingDetail.venue.media.length > 0 ? (
                      <img
                        className="aspect-[3/2] w-full rounded-2xl object-cover"
                        src={bookingDetail.venue.media[0]}
                        alt={bookingDetail.venue.name}
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
                    <h2 className="my-4 pl-4 font-medium text-lg leading-6 text-gray-900">
                      {bookingDetail.venue.name}
                    </h2>
                    <div className="bg-blue-200 p-4 rounded-md mb-4">
                      <p className="mt-1 text-sm leading-6 text-blue-800">
                        Booked: {formateDate(bookingDetail.dateFrom)} -{' '}
                        {formateDate(bookingDetail.dateTo)}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-blue-800">
                        Guests expected: {bookingDetail.guests}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-blue-800">
                        City: {bookingDetail.venue.location.city}, Country:{' '}
                        {bookingDetail.venue.location.country}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-blue-800">
                        Price:{' '}
                        <span className="mt-1 text-lg">
                          {bookingDetail.venue.price} NOK
                        </span>
                      </p>
                    </div>
                    <div className="mt-1 pl-4 text-sm leading-6 text-gray-500">
                      About venue: {bookingDetail.venue.description}
                    </div>
                    <div className="mt-4">
                      <p className="mt-1 pl-4 flex items-center text-sm leading-6 text-gray-900">
                        Wifi:
                        {bookingDetail.venue.meta.wifi ? (
                          <span className="pl-2">
                            <FiCheckSquare />
                          </span>
                        ) : (
                          <span className="pl-2">
                            <TbSquare />
                          </span>
                        )}
                      </p>
                      <p className="mt-1 pl-4 flex items-center text-sm leading-6 text-gray-900">
                        Parking:
                        {bookingDetail.venue.meta.parking ? (
                          <span className="pl-2">
                            <FiCheckSquare />
                          </span>
                        ) : (
                          <span className="pl-2">
                            <TbSquare />
                          </span>
                        )}
                      </p>
                      <p className="mt-1 pl-4 flex items-center text-sm leading-6 text-gray-900">
                        Breakfast:
                        {bookingDetail.venue.meta.breakfast ? (
                          <span className="pl-2">
                            <FiCheckSquare />
                          </span>
                        ) : (
                          <span className="pl-2">
                            <TbSquare />
                          </span>
                        )}
                      </p>
                      <p className="mt-1 pl-4 flex items-center text-sm leading-6 text-gray-900">
                        Pets:
                        {bookingDetail.venue.meta.pets ? (
                          <span className="pl-2">
                            <FiCheckSquare />
                          </span>
                        ) : (
                          <span className="pl-2">
                            <TbSquare />
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
