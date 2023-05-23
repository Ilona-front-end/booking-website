import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Homepage() {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [maxGuests, setMaxGuests] = useState('');
  const [country, setCountry] = useState('');

  const handleHomepageVenueSearch = (e) => {
    e.preventDefault();
    console.log('handleHomepageVenueSearch');
  };

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
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="form-control block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
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
  );
}

export default Homepage;
