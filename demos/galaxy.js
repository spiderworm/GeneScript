
import Demo from 'es6!../demos/Demo';
import Noise from 'es6!../lib/Noise';
import ThrottledQueue from 'es6!../src/util/ThrottledQueue';
import GeneScript from 'es6!../src/GeneScript';
import ThreeViewFactory from 'es6!../src/view/three/ThreeViewFactory';

export default class GalaxyDemo extends Demo {

  constructor() {

    var canvas = document.querySelector('canvas');

    var generator = new GeneScript({

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

        sun: function(rand) {
          //console.info(rand('color'));
          return {
            shape: "Sphere",
            color: (256 * 256 * Math.floor(106 * rand('red') + 150)) +
                   (256 * Math.floor(106 * rand('green') + 150)) +
                   Math.floor(106 * rand('blue') + 150),
            size: 1e10 + (5e10 * rand('size'))
          };
        },

        planet: function() {
          return {
            color: 0xff9999,
            size: 4e6,
            shape: "Sphere",
            range: 1
          };
        }

      }
    });

    var traveller = generator.createTraveller(1);
    var geneView = ThreeViewFactory.create(THREE, traveller, 1);
    //geneView.enableBlockWireframes();
    super(canvas, geneView);
  }

}

window.demo = new GalaxyDemo();
window.scene = window.demo._scene;
