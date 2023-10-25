const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.data = function (sex) {
  const number = sex ? getRandomInt(11, 17) : getRandomInt(11, 24)
  return `/uploads/normal-avatars/sex-${ sex }${ number }.png`
}
