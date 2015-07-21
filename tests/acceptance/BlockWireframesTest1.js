
import Test from 'es6!../Test';
import GeneScript from 'es6!../../src/GeneScript';
import ThreeViewFactory from 'es6!../../src/view/three/ThreeViewFactory';

export default class BlockWireframesTest1 extends Test {

  constructor() {
    var canvas = document.querySelector('canvas');

    var generator = new GeneScript({});
    var world = generator.createWorld();
    var traveller = world.createTraveller(0);
    var geneView = ThreeViewFactory.create(THREE, traveller, 3);
    geneView.enableBlockWireframes();
    super(canvas, geneView);
  }

  run() {
    describe('block generation', function() {
      it('should display wireframes around the generated blocks', function() {
        console.warn(
          'please move the camera around the view and verify the ' +
          'block wireframes are appearing around the camera correctly'
        );
      });
    });
    super.run();
  }

}

var test = new BlockWireframesTest1();
test.run();

