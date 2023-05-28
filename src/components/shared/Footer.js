import React from 'react';

const navigationHeaderLinks = {
  solutions: [
    { name: 'Marketing', to: '/' },
    { name: 'Analytics', to: '/' },
    { name: 'Commerce', to: '/' },
    { name: 'Insights', to: '/' },
  ],
  support: [
    { name: 'Pricing', to: '/' },
    { name: 'Documentation', to: '/' },
    { name: 'Guides', to: '/' },
    { name: 'API Status', to: '/' },
  ],
  company: [
    { name: 'About', to: '/' },
    { name: 'Blog', to: '/' },
    { name: 'Jobs', to: '/' },
    { name: 'Press', to: '/' },
    { name: 'Partners', to: '/' },
  ],
  legal: [
    { name: 'Claim', to: '/' },
    { name: 'Privacy', to: '/' },
    { name: 'Terms', to: '/' },
  ],
};

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="bg-gray-900 wrapper-max-width py-16 wrapper-padding-x">
        <div className="grid grid-cols-2 gap-8">
          <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">
                Solutions
              </h3>
              <div className="mt-6 space-y-4">
                {navigationHeaderLinks.solutions.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 md:mt-0 lg:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-white">
                Support
              </h3>
              <div className="mt-6 space-y-4">
                {navigationHeaderLinks.support.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">
                Company
              </h3>
              <div className="mt-6 space-y-4">
                {navigationHeaderLinks.company.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 md:mt-0 lg:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-white">
                Legal
              </h3>
              <div className="mt-6 space-y-4">
                {navigationHeaderLinks.legal.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
