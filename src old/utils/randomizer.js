export const getRandomProperty = function (obj) {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

export const getRandomInt = (minValue, maxValue) => Math.floor(minValue + Math.random() * (maxValue - minValue + 1));

export const getRandomPositiveInt = (maxValue) => getRandomInt(0, maxValue);

export const getArrayRandomElement = (array) => array[getRandomPositiveInt(array.length - 1)];
