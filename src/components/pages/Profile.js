import React, { useState, useEffect } from 'react';
import { PROFILE_BASE_URL } from '../../api/api';
import AttentionMessage from '../shared/AttentionMessage';
import LoaderCircle from '../shared/Loader';
import defaultUserImg from '../../assets/defaultUserImg.jpg';

function Profile() {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('user');

  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setProfile] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [showOptionToChangeAvatar, setShowOptionToChangeAvatar] =
    useState(false); // showOptionToChangeAvatar has 2 options: weather update btn visible; weather input and save btn visible

  useEffect(() => {
    async function getUserProfile() {
      try {
        setIsLoading(true); // set isLoading state to true before the fetch request
        const response = await fetch(PROFILE_BASE_URL + userName, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        setProfile(json);
      } catch {
        console.log('error');
      } finally {
        setIsLoading(false); // set isLoading state to false after the fetch request is finished
      }
    }

    getUserProfile();
  }, [userName, token]);

  // destructuring causing errors after reload; const { name, email, venueManager, avatar } = userProfile;

  // show input field and save btn after clicking update btn
  const handleAvatarUpdateBtn = () => {
    setShowOptionToChangeAvatar(true);
  };

  // cancel btn to stop updating avatar
  const handleAvatarCancelBtn = () => {
    setShowOptionToChangeAvatar(false);
    setNewAvatarUrl('');
  };

  // user put new url and clicks on button save avatar, now sending new avatar to API
  const handleAvatarSubmit = async () => {
    try {
      const response = await fetch(`${PROFILE_BASE_URL}${userName}/media`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: newAvatarUrl,
        }),
      });
      const json = await response.json();
      setProfile(json);
      setShowOptionToChangeAvatar(false);
    } catch {
      console.log('error');
    }
  };

  if (isLoading) {
    return <LoaderCircle />;
  }

  return (
    <>
      {/*   Profile details  */}
      <div className="mt-6 pt-6 mx-auto max-w-xl px-5 lg:px-8">
        {token ? (
          <>
            <div>
              <p className="mt-6 mb-8 max-w-xl text-center text-3xl font-bold tracking-tight text-gray-900">
                Personal details of your account
              </p>
            </div>
            <div className="mt-5 mb-8 border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    <img
                      src={userProfile?.avatar}
                      alt={userProfile?.name}
                      className="h-24 w-24 rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultUserImg;
                      }}
                    />
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow"></span>
                    <span className="ml-4 flex-shrink-0">
                      <span className="rounded-md bg-white font-medium text-red-700"></span>
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    User name
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">{userProfile?.name}</span>
                    <span className="ml-4 flex-shrink-0">
                      <span className="rounded-md bg-white font-medium text-red-700">
                        Admin
                      </span>
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    {window.innerWidth < 640 ? 'Email' : 'Email address'}
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">{userProfile?.email}</span>
                    <span className="ml-4 flex-shrink-0">
                      <span className="rounded-md bg-white font-medium text-red-700">
                        Admin
                      </span>
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Venue manager
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">
                      {userProfile?.venueManager === true ? 'Yes' : 'No'}
                    </span>
                    <span className="ml-4 flex-shrink-0"></span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Profile picture
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow"></span>
                    {showOptionToChangeAvatar ? (
                      <>
                        {/* step 2: show input field and save button */}
                        <span className="flex-grow">
                          <label htmlFor="avatarInput">
                            <input
                              type="text"
                              name="avatarInput"
                              className="block w-full rounded-md bg-slate-200 py-2 px-2 border-gray-600 shadow-sm focus:border-indigo-800 focus:ring-indigo-700 sm:text-sm"
                              value={newAvatarUrl}
                              onChange={(e) => setNewAvatarUrl(e.target.value)}
                            />
                          </label>
                        </span>
                        <button
                          type="button"
                          className="rounded-md bg-white ml-3 py-2 px-2 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={handleAvatarSubmit}
                        >
                          Save
                        </button>
                        {/* cancel button */}
                        <button
                          type="button"
                          className="rounded-md ml-3 py-2 px-2 bg-white font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          onClick={handleAvatarCancelBtn}
                        >
                          Cancel
                        </button>
                        {/* <span className="flex-grow">
                        <label htmlFor="avatarInput">
                          <input
                            type="text"
                            name="avatarInput"
                            className="block w-full rounded-md bg-slate-200 py-2 px-2 border-gray-600 shadow-sm focus:border-indigo-800 focus:ring-indigo-700 sm:text-sm"
                            value={newAvatarUrl}
                            onChange={(e) => setNewAvatarUrl(e.target.value)}
                          />
                        </label>
                      </span> */}
                      </>
                    ) : (
                      // step 1 - show button update
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleAvatarUpdateBtn}
                      >
                        Update
                      </button>
                    )}
                    {/* <span className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Update
                    </button>
                  </span> */}
                    {/* <div className="hidden flex-grow">
                    <label htmlFor="avatar1">
                      <input
                        type="text"
                        name="avatar1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-700 sm:text-sm"
                        value=""
                      />
                    </label>
                  </div> */}
                    {/* <span
                    className="hidden ml-4 flex-shrink-0"
                  >
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Change
                    </button>
                  </span> */}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Bookings
                  </dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">
                      {userProfile?._count?.bookings}
                    </span>
                    <span className="ml-4 flex-shrink-0"></span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">Venues</dt>
                  <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">
                      {userProfile?._count?.venues}
                    </span>
                    <span className="ml-4 flex-shrink-0"></span>
                  </dd>
                </div>
              </dl>
            </div>
          </>
        ) : (
          <AttentionMessage
            heading="Atention!"
            text="You need to log in to be able to see your Profile details"
          />
        )}
      </div>
    </>
  );
}

export default Profile;
