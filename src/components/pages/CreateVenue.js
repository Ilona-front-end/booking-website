import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VENUES_BASE_URL } from '../../api/api';

export default function CreateVenue() {
  const token = localStorage.getItem('token');

  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      // meta: {
      //   wifi: false,
      //   parking: false,
      //   breakfast: false,
      //   pets: false,
      // },
      // location: {
      //   address: 'Unknown',
      //   city: 'Unknown',
      //   zip: 'Unknown',
      //   country: 'Unknown',
      //   continent: 'Unknown',
      //   lat: 0,
      //   lng: 0,
      // },
    },
  });

  const onSubmitCreateVenue = async (data) => {
    try {
      const formattedData = {
        ...data,
        price: parseFloat(data.price), // parseFloat() converts string to float (number)
        maxGuests: parseInt(data.maxGuests), // parseInt() converts string to integer (number)
        rating: parseFloat(data.rating), // parseFloat() converts string to float (number)
        media: [data.media], // media is an array of strings, so we need to wrap data.media in square brackets to make it an array. API does not accept single string as a value for media
      };
      console.log('formattedData', formattedData);

      const response = await fetch(VENUES_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      console.log('Venue created successfully. Response: ', response);

      if (response.status === 201) {
        console.log(
          'Venue created successfully. Response status: ',
          response.status
        );
      }

      // We are only interested in the response status,
      // we do not need to access or display actual data from the response (ex. id, name ect.), so we do not need to convert it to JSON:
      // const json = await response.json();

      if (response.status === 'Bad Request') {
        throw new Error(response.errors[0].message); // throw new Error() will trigger the catch block and handle the error
      } else {
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log('onSubmitCreateVenue error', error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* FORM HEADER */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create Venue
          </h2>
        </div>

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4 p-4 rounded-md bg-red-50">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Did not create a user venue:
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <div className="list-disc space-y-1 pl-5">
                    <div>{errorMessage}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 mb-8">
          <div className="bg-gray-100 py-8 px-4 shadow mx-auto max-w-[400px]">
            {/* FORM */}
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmitCreateVenue)}
            >
              {/* NAME INPUT */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register('name', {
                      required: 'Please provide your name',
                      minLength: {
                        value: 3,
                        message: 'Minimum length 3 characters',
                      },
                    })}
                    id="name"
                    type="text"
                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* DESCRIPTION INPUT */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    {...register('description', {
                      required: 'Please provide description',
                      minLength: {
                        value: 10,
                        message: 'Minimum length 10 characters',
                      },
                    })}
                    id="description"
                    type="text"
                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.description && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* MEDIA INPUT */}
              <div>
                <label
                  htmlFor="media"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <input
                    {...register('media', {
                      pattern: {
                        value: /^.+\.((jpe?g)|(png))$/i,
                        message:
                          'Please provide a link to image online with .jpg or .png at the end',
                      },
                    })}
                    id="media"
                    type="text"
                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.media && (
                  <p className="mt-2 text-xs text-red-600">
                    {/* error message is shown if user provides information, but not enough to make a POST request. This field is not required, but can guide user */}
                    {errors.media.message}
                  </p>
                )}
              </div>

              {/* PRICE INPUT */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register('price', {
                      required: 'Please provide price',
                      min: {
                        value: 1,
                        message: 'Minimum price must be a positive number',
                      },
                    })}
                    id="price"
                    type="number"
                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* MAX GUESTS INPUT */}
              <div>
                <label
                  htmlFor="maxGuests"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Max guests <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register('maxGuests', {
                      required: 'Please provide max guests number',
                      min: {
                        value: 1,
                        message: 'Value must be a positive number',
                      },
                    })}
                    id="maxGuests"
                    type="number"
                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.maxGuests && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.maxGuests.message}
                  </p>
                )}
              </div>

              {/* RATING INPUT */}
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rating
                </label>
                <div className="mt-2">
                  <input
                    {...register('rating', {
                      min: {
                        value: 1,
                        message: 'Minimum rating is 0 stars',
                      },
                      max: {
                        value: 5,
                        message: 'Maximum rating is 5 stars',
                      },
                    })}
                    id="rating"
                    type="number"
                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.rating && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/*  INPUT */}
              {/* <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mark this box to ...
                </label>
                <div className="mt-2">
                  <input
                    {...register('')}
                    id=""
                    type="checkbox"
                    className="block rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}

              {/* SUBMIT BUTTON */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
