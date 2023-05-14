export function countCharacters(text, maxLength) {
  const showRemainingCharacters = maxLength - text.length;
  return showRemainingCharacters >= 0 ? showRemainingCharacters : 0;
}
