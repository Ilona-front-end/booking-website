export const deleteData = async (url, id, token, setUserProfileVenues) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('response1', response);

    if (!response.ok) {
      console.log('if !response', response);
      throw new Error('Failed to delete data from the API'); // throw new Error() will trigger the catch block and handle the error
    }

    // After deleting venue from API, update the state by removing the deleted item
    // filter method excludes item with the provided id from the previous state
    if (setUserProfileVenues) {
      // check if parameter is not null, undefined, or false
      setUserProfileVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== id)
      ); // prevVenues is an array, which represents the previous state of the venues; if venue.id !== id evaluates to true, it indicates that the venue should be kept in the filtered array; if the expression venue.id !== id evaluates to false, it indicates that the venue should be removed from the filtered array; filter method returns a new array that contains only the venues for which the callback function returned true;
    }
  } catch (error) {
    console.error('Error message here: ', error);
    throw error; // rethrowing the error so that the component can handle it
  }
};
