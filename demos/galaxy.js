
import Demo from 'es6!../demos/Demo';
import Noise from 'es6!../lib/Noise';
import ThrottledQueue from 'es6!../src/util/ThrottledQueue';
import GeneScript from 'es6!../src/GeneScript';
import ThreeViewFactory from 'es6!../src/view/three/ThreeViewFactory';
import galaxyConfig from 'es6!../configs/davidsGalaxy';

export default class GalaxyDemo extends Demo {

  constructor() {

    var canvas = document.querySelector('canvas');

    var generator = new GeneScript(galaxyConfig);
    var world = generator.createWorld();
    var traveller = world.createTraveller(1);
    var geneView = ThreeViewFactory.create(THREE, traveller, 1);
    //geneView.enableBlockWireframes();
    super(canvas, geneView);
  }

}

window.demo = new GalaxyDemo();
window.scene = window.demo._scene;
