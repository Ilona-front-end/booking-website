import React, { useEffect, useState } from 'react';

const VENUES_URL = 'https://api.noroff.dev/api/v1/holidaze/venues';

function Venues() {
  const [venues, setVenues] = useState([]);

  // The useEffect will run once when the component first mounts
  useEffect(() => {
    async function fetchVenues() {
      // Function that gets our posts from the API
      const response = await fetch(VENUES_URL);
      const json = await response.json();

      // PI data we received, setting our venues state
      setVenues(json);
    }
    fetchVenues();
  }
  , []);

  return (
    <div>
      {venues.map((venue) => (
        <div key={venue.id}>
          <h2>{venue.name}</h2>
          <img src={venue.media[0]} alt={venue.name} />
          <p>{venue.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Venues;
