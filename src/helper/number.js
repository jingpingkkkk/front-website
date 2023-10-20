const shortNumber = (number, decimals = 2) => {
  const num = Number(number);
  if (Number.isNaN(num)) return number;

  const multiplier = 10 ** decimals;

  if (num >= 10000000) {
    return `${Math.round((num / 10000000) * multiplier) / multiplier}C`;
  }
  if (num >= 100000) {
    return `${Math.round((num / 100000) * multiplier) / multiplier}L`;
  }
  if (num >= 1000) {
    return `${Math.round((num / 1000) * multiplier) / multiplier}K`;
  }
  return num;
};

const roundNumber = (number, decimals = 2) => {
  const num = Number(number);
  if (Number.isNaN(num)) return number;

  const multiplier = 10 ** decimals;

  return Math.round(num * multiplier) / multiplier;
};

export { roundNumber, shortNumber };
