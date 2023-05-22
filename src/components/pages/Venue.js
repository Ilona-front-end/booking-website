import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VENUES_BASE_URL } from '../../api/api';
import ErrorMessage from '../shared/ErrorMessage';
import RenderStars from '../../utils/renderStars';
import { FiCheckSquare } from 'react-icons/fi';
import { TbSquare } from 'react-icons/tb';
import { FaUserCircle } from 'react-icons/fa';
import { mapTime } from '../../utils/mapTime';
import { formateDate } from '../../utils/dateFormatting';
import LoaderCircle from '../shared/Loader';

export default function Venue() {
  // useParams() hook from React Router library allows to get the id from the URL, route is configured as '/venues/:id' that allows to retrieve the id from the URL
  const { id } = useParams();

  const [venue, setVenue] = useState({});
  const [isLoading, setIsLoading] = useState(true); // We will use this state to show a loading indicator
  const [error, setError] = useState(null);

  async function fetchVenue() {
    try {
      setIsLoading(true); // set isLoading state to true before the fetch request
      const response = await fetch(
        `${VENUES_BASE_URL}/${id}?_owner=true&_bookings=true`
      );
      if (!response.ok) {
        throw new Error(
          'Failed to get information about the venue from the API'
        );
      }
      const venueResponse = await response.json();
      setVenue(venueResponse);
      console.log('Venue information is fetched venueResponse', venueResponse);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('Error message here: ', error);
      console.error('Error here: ', error.message); // "error.message":"Invalid uuid" not helpful for user
    } finally {
      setIsLoading(false); // We are done with the request, no matter if we got an error or not
    }
  }

  // The useEffect will run once when the component first mounts
  useEffect(() => {
    fetchVenue();
  }, []);

  if (isLoading) {
    return <LoaderCircle />;
  }

  // Error message
  if (error) {
    return <ErrorMessage errorText={error} />;
  }

  console.log('Venue information is fetched venue', venue);
  const {
    name,
    price,
    rating,
    media,
    location,
    description,
    meta,
    owner,
    bookings,
  } = venue;

  return (
    <div className="wrapper-max-width wrapper-padding-x">
      <div className="pb-16 pt-6 sm:pb-24">
        <div>
          {/*  Error message */}
          {error && <ErrorMessage errorText={error} />}

          {/*  Venue */}
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              {/* <!-- Name and Price --> */}
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{name}</h1>
                <p className="text-xl font-medium text-gray-900">{price} NOK</p>
              </div>
              {/*  Ratings */}
              <div className="mt-4">
                <p className="sr-only">Ratings</p>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {/* Active: "text-yellow-400", Inactive: "text-gray-200" */}
                    <RenderStars rating={rating} />
                  </div>
                </div>
              </div>
            </div>

            {/*  Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <p className="sr-only">Images</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-8">
                {media && media.length > 0 && (
                  <>
                    <img
                      src={media[0]}
                      alt=""
                      className="lg:col-span-2 lg:row-span-2 rounded-lg"
                    />
                    {media.length >= 2 && (
                      <img
                        src={media[1]}
                        alt=""
                        class="hidden lg:block rounded-lg"
                      />
                    )}
                    {media.length >= 3 && (
                      <img
                        src={media[2]}
                        alt=""
                        class="hidden lg:block rounded-lg"
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              {/*  Venue details */}
              <div className="mt-10">
                {/*  Location */}
                <div className="mb-2">
                  {location &&
                    location.city &&
                    location.country &&
                    location.city !== 'Unknown' &&
                    location.city !== 'unknown' &&
                    location.city !== 'string' &&
                    location.city !== '' &&
                    location.city !== 'test' && (
                      <span className="text-sm text-gray-700">
                        {location.city}
                      </span>
                    )}
                  {location &&
                    location.city &&
                    location.country &&
                    location.city !== 'Unknown' &&
                    location.city !== 'unknown' &&
                    location.city !== 'string' &&
                    location.city !== '' &&
                    location.city !== 'test' &&
                    location.country !== 'Unknown' &&
                    location.country !== 'unknown' &&
                    location.country !== 'string' &&
                    location.country !== '' &&
                    location.country !== 'test' && <span>, </span>}
                  {location &&
                    location.country &&
                    location.country !== 'Unknown' &&
                    location.country !== 'unknown' &&
                    location.country !== 'string' &&
                    location.country !== '' &&
                    location.country !== 'test' && (
                      <span className="text-sm text-gray-700">
                        {location.country}
                      </span>
                    )}
                </div>

                <p className="text-sm font-medium text-gray-900">Description</p>
                <div className="text-sm mt-4 text-gray-500">
                  <p>{description}</p>
                </div>
              </div>

              <form>
                <button
                  type="submit"
                  class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Book venue
                </button>
              </form>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-sm font-medium text-gray-900">Details</p>
                {/* meta: wifi, parking, breakfast, pets */}
                <div className="mt-4">
                  <p className="mt-1 flex items-center text-sm leading-6 text-gray-700">
                    Wifi:
                    {meta.wifi ? (
                      <span className="pl-2">
                        <FiCheckSquare />
                      </span>
                    ) : (
                      <span className="pl-2">
                        <TbSquare />
                      </span>
                    )}
                  </p>
                  <p className="mt-1 flex items-center text-sm leading-6 text-gray-700">
                    Parking:
                    {meta.parking ? (
                      <span className="pl-2">
                        <FiCheckSquare />
                      </span>
                    ) : (
                      <span className="pl-2">
                        <TbSquare />
                      </span>
                    )}
                  </p>
                  <p className="mt-1 flex items-center text-sm leading-6 text-gray-700">
                    Breakfast:
                    {meta.breakfast ? (
                      <span className="pl-2">
                        <FiCheckSquare />
                      </span>
                    ) : (
                      <span className="pl-2">
                        <TbSquare />
                      </span>
                    )}
                  </p>
                  <p className="mt-1 flex items-center text-sm leading-6 text-gray-700">
                    Pets:
                    {meta.pets ? (
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
              {/* Owner */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-sm font-medium text-gray-900">Owner</p>
                <div className="text-sm text-gray-700 mt-4 flex items-center">
                  {owner.name}
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
                <div className="text-sm text-gray-700 mt-1">{owner.email}</div>
              </div>

              {/* Booking history */}
              <div className="mt-8 border-t border-gray-200 pt-8">
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
                          {formateDate(booking.dateFrom)} {'-'}{' '}
                          {formateDate(booking.dateTo)}
                        </p>
                        <span className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                          {mapTime(booking.created)} ago
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
