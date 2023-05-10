import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogin } from 'react-icons/ai';
import { FaUser, FaRegPaperPlane } from 'react-icons/fa';
import handleLogOut from '../../utils/handleLogOut';

const navigationHeaderLinks = [
  { name: 'All Venues', href: '/venues' },
  { name: 'My Activity', href: '/user-venues' },
  { name: 'Create Venue', href: '/' },
  { name: '??', href: '/' },
];

export default function Header() {
  let isLoggedIn;

  // get from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      {/* Header */}
      <nav className="font-serif flex flex-row xs:flex-col items-center justify-between bg-gray-800 py-4 wrapper-max-width wrapper-padding-x">
        {/* Holidaze logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="text-white text-xl font-bold ">
            Holidaze
          </Link>
        </div>
        {/* Burger menu - Side menu is closed */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            {/* Open header menu  - close icon */}
            <span className="sr-only">Open header menu</span>
            <AiOutlineMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {isLoggedIn ? (
            navigationHeaderLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="hover:bg-gray-700 text-white font-semibold text-sm py-2 px-4 rounded"
              >
                {item.name}
              </Link>
            ))
          ) : (
            <Link
              key="venues"
              to="/venues"
              className="text-sm font-semibold hover:bg-gray-700 py-2 px-4 rounded text-white"
            >
              Venues
            </Link>
          )}
        </div>
        {/* Desktop navigation - last link */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex flex-center">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="hover:bg-gray-700 text-white font-semibold text-sm py-2 px-4 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser size={18} />
                </Link>
                <button
                  onClick={handleLogOut}
                  className="hover:bg-gray-700 text-white font-semibold text-sm py-2 px-4 rounded"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-white hover:bg-gray-700 py-2 px-4 rounded"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-white hover:bg-gray-700 py-2 px-4 rounded"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile navigation - burger menu has been clicked */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 md:max-w-sm md:ring-1 md:ring-gray-900/10">
          {/* Side menu */}
          <div className="flex items-center justify-between">
            <Link to="/" className="text-black text-xl font-bold">
              Holidaze
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {/* Close header menu */}
              <span className="sr-only">Close menu</span>
              <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="font-serif -my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigationHeaderLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {isLoggedIn ? (
                <div className="py-6 flex flex-col">
                  <Link
                    to="/profile"
                    className="flex items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUser className="mr-3 h-5 w-5" aria-hidden="true" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-red-300"
                  >
                    <FaRegPaperPlane
                      className="mr-3 h-5 w-5"
                      aria-hidden="true"
                    />
                    Log out
                  </button>
                </div>
              ) : (
                <div className="py-6 flex flex-col">
                  <Link
                    to="/login"
                    className="flex items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
                  >
                    <AiOutlineLogin
                      className="mr-3 h-6 w-6"
                      aria-hidden="true"
                    />
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
                  >
                    <AiOutlineLogin
                      className="mr-3 h-6 w-6"
                      aria-hidden="true"
                    />
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
