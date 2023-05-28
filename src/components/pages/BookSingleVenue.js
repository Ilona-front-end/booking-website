import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BOOKINGS_BASE_URL } from '../../api/api';
import AttentionMessage from '../shared/AttentionMessage';
import ErrorMessage from '../shared/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../utils/ScrollToTop';

const BookSingleVenue = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateFrom: null,
      dateTo: null,
      guests: 0,
      venueId: id,
    },
  });

  const onSubmitBookSingleVenue = async (data) => {
    try {
      // Collecting data from the form
      const formattedData = {
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        guests: parseInt(data.guests), // parseInt() converts string to integer (number)
        venueId: id,
      };
      console.log('formattedData', formattedData);

      // Sending data to the API
      const response = await fetch(BOOKINGS_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      console.log('Response after clicking submit: ', response);

      // Navigate user to user-venues page if the response is ok
      if (response.status === 201) {
        navigate('/user-venues');
      }

      // Checking if the response is ok after sending data to the API
      if (!response.ok) {
        const responseDataJSON = await response.json();
        const responseErrorMessage = responseDataJSON.errors[0].message;
        console.log(
          '!response.ok, responseErrorMessage:',
          responseDataJSON.errors[0].message
        );
        console.log('!response.ok, status code: ', responseDataJSON.statusCode);
        setErrorMessage(responseErrorMessage);
        throw new Error(responseErrorMessage); // throw new Error() will trigger the catch block and handle the error
      } else {
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage(error.message);
      // console.log('catch -- errorMessage statusCode 400:' , errorMessage);
      // console.log('catch - onSubmitBookSingleVenue error: --->', error);
      console.log(
        'catch - onSubmitBookSingleVenue error.message ---->:',
        error.message
      );
    }
  };

  return (
    <>
      <ScrollToTop />
      {token ? (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          {/* FORM HEADER */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Book This Venue
            </h2>
          </div>

          {/* ERROR MESSAGE FROM API */}
          {errorMessage && <ErrorMessage errorText={errorMessage} />}

          <div className="mt-8 mb-8">
            <div className="bg-gray-100 py-8 px-4 shadow mx-auto max-w-[400px]">
              {/* FORM */}
              <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmitBookSingleVenue)}
              >
                {/* DATE FROM INPUT */}
                <div>
                  <label
                    htmlFor="dateFrom"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date from <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('dateFrom', {
                        required:
                          'Please provide date for your booking to start',
                      })}
                      id="dateFrom"
                      type="date"
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.dateFrom && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.dateFrom.message}
                    </p>
                  )}
                </div>

                {/* DATE TO INPUT */}
                <div>
                  <label
                    htmlFor="dateTo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date to <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('dateTo', {
                        required: 'Please provide date for your booking to end',
                      })}
                      id="dateTo"
                      type="date"
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.dateTo && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.dateTo.message}
                    </p>
                  )}
                </div>

                {/* GUESTS INPUT */}
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Number of guests <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('guests', {
                        required: 'Please provide number of guests attending',
                        min: {
                          value: 1,
                          message: 'Value must be a positive number',
                        },
                      })}
                      id="guests"
                      type="number"
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.guests && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.guests.message}
                    </p>
                  )}
                </div>

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
      ) : (
        <AttentionMessage
          heading="Atention!"
          text="Please log in to book any venue."
        />
      )}
    </>
  );
};

export default BookSingleVenue;
