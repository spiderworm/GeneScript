
import Demo from 'es6!../demos/Demo';
import GeneScript from 'es6!../src/GeneScript';
import ThreeViewFactory from 'es6!../src/view/three/ThreeViewFactory';
import planetConfig from 'es6!../configs/davidsPlanetConfig';

export default class PlanetDemo extends Demo {

  constructor() {

    var canvas = document.querySelector('canvas');

    var generator = new GeneScript({
      seed: 'david'
    });
    generator.addConfig(planetConfig);
    var world = generator.createWorld();
    var traveller = world.createTraveller(0);
    var geneView = ThreeViewFactory.create(THREE, traveller, 1);
    geneView.showBlock(
      planetConfig.profiles.planet.x,
      planetConfig.profiles.planet.y,
      planetConfig.profiles.planet.z
    );
    this.pinCameraTarget(
      this._camera,
      planetConfig.profiles.planet.x,
      planetConfig.profiles.planet.y,
      planetConfig.profiles.planet.z
    );
    super(canvas, geneView);
  }

}

window.demo = new PlanetDemo();
window.scene = window.demo._scene;
