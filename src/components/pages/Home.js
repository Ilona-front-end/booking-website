import React, { useState, useEffect } from 'react';
import { VENUES_BASE_URL } from '../../api/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// only is fetched once
const fetchVenues = async (setVenues, setIsLoading, setError) => {
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
    console.log('Venues information is fetched', json);
    // console.log('Venues array: ', venues)
    setError(null);
  } catch (error) {
    setError(error.message); // We received an error, setting our error state
    console.error('Error message here: ', error);
    console.error('Error here: ', error.message);
  } finally {
    setIsLoading(false); // set isLoading state to false after the fetch request is finished
  }
};

function Homepage() {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [maxGuests, setMaxGuests] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({});
  const [filteredVenues, setFilteredVenues] = useState([]); // We will use this state to filter the venues based on the search form
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // We will use this state to display the filtered venues only after the form is submitted

  useEffect(() => {
    fetchVenues(setVenues, setIsLoading, setError); // Empty array as second argument to avoid infinite loop, only run once
  }, []);

  const handleHomepageVenueSearch = (e) => {
    e.preventDefault();
    const formData = {
      // dateFrom,
      // dateTo,
      maxGuests,
      country,
    };
    setFormData(formData);
    console.log('Form data: ', formData);

    const filteredVenuesList = venues.filter((venue) => {
      const isValidMaxGuests = formData.maxGuests
        ? venue.maxGuests >= formData.maxGuests
        : true;
      const isValidCountry = formData.country
        ? venue.location.country === formData.country
        : true;
      return isValidMaxGuests && isValidCountry;
    });
    console.log('venues array', venues);
    console.log('filteredVenuesList array', filteredVenuesList);
    setFilteredVenues(filteredVenuesList);
    // console.log('filteredVenues array', filteredVenues);
    setIsFormSubmitted(true);
  };
  console.log('filteredVenues array', filteredVenues);

  return (
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
            <button
              type="submit"
              className="mt-4 lg:mt-8 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 ring-1 ring-inset hover:ring-gray-200 w-[180px]"
            >
              Search
            </button>
          </div>
        </form>

        {/* Display filtered venues */}
        <ul>
          {isFormSubmitted && filteredVenues.length === 0 ? (
            <p>No venues available</p>
          ) : (
            filteredVenues.map((filteredVenues) => (
              <li key={filteredVenues.id}>
                <p>{filteredVenues.name}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Homepage;
