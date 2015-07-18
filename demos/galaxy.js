
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

        universe: {
          shape: "Sphere",
          color: 0xffffff,
          size: .01,
          range: 5,
          distribution: "stars",
          objects: function() {
            return {
              planets: {
                scale: .1,
                color: 0xff9999,
                size: .01,
                shape: "Sphere",
                range: 1,
                x: .01,
                y: 0,
                z: 0
              }
            };
          }
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
