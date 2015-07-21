
var davidsPlanetConfig = {

  shapes: {
    planet: {
      base: "Sphere"
    }
  },

  profiles: {
    universe: "planet",

    planet: {
      shape: "planet",
      color: 0xffffff,
      x: 0,
      y: 0,
      z: 0,
      size: 10,
      range: 5,
      objects: {
        rocks: {
          base: 'rock',
          scale: .1,
          distribution: {
            base: "SimplexMesh3D",
            solver: {
              nodeDistance: 2,
              scatter: 3
            },
            mask: {
              strength: 0,
              scale: 1
            }
          }
        }
      }
    },

    rock: {
      shape: 'Sphere',
      color: 0x333333,
      size: 1
    }
  }

};

export default davidsPlanetConfig;
