const templatePosition = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};

const OFFERS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const randomBoolean = () => {
  return (
    Boolean(getRandomInt(0, 1))
  );
};


export {
  templatePosition,
  render,
  getRandomInt,
  OFFERS_COUNT,
  randomBoolean
};
