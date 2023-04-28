import React from 'react';

const navigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="bg-gray-900 wrapper px-8 py-16">
        <div className="grid grid-cols-2 gap-8">
          <div className="md:grid md:grid-cols-2 md:gap-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">
                Solutions
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.solutions.map((item) => (
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
                {navigation.support.map((item) => (
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
                {navigation.company.map((item) => (
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
                {navigation.legal.map((item) => (
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
