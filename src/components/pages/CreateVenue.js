import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VENUES_BASE_URL } from '../../api/api';
import { countCharacters } from '../../utils/charactersCount';
import AttentionMessage from '../shared/AttentionMessage';
import ErrorMessage from '../shared/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../utils/ScrollToTop';

export default function CreateVenue() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [errorMessage, setErrorMessage] = useState(null);
  const [desriptionCharactersNum, setDescriptionCharactersNum] = useState('');

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
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        lat: 0,
        lng: 0,
      },
    },
  });

  const onSubmitCreateVenue = async (data) => {
    try {
      const formattedData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price), // parseFloat() converts string to float (number)
        maxGuests: parseInt(data.maxGuests), // parseInt() converts string to integer (number)
        rating: parseFloat(data.rating), // parseFloat() converts string to float (number)
        media: [data.media], // media is an array of strings, so we need to wrap data.media in square brackets to make it an array. API does not accept single string as a value for media
        meta: {
          wifi: data.meta.wifi === 'true', // data.meta.wifi is a string, so we need to convert it to boolean. If data.meta.wifi is equal to 'true', then it will be converted to true, otherwise it will be converted to false
          parking: data.meta.parking === 'true', // data.meta.parking is a string, so we need to convert it to boolean
          breakfast: data.meta.breakfast === 'true', // data.meta.breakfast is a string, so we need to convert it to boolean.
          pets: data.meta.pets === 'true', // data.meta.pets is a string, so we need to convert it to boolean
        },
        location: {
          address: data.location.address,
          city: data.location.city,
          zip: data.location.zip,
          country: data.location.country,
          continent: data.location.continent,
          lat: parseFloat(data.location.lat), // parseFloat() converts string to float (number)
          lng: parseFloat(data.location.lng), // parseFloat() converts string to float (number)
        },
      };

      const response = await fetch(VENUES_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (response.status === 201) {
        navigate('/user-venues');
      }

      if (!response.ok) {
        const responseDataJSON = await response.json();
        const responseErrorMessage = responseDataJSON.errors[0].message;
        setErrorMessage(responseErrorMessage);
        throw new Error(responseErrorMessage); // throw new Error() will trigger the catch block and handle the error
      } else {
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage(error.message);
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
              Create Venue
            </h2>
          </div>

          {/* ERROR MESSAGE FROM API */}
          {errorMessage && <ErrorMessage errorText={errorMessage} />}

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
                        maxLength: {
                          value: 50,
                          message: 'Maximum length 50 characters',
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
                        maxLength: {
                          value: 1000,
                          message: 'Maximum length 1000 characters',
                        },
                      })}
                      id="description"
                      type="text"
                      rows="8"
                      value={desriptionCharactersNum}
                      onChange={(e) =>
                        setDescriptionCharactersNum(e.target.value)
                      }
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-900">
                    Characters left:{' '}
                    {countCharacters(desriptionCharactersNum, 1000)}
                  </p>
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
                          value: /^[0-9]+([,.][0-9]*)?$/, // Regex pattern to allow whole numbers or decimal numbers with comma(,) or dot(.)
                          message: 'Example: 100 or 100.50 or 100,50',
                        },
                      })}
                      id="price"
                      type="text"
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
                        max: {
                          value: 100,
                          message: 'Value must be less than 100',
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
                          value: 0,
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

                {/* META: WIFI INPUT */}
                <div>
                  <label
                    htmlFor="wifi"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mark this box to if you provide wifi:
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('meta.wifi')}
                      id="wifi"
                      type="checkbox"
                      value="true" // set value to true when checked
                      className="block rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* META: PARKING INPUT */}
                <div>
                  <label
                    htmlFor="parking"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mark this box to if you provide parking:
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('meta.parking')}
                      id="parking"
                      type="checkbox"
                      value="true" // set value to true when checked
                      className="block rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* META: BREAKFAST INPUT */}
                <div>
                  <label
                    htmlFor="breakfast"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mark this box to if you provide breakfast:
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('meta.breakfast')}
                      id="breakfast"
                      type="checkbox"
                      value="true" // set value to true when checked
                      className="block rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* META: PETS INPUT */}
                <div>
                  <label
                    htmlFor="pets"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mark this box to if you allow pets:
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('meta.pets')}
                      id="pets"
                      type="checkbox"
                      value="true" // set value to true when checked
                      className="block rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* LOCATION: ADDRESS INPUT */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('location.address', {
                        minLength: {
                          value: 3,
                          message: 'Minimum length 3 characters',
                        },
                      })}
                      id="address"
                      type="text"
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* LOCATION: CITY INPUT */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('location.city', {
                        minLength: {
                          value: 3,
                          message: 'Minimum length 3 characters',
                        },
                      })}
                      id="city"
                      type="text"
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* LOCATION: ZIP INPUT */}
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Zip
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('location.zip', {
                        minLength: {
                          value: 3,
                          message: 'Minimum length 3 characters',
                        },
                      })}
                      id="zip"
                      type="text"
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* LOCATION: COUTRY INPUT */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      {...register('location.country')}
                      id="country"
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    >
                      <option value="Norway">Norway</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Canada">Canada</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czechia">Czechia</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Greece">Greece</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Marocco">Marocco</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="New-Zealand">New Zealand</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="North-Korea">North Korea</option>
                      <option value="Norway">Norway</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Russia">Russia</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Somalia">Somalia</option>
                      <option value="Spain">Spain</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United-Kingdom">United Kingdom</option>
                      <option value="United-States-of-America">
                        United States of America
                      </option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Zambia">Zambia</option>
                    </select>
                  </div>
                </div>

                {/* LOCATION: CONTINENT INPUT */}
                <div>
                  <label
                    htmlFor="continent"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Continent
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('location.continent', {
                        minLength: {
                          value: 3,
                          message: 'Minimum length 3 characters',
                        },
                      })}
                      id="continent"
                      type="text"
                      className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 py-3 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset ring-indigo-600 hover:ring-gray-200"
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
          text="You need to log in to be able to create a new venue"
        />
      )}
    </>
  );
}
