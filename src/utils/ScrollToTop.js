import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation(); //  useLocation() returns an object with various properties related to the current location. One of properties is pathname, which is a string representing the current URL path. For example, if the URL is https://example.com/admin/settings, the pathname would be /admin/settings.

  console.log('pathname', pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // scroll-to-top behavior is triggered whenever the pathname changes. This ensures that, if the user has scrolled down the page, the scroll position is reset to the top when the user navigates to a new page.

  return null;
}

export default ScrollToTop;
