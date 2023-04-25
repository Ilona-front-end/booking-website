import React from 'react';

function Profile() {
  return (
    <>
      {/*   Profile details  */}
      <div className="mt-6 pt-6 mx-auto max-w-xl px-5 lg:px-8">
        <div id="generalAvatarMessage" className="mb-5 mt-5"></div>
        <div>
          <p class="mt-6 mb-8 max-w-xl text-center text-3xl font-bold tracking-tight text-gray-900">
            Personal details of your account
          </p>
        </div>
        <div className="mt-5 mb-8 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">User name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="insertUserName flex-grow"></span>
                <span className="ml-4 flex-shrink-0">
                  <span className="rounded-md bg-white font-medium text-red-700">Admin</span>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span
                  id="insertUserEmail"
                  className="flex-grow">
                </span>
                <span className="ml-4 flex-shrink-0">
                  <span className="rounded-md bg-white font-medium text-red-700">Admin</span>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Venue manager</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span id="insertVenueManager" className="flex-grow"></span>
                <span className="ml-4 flex-shrink-0"></span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">
                Profile picture
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="flex-grow"></div>
                <span className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Update
                  </button>
                </span>
                <div className="hidden flex-grow">
                  <label for="avatar1">
                    <input
                      type="text"
                      name="avatar1"
                      id="avatar1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-700 sm:text-sm"
                      value=""
                    />
                  </label>
                </div>
                <span
                  className="hidden ml-4 flex-shrink-0"
                >
                  <button
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Change
                  </button>
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export default Profile;
