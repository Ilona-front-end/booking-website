import React, { useState, useEffect } from 'react';
import { PROFILE_BASE_URL } from '../../api/api';

function Profile() {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('user');

  const [userProfile, setProfile] = useState(null);

  useEffect(() => {
    async function getUserProfile() {
      try {
        const response = await fetch(PROFILE_BASE_URL + userName, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        setProfile(json);
        // POSSIBLE: json.status could be 'Not Found', json.errors[0].message could be 'No profile with this name'
        
        // switch (json.status) {
        //   case 'ok':
        //     setErrorMessage(null);
        //     setProfile(json);
        //     break;
        //   case 'Not Found':
        //     setErrorMessage(json.errors[0].message); // No profile with this name
        //     setProfile(null);
        //     // throw new Error(json.errors[0].message);
        //     break;
        //   case 'Internal Server Error':
        //     setErrorMessage(json.errors[0].message); // Internal Server Error
        //     setProfile(null);
        //     // throw new Error(json.errors[0].message);
        //     break;
        //   default:
        //     setErrorMessage('An error occured');
        //     setProfile(null);
        //     // throw new Error('An error occured');
        //     break;
        // }

      } catch {
        console.log('error');
      }
    }

    getUserProfile();
  }, [userName, token]);

  // const { name, email, venueManager, avatar } = userProfile;

  return (
    <>
      {/*   Profile details  */}
      <div className="mt-6 pt-6 mx-auto max-w-xl px-5 lg:px-8">
        {token ? 
        (<>
          <div>
            <p className="mt-6 mb-8 max-w-xl text-center text-3xl font-bold tracking-tight text-gray-900">
              Personal details of your account
            </p>
          </div>
          <div className="mt-5 mb-8 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">User name</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{userProfile?.name}</span>
                  <span className="ml-4 flex-shrink-0">
                    <span className="rounded-md bg-white font-medium text-red-700">Admin</span>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span
                    className="flex-grow">{userProfile?.email}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <span className="rounded-md bg-white font-medium text-red-700">Admin</span>
                  </span>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Venue manager</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{userProfile?.venueManager === true ? 'Yes' : 'No'}</span>
                  <span className="ml-4 flex-shrink-0"></span>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  Profile picture
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <div className="flex-grow"><img src={userProfile?.avatar} alt={userProfile?.name} /></div>
                  <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Update
                    </button>
                  </span>
                  <div className="hidden flex-grow">
                    <label htmlFor="avatar1">
                      <input
                        type="text"
                        name="avatar1"
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
        </>) 
        : (<div>Log in to see your Profile Details</div>)}
      </div>
    </>
  )
}

export default Profile;
