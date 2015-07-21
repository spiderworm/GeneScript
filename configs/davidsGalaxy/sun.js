
function starColor(rand) {
  return (256 * 256 * Math.floor(106 * rand('red') + 150)) +
         (256 * Math.floor(106 * rand('green') + 150)) +
         Math.floor(106 * rand('blue') + 150);
}

var config = function(rand) {
  return {
    shape: "Sphere",
    color: starColor(rand),
    size: 1e10 + (5e10 * rand('size'))
  };
}

export default config;
