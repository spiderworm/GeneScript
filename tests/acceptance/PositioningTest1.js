
import Test from 'es6!../Test';
import GeneScript from 'es6!../../src/GeneScript';
import ThreeViewFactory from 'es6!../../src/view/three/ThreeViewFactory';

export default class PositioningTest1 extends Test {

  constructor() {

    var canvas = document.querySelector('canvas');

    var generator = new GeneScript({

      seed: 'david',

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
          scale: 1,
          range: 1000,
          objects: {
            green_sphere: {
              shape: "Sphere",
              color: 0x00ff00,
              size: 1,
              scale: .1,
              x: 0,
              y: .5,
              z: 0,
              range: 1000,
              objects: {
                red_sphere: {
                  shape: "Sphere",
                  color: 0xff0000,
                  size: 20,
                  scale: .1,
                  x: 10,
                  y: 0,
                  z: 10
                }
              }
            }
          }
        }

      }
    });

    var world = generator.createWorld();
    var traveller = world.createTraveller(0);
    //console.info(world.getBlockAt(0,0,0));
    var geneView = ThreeViewFactory.create(THREE, traveller, 1);
    super(canvas, geneView);

    //blue box
    this.blueBox = geneView.drawWireframe(0,0,0,1,1,1,0x000099);
    //green box
    this.greenBox = geneView.drawWireframe(0,.5,0,.1,.1,.1,0x009900);
    //red box
    this.redBox = geneView.drawWireframe(1,.5,1,.2,.2,.2,0x990000);

    this.testBlock = null;

    traveller.onBlockInRange(function(block) {
      if (block.id === "0,0,0") {
        this.testBlock = block;
        this._camera.position.set(-2.2,0,0);
        this.run();
      }
    }.bind(this));

    this.pinCameraTarget(0,0,0);
  }

  run() {

    var block,
        blueSphere,
        redSphere,
        greenSphere,
        blueBox = this.blueBox,
        redBox = this.redBox,
        greenBox = this.greenBox,
        test = this;

    describe('the test block',function() {

      it('should exist', function() {
        block = test.testBlock;
        expect(block).to.be.ok();
      });

      it('should have the correct stuff in it',function() {
        blueSphere = block.objects.root[0];
        expect(blueSphere).to.be.ok();
        greenSphere = blueSphere.objects.green_sphere[0];
        expect(greenSphere).to.be.ok();
        redSphere = greenSphere.objects.red_sphere[0];
        expect(redSphere).to.be.ok();
      });

    });

    function expectFit(color, sphere, box) {

      console.warn(
        'please visually verify that the ' + color + 
        ' sphere is fitting exactly within the ' + color + ' box'
      );

      expect(
        [sphere.x, sphere.y, sphere.z]
      ).to.eql(
        [box.position.x, box.position.y, box.position.z]
      );

      expect(
        sphere.size
      ).to.eql(
        test._getGeometrySize(box.geometry)
      );

    }

    describe('the blue sphere',function() {
      it('should fit neatly within the blue box',function() {
        expectFit('blue', blueSphere, blueBox);
      });
    });

    describe('the green sphere',function() {
      it('should fit neatly within the green box',function() {
        expectFit('green', greenSphere, greenBox);
      });
    });

    describe('the red sphere',function() {
      it('should fit neatly within the red box',function() {
        expectFit('red', redSphere, redBox);
      });
    });

    super.run();

  }

  _getGeometrySize(threeGeometry) {
    var w,h,d;
    w = h = d = 0;
    threeGeometry.computeBoundingBox();
    w = threeGeometry.boundingBox.max.x - threeGeometry.boundingBox.min.x;
    h = threeGeometry.boundingBox.max.y - threeGeometry.boundingBox.min.y;
    d = threeGeometry.boundingBox.max.z - threeGeometry.boundingBox.min.z;
    return Math.max(w,h,d);
  }

}

var test = new PositioningTest1();
