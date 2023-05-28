import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VENUES_BASE_URL } from '../../api/api';
import LoaderCircle from '../shared/Loader';
import ErrorMessage from '../shared/ErrorMessage';
import AttentionMessage from '../shared/AttentionMessage';
import ScrollToTop from '../../utils/ScrollToTop';

function UpdateVenue() {
  const token = localStorage.getItem('token');

  // useParams() hook from React Router library allows to get the id from the URL, route is configured as `/user-venues/update-venue/${id}` that allows to retrieve the id from the URL
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true); // We will use this state to show a loading indicator
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState({});
  const [updatedVenue, setUpdatedVenue] = useState({});

  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editMaxGuests, setEditMaxGuests] = useState(false);
  const [editRating, setEditRating] = useState(false);
  const [editMedia, setEditMedia] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setIsLoading(true); // set isLoading state to true before the fetch request
        const response = await fetch(
          `${VENUES_BASE_URL}/${id}?_owner=true&_bookings=true`
        );
        if (!response.ok) {
          throw new Error(
            'Failed to get information about venues from the API'
          );
        }

        const json = await response.json();
        setVenue(json);
        setUpdatedVenue(json); // Initialize updatedVenue state with fetched venue data
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false); // set isLoading state to false after the fetch request is finished
      }
    };
    fetchVenue();
    // eslint-disable-next-line
  }, [id]);

  if (isLoading) {
    return <LoaderCircle />;
  }

  // Error message
  if (error) {
    return <ErrorMessage errorText={error} />;
  }

  // CLICK BUTTON 'UPDATE' TO DISPLAY INPUT FIELD
  const handleEditField = (fieldName) => {
    if (fieldName === 'name') {
      setEditName(true);
      setEditDescription(false);
      setEditPrice(false);
      setEditMaxGuests(false);
      setEditRating(false);
      setEditMedia(false);
    } else if (fieldName === 'description') {
      setEditName(false);
      setEditDescription(true);
      setEditPrice(false);
      setEditMaxGuests(false);
      setEditRating(false);
      setEditMedia(false);
    } else if (fieldName === 'price') {
      setEditName(false);
      setEditDescription(false);
      setEditPrice(true);
      setEditMaxGuests(false);
      setEditRating(false);
      setEditMedia(false);
    } else if (fieldName === 'maxGuests') {
      setEditName(false);
      setEditDescription(false);
      setEditPrice(false);
      setEditMaxGuests(true);
      setEditRating(false);
      setEditMedia(false);
    } else if (fieldName === 'rating') {
      setEditName(false);
      setEditDescription(false);
      setEditPrice(false);
      setEditMaxGuests(false);
      setEditRating(true);
      setEditMedia(false);
    } else if (fieldName === 'media') {
      setEditName(false);
      setEditDescription(false);
      setEditPrice(false);
      setEditMaxGuests(false);
      setEditRating(false);
      setEditMedia(true);
    }
  };

  // CLICK BUTTON 'CANCEL' TO HIDE INPUT FIELD
  const handleCancelField = () => {
    setEditName(false);
    setEditDescription(false);
    setEditPrice(false);
    setEditMaxGuests(false);
    setEditRating(false);
    setEditMedia(false);

    setUpdatedVenue(venue); // Reset updatedVenue state to the original venue data
  };

  // CLICK BUTTON 'SAVE' TO UPDATE VENUE PROPERTY
  const handleSaveField = (fieldName) => {
    if (fieldName === 'name') {
      setEditName(false);
      updateVenuePropertyApiRequest('name', updatedVenue.name);
    } else if (fieldName === 'description') {
      setEditDescription(false);
      updateVenuePropertyApiRequest('description', updatedVenue.description);
    } else if (fieldName === 'price') {
      setEditPrice(false);
      updateVenuePropertyApiRequest('price', parseFloat(updatedVenue.price));
    } else if (fieldName === 'maxGuests') {
      setEditMaxGuests(false);
      updateVenuePropertyApiRequest(
        'maxGuests',
        parseInt(updatedVenue.maxGuests)
      );
    } else if (fieldName === 'rating') {
      setEditRating(false);
      updateVenuePropertyApiRequest('rating', parseFloat(updatedVenue.rating));
    } else if (fieldName === 'media') {
      setEditMedia(false);
      // only adds 1 picture
      updateVenuePropertyApiRequest('media', [updatedVenue.media]); //Pass array as parameter
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVenue((prevVenue) => ({
      ...prevVenue,
      [name]: value,
    }));
  };

  const updateVenuePropertyApiRequest = async (propertyName, propertyValue) => {
    try {
      const response = await fetch(`${VENUES_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [propertyName]: propertyValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${propertyName} field`);
      }

      const updatedVenueResponse = await response.json();

      setVenue(updatedVenueResponse);
      setUpdatedVenue(updatedVenueResponse);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { name, description, price, maxGuests, rating, media } = updatedVenue;

  return (
    <>
      <ScrollToTop />
      {token ? (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Update Venue
            </h2>
          </div>

          {/* DATA TO UPDATE SECTION */}
          <div className="mt-8 mb-8">
            <div className="bg-gray-100 py-8 px-4 shadow mx-auto max-w-[400px]">
              <div className="space-x-6 space-y-4 mb-8">
                {/* NAME */}
                <div>
                  <span className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    Name:
                  </span>
                  {!editName && <span>{name}</span>}
                </div>

                {/* NAME INPUT FIELD */}
                <div>
                  {editName ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="name">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-white py-2 px-4 rounded w-full max-w-[250px]"
                            value={updatedVenue.name}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                        onClick={() => handleSaveField('name')}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md bg-white py-2 px-4 font-medium text-gray-500 hover:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleCancelField}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px] mx-auto"
                      onClick={() => handleEditField('name')}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-x-6 space-y-4 mb-8">
                {/* DESCRIPTION */}
                <div>
                  <div className="mb-8 border-t border-gray-300"></div>
                  <span className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    Description:
                  </span>
                  {!editDescription && <p>{description}</p>}
                </div>

                {/* DESCRIPTION INPUT FIELD */}
                <div>
                  {editDescription ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="description">
                          <textarea
                            type="text"
                            rows="10"
                            name="description"
                            id="description"
                            className="bg-white py-2 px-4 rounded w-full max-w-[250px]"
                            value={updatedVenue.description}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                        onClick={() => handleSaveField('description')}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md bg-white py-2 px-4 font-medium text-gray-500 hover:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleCancelField}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px] mx-auto"
                      onClick={() => handleEditField('description')}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-x-6 space-y-4 mb-8">
                {/* PRICE */}
                <div>
                  <div className="mb-8 border-t border-gray-300"></div>
                  <span className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    Price:
                  </span>
                  {!editPrice && (
                    <span>
                      {price}
                      <span className="pl-2">NOK</span>
                    </span>
                  )}
                </div>

                {/* PRICE INPUT FIELD */}
                <div>
                  {editPrice ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="price">
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="bg-white py-2 px-4 rounded w-full max-w-[250px]"
                            value={updatedVenue.price}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                        onClick={() => handleSaveField('price')}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md bg-white py-2 px-4 font-medium text-gray-500 hover:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleCancelField}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px] mx-auto"
                      onClick={() => handleEditField('price')}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-x-6 space-y-4 mb-8">
                {/* MAX GUESTS */}
                <div>
                  <div className="mb-8 border-t border-gray-300"></div>
                  <span className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    Max guests:
                  </span>
                  {!editMaxGuests && <span>{maxGuests}</span>}
                </div>

                {/* MAX GUESTS INPUT FIELD */}
                <div>
                  {editMaxGuests ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="maxGuests">
                          <input
                            type="number"
                            name="maxGuests"
                            id="maxGuests"
                            min={1}
                            max={50}
                            className="bg-white py-2 px-4 rounded w-full max-w-[250px]"
                            value={updatedVenue.maxGuests}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                        onClick={() => handleSaveField('maxGuests')}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md bg-white py-2 px-4 font-medium text-gray-500 hover:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleCancelField}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px] mx-auto"
                      onClick={() => handleEditField('maxGuests')}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-x-6 space-y-4 mb-8">
                {/* RATING */}
                <div>
                  <div className="mb-8 border-t border-gray-300"></div>
                  <span className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    Rating:
                  </span>
                  {!editRating && (
                    <span>
                      {rating}
                      <span className="pl-2">stars</span>
                    </span>
                  )}
                </div>

                {/* RATING INPUT FIELD */}
                <div>
                  {editRating ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="rating">
                          <input
                            type="number"
                            name="rating"
                            id="rating"
                            className="bg-white py-2 px-4 rounded w-full max-w-[250px]"
                            value={updatedVenue.rating}
                            min={0}
                            max={5}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                        onClick={() => handleSaveField('rating')}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md bg-white py-2 px-4 font-medium text-gray-500 hover:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleCancelField}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px] mx-auto"
                      onClick={() => handleEditField('rating')}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-x-6 space-y-4 mb-8">
                {/* MEDIA */}
                <div>
                  <div className="mb-8 border-t border-gray-300"></div>
                  <span className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    Image(s):
                  </span>
                  {!editMedia && (
                    <div className="mt-4">
                      {media && media.length > 0 && (
                        <>
                          <img
                            src={media[0]}
                            alt=""
                            className="aspect-[3/2] w-full rounded-xl object-cover"
                          />
                          {media.length >= 2 && (
                            <img
                              src={media[1]}
                              alt=""
                              className="aspect-[3/2] w-full rounded-xl object-cover mt-4"
                            />
                          )}
                          {media.length >= 3 && (
                            <img
                              src={media[2]}
                              alt=""
                              className="aspect-[3/2] w-full rounded-xl object-cover"
                            />
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* MEDIA INPUT FIELD */}
                <div>
                  {editMedia ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="media">
                          <input
                            type="text"
                            name="media"
                            id="media"
                            className="bg-white py-2 px-4 rounded w-full max-w-[250px]"
                            value={updatedVenue.media}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                        onClick={() => handleSaveField('media')}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md bg-white py-2 px-4 font-medium text-gray-500 hover:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleCancelField}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px] mx-auto"
                      onClick={() => handleEditField('media')}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AttentionMessage
          heading="Atention!"
          text="Please log in to update venue you manage."
        />
      )}
    </>
  );
}

export default UpdateVenue;
