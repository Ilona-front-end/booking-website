// TIME MAPPER
export const mapTime = (isoDate) => {
  const timestamp = new Date(isoDate).getTime() / 1000; //Convert ISO date to Unix timestamp (seconds)
  const seconds = Math.floor((new Date() - timestamp * 1000) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);

  if (interval > 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);

  if (interval > 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);

  if (interval > 1) {
    return `${interval} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
};
