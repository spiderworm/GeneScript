
import Demo from 'es6!../demos/Demo';
import Noise from 'es6!../lib/Noise';
import hash from 'es6!../src/util/hash';
import ThrottledQueue from 'es6!../src/util/ThrottledQueue';
import GeneScript from 'es6!../src/GeneScript';
import ThreeViewFactory from 'es6!../src/view/three/ThreeViewFactory';

export default class GalaxyDemo extends Demo {

  constructor() {

    var seed = hash('david',100);
    var canvas = document.querySelector('canvas');

    var generator = new GeneScript({

      seed: seed,

      distributions: {

        stars: {
          type: "SimplexCubeMeshSolver",
          node: {
            distance: .35,
            scatter: 0
          },
          mask: {
            scale: 1,
            strength: 0
          }
        }

      },

      profiles: {

        universe: {
          shape: "Sphere",
          color: 0x0000ff,
          size: 1,
          scale: 0,
          range: 1.000001,
          objects: {
            green_sphere: {
              shape: "Sphere",
              color: 0x00ff00,
              size: 1,
              scale: .5,
              x: 0,
              y: 0,
              z: 0,
              range: 2,
              objects: {
                white_spheres: {
                  shape: "Sphere",
                  color: 0xffffff,
                  size: 1,
                  scale: .01,
                  x: 0,
                  y: .5,
                  z: 0,
                  distribution: "stars"
                }
              }
            }
          }
        },

        universeOld: {
          objects: {
            solarSystems: {
              //base: "solarSystem",
              shape: "Sphere",
              color: 0x00ff00,
              size: 1e8,
              scale: 1e10,
              distribution: "stars"
            }
          }
        },

        solarSystem: {
          objects: {
            sun: {
              base: "sun",
              scale: 10,
            }
          }
        },

        sun: {
          shape: "Sphere",
          color: 0xffffff,
          size: 1e10
        }

      }
    });

    var traveller = generator.createTraveller(0);
    var geneView = ThreeViewFactory.create(THREE, traveller, 1);
    super(canvas, geneView);
  }

}

window.demo = new GalaxyDemo();
window.scene = window.demo._scene;
