
import sunConfig from 'es6!./davidsGalaxy/sun';
import planetConfig from 'es6!./davidsGalaxy/planet';

var config = {

  seed: 'david',

  distributions: {

    stars: {
      type: "SimplexCubeMeshSolver",
      node: {
        distance: .35,
        scatter: .4
      },
      mask: {
        scale: 1,
        strength: 0
      }
    }

  },

  profiles: {

    universe: "solarSystems",

    solarSystems: {
      base: "solarSystem",
      distribution: "stars",
      scale: .1
    },

    solarSystem: {
      size: 1,
      range: 1e200,
      objects: {
        sun: {
          base: "sun",
          scale: 1e-12,
          x: 0,
          y: 0,
          z: 0
        },
        planet1: {
          base: "planet",
          scale: 1e-10,
          x: .1,
          y: 0,
          z: 0
        }
      }
    },

    sun: sunConfig,

    planet: planetConfig

  }
};

export default config;