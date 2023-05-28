import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import pageNotFoundImg from '../../assets/pageNotFoundImg.jpg';
import ScrollToTop from '../../utils/ScrollToTop';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found';
    document.documentElement.classList.add('h-full'); //accessing <html> element and adding class
    document.body.classList.add('h-full'); //accessing <body> element and adding class

    // Delete classes from html and body elements when the component is unmounted. Unmounted means that the component is removed from the DOM, when component is no longer needed and is being destroyed (for example, when user navigates to another page)
    return () => {
      document.documentElement.classList.remove('h-full');
      document.body.classList.remove('h-full');
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="wrapper-max-width">
        <main className="relative isolate min-h-full">
          <img
            src={pageNotFoundImg}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
          />
          <div className="px-6 py-32 text-center sm:py-40 lg:px-8">
            <p className="text-base font-semibold leading-8 text-white">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 text-base text-white/70 sm:mt-6">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                to="/"
                className="text-sm font-semibold leading-7 text-white hover:text-xl hover:shadow p-2 rounded-md"
              >
                <span aria-hidden="true">&larr;</span> Back to home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFound;
