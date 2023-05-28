import React, { useEffect, useState } from 'react';
import { VENUES_BASE_URL } from '../../api/api';
import getRatingStars from '../../utils/ratingStars';
import { mapTime } from '../../utils/mapTime';
import { Link } from 'react-router-dom';
import defaultVenueImg from '../../assets/defaultVenueImg.jpg';
import ErrorMessage from '../shared/ErrorMessage';
import { FaUserCircle } from 'react-icons/fa';
import LoaderCircle from '../shared/Loader';
import ScrollToTop from '../../utils/ScrollToTop';
import { CiLocationOn } from 'react-icons/ci';

function Venues() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedVenuesCount, setDisplayedVenuesCount] = useState(20);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  async function fetchVenues() {
    try {
      setIsLoading(true); // set isLoading state to true before the fetch request
      const response = await fetch(
        `${VENUES_BASE_URL}?sort=created&_owner=true&_bookings=true`
      ); // Fetch API data and show newest venues first
      if (!response.ok) {
        throw new Error('Failed to get information about venues from the API'); // throw new Error() will trigger the catch block and handle the error
      }
      const json = await response.json(); // Wait for the response to be converted to JSON
      setVenues(json); // We received API data, setting our venues state
      setError(null);
    } catch (error) {
      setError(error.message); // We received an error, setting our error state
    } finally {
      setIsLoading(false); // set isLoading state to false after the fetch request is finished
    }
  }

  // The useEffect will run once when the component first mounts
  useEffect(() => {
    fetchVenues();
  }, []);

  // The useEffect will run when the displayedVenuesCount state changes and will check if the button should be shown or not
  useEffect(() => {
    if (displayedVenuesCount >= 40) {
      setShowScrollToTopButton(true);
    } else {
      setShowScrollToTopButton(false);
    }
  }, [displayedVenuesCount]);

  // Function used to get more venues when clicking the button
  function getMoreVenues() {
    setDisplayedVenuesCount(displayedVenuesCount + 20);
  }

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // This code unfortunately prevents from showing the error message when there is an error with the API
  // if (venues.length === 0) {
  //   return <div className='wrapper-max-width wrapper-padding-x py-4'>No venues available</div>;
  // }

  if (isLoading) {
    return <LoaderCircle />;
  }

  // Error message
  if (error) {
    return <ErrorMessage errorText={error} />;
  }

  return (
    <>
      <ScrollToTop />
      <div className="wrapper-max-width wrapper-padding-x">
        <h2 className="py-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-4xl">
          All Venues
        </h2>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {venues
            .slice(0, displayedVenuesCount)
            .map(
              ({
                id,
                name,
                media,
                price,
                location,
                rating,
                maxGuests,
                created,
                owner,
                bookings,
              }) => (
                <li key={id}>
                  <Link to={`/venues/${id}`}>
                    <div>
                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-lg bg-gray-200">
                        {media && media.length > 0 ? (
                          <img
                            className="object-cover w-full h-full"
                            src={media[0]}
                            alt={name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultVenueImg;
                            }}
                          />
                        ) : (
                          <img
                            className="object-cover w-full h-full"
                            src={defaultVenueImg}
                            alt="Default"
                          />
                        )}
                      </div>
                      {/* <img src={venue.media[0]} alt={venue.name} onError={(e) => { console.log(`Error loading image: ${venue.media}`, e); }} /> */}
                      <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                        <h2 className="text-base font-medium line-clamp-1 text-gray-900">
                          {[
                            'tes',
                            'test',
                            'string',
                            'adassd',
                            'sddsa',
                            'saas',
                            'sdasd',
                            'dsf',
                            '2323',
                            'update',
                            'hohoho',
                            'haha',
                            'car',
                          ].some((word) => name.toLowerCase().includes(word))
                            ? 'Accommodation'
                            : name}
                        </h2>
                        <p className="text-base font-medium text-blue-800">
                          {price}
                          <span> NOK</span>
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="pr-1">
                          <CiLocationOn />
                        </span>

                        {location.city !== 'Unknown' &&
                          location.city !== 'unknown' &&
                          location.city !== 'string' &&
                          location.city !== '' &&
                          location.city !== 'test' && (
                            <span className="text-sm text-gray-700">
                              {location.city}
                            </span>
                          )}
                        {location.city !== 'Unknown' &&
                          location.city !== 'unknown' &&
                          location.city !== 'string' &&
                          location.city !== '' &&
                          location.city !== 'test' &&
                          location.country !== 'Unknown' &&
                          location.country !== 'unknown' &&
                          location.country !== 'string' &&
                          location.country !== '' &&
                          location.country !== 'test' && <span>, </span>}
                        {location.country !== 'Unknown' &&
                          location.country !== 'unknown' &&
                          location.country !== 'string' &&
                          location.country !== '' &&
                          location.country !== 'test' && (
                            <span className="text-sm text-gray-700 pl-1">
                              {location.country}
                            </span>
                          )}
                      </div>
                      <div>{getRatingStars(rating)}</div>
                      <div className="text-sm text-gray-700">
                        Max guests: {maxGuests}
                      </div>
                      <div className="text-sm text-gray-700">
                        Posted: {mapTime(created)} ago
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 mt-4 flex items-center">
                      Owner: {owner.name}
                      <span>
                        {owner.avatar ? (
                          <img
                            className="rounded-full w-6 h-6 ml-3"
                            src={owner.avatar}
                            alt={owner.name}
                          />
                        ) : (
                          <FaUserCircle className="w-6 h-6 ml-3" />
                        )}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">
                      {bookings.length === 0
                        ? null
                        : `Booked ${bookings.length} times`}
                    </div>
                  </Link>
                </li>
              )
            )}
        </ul>
        {displayedVenuesCount < venues.length && (
          <div className="flex justify-center mt-8">
            <button
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-100 mb-8"
              onClick={getMoreVenues}
            >
              Load more
            </button>
          </div>
        )}
        {showScrollToTopButton ? (
          <div className="flex justify-center mt-8">
            <button
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-100 mb-8"
              onClick={handleScrollToTop}
            >
              Scroll to top
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Venues;
