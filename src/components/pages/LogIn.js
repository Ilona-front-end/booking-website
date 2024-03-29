import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // handles form validation before sending data to the API
import { USER_LOG_IN_URL } from '../../api/api';
import { Link } from 'react-router-dom';
import ErrorMessage from '../shared/ErrorMessage';
import ScrollToTop from '../../utils/ScrollToTop';

export default function LogIn() {
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitLogInUser = async (data) => {
    // the user has submitted the form. If react-hook-form does not show errors, send the data to the API
    try {
      const response = await fetch(USER_LOG_IN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json.status === 'Unauthorized') {
        throw new Error(json.errors[0].message); // throw new Error() will trigger the catch block and handle the error
      } else {
        setErrorMessage(null);
      }

      if (json.status === 'Not Found') {
        throw new Error('Password or email is incorrect'); // throw new Error() will trigger the catch block and handle the error
        // json.errors[0].message is: Route POST:/api/v1/holidazelogin not found. Therefore I insert message manually
      } else {
        setErrorMessage(null);
      }

      // localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem('user', json.name);
      localStorage.setItem('email', json.email);
      localStorage.setItem('token', json.accessToken);
      window.location.replace('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* FORM HEADER */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 break-words">
            Log in to your account
          </h2>
        </div>

        {/* ERROR MESSAGE */}
        {errorMessage && <ErrorMessage errorText={errorMessage} />}

        <div className="mt-8 mb-8">
          <div className="bg-gray-100 py-8 px-4 shadow mx-auto max-w-[400px]">
            {/* FORM */}
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmitLogInUser)}
            >
              {/* EMAIL INPUT */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register('email', {
                      required: 'Please provide your email',
                      pattern: {
                        value: /^[\w-.]+@stud\.noroff\.no$/,
                        message: 'Required emails with "stud.noroff.no"',
                      },
                    })}
                    id="email"
                    type="email"
                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD INPUT */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register('password', {
                      required: 'Please provide a password',
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message:
                          'Password must contain at least 8 characters, one uppercase, one lowercase, and one number',
                      },
                    })}
                    id="password"
                    type="password"
                    className="block w-full rounded-md border-0 bg-gray-50 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
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

            {/* FORM ADDITIONAL OPTIONS */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-100 px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <Link
                    to="/"
                    className="inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>

                <div>
                  <Link
                    to="/"
                    className="inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
