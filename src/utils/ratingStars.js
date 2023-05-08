import { AiTwotoneStar } from 'react-icons/ai';

// RATING STARS FUNCTION
function getRatingStars(rating) {
  const stars = Math.round(rating);
  const starsToShow = [];

  for (let i = 0; i < stars; i++) {
    starsToShow.push(<AiTwotoneStar size={20} color="orange" />);
  }
  return <span className="flex">{starsToShow}</span>;
}

export default getRatingStars;
