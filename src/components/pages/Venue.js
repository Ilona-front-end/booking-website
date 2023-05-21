import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VENUES_BASE_URL } from '../../api/api';
import ErrorMessage from '../shared/ErrorMessage';
import RenderStars from '../../utils/renderStars';

export default function Venue() {
  // useParams() hook from React Router library allows to get the id from the URL, route is configured as '/venues/:id' that allows to retrieve the id from the URL
  const { id } = useParams();

  const [venue, setVenue] = useState({});
  const [error, setError] = useState(null);

  async function fetchVenue() {
    try {
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
      console.log('Venue information is fetched', venueResponse);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('Error message here: ', error);
      console.error('Error here: ', error.message); // "error.message":"Invalid uuid" not helpful for user
    }
  }

  // The useEffect will run once when the component first mounts
  useEffect(() => {
    fetchVenue();
  }, []);

  // Error message
  // if (error) {
  //   return <ErrorMessage errorText={error} />;
  // }

  const { name, price, rating } = venue;

  return (
    <div className="wrapper-max-width wrapper-padding-x">
      {/* <div class="pb-16 pt-6 sm:pb-24">
          <div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"> */}
      <div className="pb-16 pt-6 sm:pb-24">
        <div>
          {/* <!-- Error message --> */}
          {error && <ErrorMessage errorText={error} />}
          {/* <!-- Venue --> */}
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              {/* <!-- Name and Price --> */}
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{name}</h1>
                <p className="text-xl font-medium text-gray-900">{price} NOK</p>
              </div>
              {/* <!-- Ratings --> */}
              <div className="mt-4">
                <h2 className="sr-only">Ratings</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {/* <!-- Active: "text-yellow-400", Inactive: "text-gray-200" --> */}
                    <RenderStars rating={rating} />
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
