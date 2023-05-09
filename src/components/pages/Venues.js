import React, { useEffect, useState } from 'react';
import { FaRegMeh } from 'react-icons/fa';
import { VENUES_BASE_URL } from '../../api/api';
import getRatingStars from '../../utils/ratingStars';
import { mapTime } from '../../utils/mapTime';
import { Link } from 'react-router-dom';

function Venues() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [displayedVenuesCount, setDisplayedVenuesCount] = useState(20);

  async function fetchVenues() {
    try {
      const response = await fetch(`${VENUES_BASE_URL}`); // Fetch API data
      if (!response.ok) {
        throw new Error('Failed to get information about venues from the API');
      }
      const json = await response.json(); // Wait for the response to be converted to JSON
      setVenues(json); // We received API data, setting our venues state
      setError(null);
    } catch (error) {
      setError(error.message); // We received an error, setting our error state
      console.error('Error message here: ', error);
    }
  }

  // The useEffect will run:
  // once when the component first mounts
  useEffect(() => {
    fetchVenues();
  }, []);

  function getMoreVenues() {
    setDisplayedVenuesCount(displayedVenuesCount + 20);
  }

  if (venues.length === 0) {
    return <div>No venues available</div>;
  }

  // ERROR HANDLING
  if (error) {
    return (
      <>
        <div className="rounded-md bg-red-50 py-6 wrapper-max-width wrapper-padding-x">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaRegMeh size={20} color="red" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Caution! Something went wrong:
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <div className="list-disc space-y-1 pl-5">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="wrapper-max-width wrapper-padding-x">
      <h2 className="py-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-4xl">
        All Venues
      </h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {venues
          .slice(0, displayedVenuesCount)
          .map(
            (
              { id, name, media, price, location, rating, maxGuests, created },
              index
            ) => (
              <Link to={`/venues/${id}`} key={index}>
                <div>
                  {/* <h2>{venue.name}</h2> */}
                  {/* {venue.media.length > 0 && <img src={venue.media[0]} alt={venue.name} />} */}
                  {/* <img src={venue.media[0]} alt={venue.name} /> */}
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-lg bg-gray-200">
                    <img
                      className="object-cover w-full h-full"
                      src={media[0]}
                      alt={name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1634655377962-e6e7b446e7e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80';
                      }}
                    />
                  </div>
                  {/* <img src={venue.media[0]} alt={venue.name} onError={(e) => { console.log(`Error loading image: ${venue.media}`, e); }} /> */}
                  <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                    <h2 className="text-base font-medium text-gray-900">
                      {[
                        'test',
                        'tes',
                        'Testing',
                        'tester',
                        'some test house',
                        'string',
                        'Test post',
                        'testingtesting',
                      ].includes(name)
                        ? 'Accommodation'
                        : name}
                    </h2>
                    <p className="text-base font-medium text-blue-800">
                      {price}
                      <span> NOK</span>
                    </p>
                  </div>
                  <div>
                    {location.city !== 'Unknown' &&
                      location.city !== 'string' &&
                      location.city !== '' &&
                      location.city !== 'test' && (
                        <span className="text-sm text-gray-700">
                          {location.city}
                        </span>
                      )}
                    {location.city !== 'Unknown' &&
                      location.city !== 'string' &&
                      location.city !== '' &&
                      location.city !== 'test' &&
                      location.country !== 'Unknown' &&
                      location.country !== 'string' &&
                      location.country !== '' &&
                      location.country !== 'test' && <span>, </span>}
                    {location.country !== 'Unknown' &&
                      location.country !== 'string' &&
                      location.country !== '' &&
                      location.country !== 'test' && (
                        <span className="text-sm text-gray-700">
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
                  <div>{index}</div>
                </div>
              </Link>
            )
          )}
      </div>
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
    </div>
  );
}

export default Venues;
