import React, { useState, useEffect } from 'react';
import { VENUES_BASE_URL } from '../../api/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import defaultVenueImg from '../../assets/defaultVenueImg.jpg';
import getRatingStars from '../../utils/ratingStars';
import { mapTime } from '../../utils/mapTime';
import { FaUserCircle } from 'react-icons/fa';
import AttentionMessage from '../shared/AttentionMessage';

function Homepage() {
  const [venues, setVenues] = useState([]);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [maxGuests, setMaxGuests] = useState('');
  const [country, setCountry] = useState('');
  const [formData, setFormData] = useState({});
  const [filteredVenues, setFilteredVenues] = useState([]); // We will use this state to filter the venues based on the search form
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // We will use this state to display the filtered venues only after the form is submitted

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          `${VENUES_BASE_URL}?sort=created&_owner=true&_bookings=true`
        ); // Fetch API data and show newest venues first
        if (!response.ok) {
          throw new Error(
            'Failed to get information about venues from the API'
          ); // throw new Error() will trigger the catch block and handle the error
        }
        const json = await response.json(); // Wait for the response to be converted to JSON
        setVenues(json); // We received API data, setting our venues state
        // # console.log('Venues information is fetched', json);
      } catch (error) {
        // setError(error.message); // We received an error, setting our error state
        console.error('Error message here: ', error);
        console.error('Error here: ', error.message);
      }
    };

    fetchVenues(); // Empty array as second argument to avoid infinite loop, only run once
  }, []);

  const handleHomepageVenueSearch = (e) => {
    e.preventDefault();
    const formDataInputs = {
      // dateFrom,
      // dateTo,
      maxGuests,
      country,
    };
    setFormData(formDataInputs);
    console.log('Form data: ', formData);
    setIsFormSubmitted(true);
  };
  // console.log('filteredVenues array', filteredVenues);

  useEffect(() => {
    if (isFormSubmitted) {
      const filteredVenuesList = venues.filter((venue) => {
        const isValidMaxGuests = formData.maxGuests
          ? venue.maxGuests >= formData.maxGuests
          : false;
        const isValidCountry = formData.country
          ? venue.location.country === formData.country
          : false;
        return isValidMaxGuests && isValidCountry;
      });
      setFilteredVenues(filteredVenuesList);
      console.log('filteredVenues array (if)', filteredVenues);
    }
    // eslint-disable-next-line
  }, [formData]);

  useEffect(() => {
    return () => {
      // cleanup function is called when component unmounts - user leaves to other page
      setIsFormSubmitted(false); // reset the isFormSubmitted state to false
    };
  }, []);

  return (
    <>
      <div className="bg-gray-200 wrapper-max-width wrapper-padding-x">
        <div className="px-8 md:px-0 lg:px-0">
          <form onSubmit={handleHomepageVenueSearch}>
            <div className="py-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-6">
              <div className="form-group sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="dateFrom"
                  className="block text-base leading-6 text-gray-900"
                >
                  Date from:
                </label>
                <div className="mt-2">
                  <DatePicker
                    id="dateFrom"
                    selected={dateFrom}
                    onChange={(date) => setDateFrom(date)}
                    className="form-control block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="form-group sm:col-span-2">
                <label
                  htmlFor="dateTo"
                  className="block text-base leading-6 text-gray-900"
                >
                  Date from:
                </label>
                <div className="mt-2">
                  <DatePicker
                    id="dateTo"
                    selected={dateTo}
                    onChange={(date) => setDateTo(date)}
                    className="form-control block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="form-group sm:col-span-2">
                <label
                  htmlFor="maxGuests"
                  className="block text-base leading-6 text-gray-900"
                >
                  Total of guests:
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="maxGuests"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    className="form-control block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="form-group sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-base leading-6 text-gray-900"
                >
                  Country:
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-control block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  >
                    <option value="">choose from list</option>
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
                    {/* <option value="Norway">Norway</option> */}
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
              <button
                type="submit"
                className="mt-4 lg:mt-8 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px]"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="wrapper-max-width wrapper-padding-x">
        {/* Display filtered venues */}
        <div className="py-8 bg-white">
          <ul className="grid grid-cols-1 gap-x-4 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
              isFormSubmitted && filteredVenues.length > 0
                ? filteredVenues.map(
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
                              <h2 className="text-base font-medium text-gray-900">
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
                                ].some((word) =>
                                  name.toLowerCase().includes(word)
                                )
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
                  )
                : null
              // <AttentionMessage
              //   heading="No venues found!"
              //   text="Please try again with different search criteria."
              // />
            }
          </ul>
          {isFormSubmitted && filteredVenues.length === 0 && (
            <AttentionMessage
              heading="Oh Dear!"
              text="Please try again with different Search criteria: date, guests or country."
            />
          )}
        </div>
      </div>
      <div className="wrapper-max-width wrapper-padding-x mb-6">
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Summer is around the corner.
                <br />
                Book a venue for your next event
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                You have a lot to plan for your next trip. Most important is
                where you will stay. We have a solution. Find a safe and stylish
                accommodation and focus on your vacation.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/venues"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Browse all venues
                </Link>
                <Link
                  to="/create-venue"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Or add a venue as a manager <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}

export default Homepage;
