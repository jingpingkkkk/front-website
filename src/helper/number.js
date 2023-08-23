const shortNumber = (number) => {
  if (number >= 1000000000) {
    return `${Math.round((number / 1000000000) * 100) / 100}B`;
  }
  if (number >= 1000000) {
    return `${Math.round((number / 1000000) * 100) / 100}M`;
  }
  if (number >= 1000) {
    return `${Math.round((number / 1000) * 100) / 100}K`;
  }
  return number;
};

export default shortNumber;
