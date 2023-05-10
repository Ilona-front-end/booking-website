export const deleteData = async (url, id, token) => {
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
      throw new Error('Failed to delete data from the API');
    }
  } catch (error) {
    console.error('Error message here: ', error);
    throw error;
  }
};
