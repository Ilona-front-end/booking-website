import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VENUES_BASE_URL } from '../../api/api';
import LoaderCircle from '../shared/Loader';
import ErrorMessage from '../shared/ErrorMessage';
import AttentionMessage from '../shared/AttentionMessage';

function UpdateVenue() {
  const token = localStorage.getItem('token');
  // const userName = localStorage.getItem('user');

  // useParams() hook from React Router library allows to get the id from the URL, route is configured as `/user-venues/update-venue/${id}` that allows to retrieve the id from the URL
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true); // We will use this state to show a loading indicator
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState({});
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [updatedVenue, setUpdatedVenue] = useState({});

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
        console.log('Venue information is fetched', json);
        console.log('venue structure', venue);
        console.log('updated venue structure', updatedVenue);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
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

  const handleEditField = () => {
    setShowEditBtn(true);
  };

  const handleCancelField = () => {
    setShowEditBtn(false);
    setUpdatedVenue(venue); // Reset updatedVenue state to the original venue data
  };

  const handleSaveField = () => {
    setShowEditBtn(false);
    console.log('updatedVenue after button Save click: ', updatedVenue);
    updateVenueProperty('name', updatedVenue.name);
  };

  // const handleNameChange = (event) => {
  //   setUpdatedVenue((prevVenue) => ({
  //     ...prevVenue,
  //     name: event.target.value,
  //   }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVenue((prevVenue) => ({
      ...prevVenue,
      [name]: value,
    }));
  };

  const updateVenueProperty = async (propertyName, propertyValue) => {
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
      console.log(`updated successfully ${propertyName} field`);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  const { name, description } = updatedVenue;

  return (
    <>
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
              <div className="space-x-6 space-y-4 mb-4">
                {/* NAME */}
                <div>
                  <span className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    Name:
                  </span>
                  {!showEditBtn && <span>{name}</span>}
                </div>
                {/* NAME INPUT FIELD */}
                <div>
                  {showEditBtn ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="name">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-white p-2 rounded"
                            value={updatedVenue.name}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                        onClick={handleSaveField}
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
                      onClick={handleEditField}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-x-6 space-y-4 mb-4">
                {/* DESCRIPTION */}
                <div>
                  <span className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    Description:
                  </span>
                  {!showEditBtn && <p>{description}</p>}
                </div>
                {/* DESCRIPTION INPUT FIELD */}
                <div>
                  {showEditBtn ? (
                    <>
                      <div className="mb-4">
                        <label htmlFor="description">
                          <textarea
                            type="text"
                            rows="10"
                            name="description"
                            id="description"
                            className="bg-white p-2 rounded"
                            value={updatedVenue.description}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                      <button
                        type="button"
                        className="rounded-md bg-white py-2 px-4 font-medium text-indigo-600 hover:text-indigo-500 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
                        onClick={handleSaveField}
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
                      onClick={handleEditField}
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
