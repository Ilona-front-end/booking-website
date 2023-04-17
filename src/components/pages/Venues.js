import React, { useEffect, useState } from 'react';

const VENUES_URL = 'https://api.noroff.dev/api/v1/holidaze/venues';

function Venues() {
  const [venues, setVenues] = useState([]);

  // The useEffect will run once when the component first mounts
  useEffect(() => {
    async function fetchVenues() {
      // Display to user that we are loading data, but can not show anything yet

      try {
        // Function that gets our posts from the API
        const response = await fetch(VENUES_URL);
        if(!response.ok) {
          throw new Error('Failed to get information about venues from the API');
        }
        // Wait for the response to be converted to JSON
        const json = await response.json();
        // We received API data, setting our venues state
        setVenues(json);
      } catch (err) {
        console.error(err);
      } 
    }
    fetchVenues();
  }, []);

  return (
    <div>
      {venues.map((venue) => (
        <div key={venue.id}>
          <h2>{venue.name}</h2>
          {/* {venue.media.length > 0 && <img src={venue.media[0]} alt={venue.name} />} */}
          {/* <img src={venue.media[0]} alt={venue.name} /> */}
          <img src={venue.media[0]} alt={venue.title} onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1634655377962-e6e7b446e7e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80' }} />
          {/* <img src={venue.media[0]} alt={venue.title} onError={(e) => { console.log(`Error loading image: ${venue.media}`, e); }} /> */}
          <p>{venue.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Venues;
