
import Test from 'es6!../../tests/Test';
import ThrottledQueue from 'es6!../../src/util/ThrottledQueue';
import GeneScript from 'es6!../../src/GeneScript';
import ThreeViewFactory from 'es6!../../src/view/three/ThreeViewFactory';

export default class SimplexCubeMeshSolverTest1 extends Test {

  constructor() {

    var testVals = {
      redSphereX: -.05,
      redSphereY: 0,
      redSphereZ: 0,
      blueSphereX: 0,
      blueSphereY: .2,
      blueSphereZ: 0
    };

    var canvas = document.querySelector('canvas');

    var generator = new GeneScript({

      seed: 'david',

      distributions: {

        stars: {
          type: "SimplexCubeMeshSolver",
          node: {
            distance: .5,
            scatter: .1
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
          size: .05,
          range: 100,
          distribution: "stars",
          scale: 1,
          objects: {
            redSphere: {
              scale: .1,
              color: 0xff9999,
              size: .1,
              shape: "Sphere",
              range: 100,
              x: testVals.redSphereX,
              y: testVals.redSphereY,
              z: testVals.redSphereZ,
              objects: {
                blueSphere: {
                  scale: 1,
                  color: 0x9999ff,
                  size: .1,
                  shape: "Sphere",
                  range: 2,
                  x: testVals.blueSphereX,
                  y: testVals.blueSphereY,
                  z: testVals.blueSphereZ
                }
              }
            }
          }
        }

      }
    });

    var traveller = generator.createTraveller(1);
    var geneView = ThreeViewFactory.create(THREE, traveller, .5);
    geneView.enableBlockWireframes();
    super(canvas, geneView, testVals);

    this._blocks = [];

    traveller.onBlockInRange(function(block3D) {
      this._blocks.push(block3D);
    }.bind(this));

    setTimeout(this.run.bind(this), 100);
  }

  run() {

    var test = this;
    var testVals = this.testVals;
    var error = .0000001;

    describe('simplex cube mesh solver', function() {
      it('should generate objects in the current block', function(done) {

        test._blocks.forEach(function(block3D) {
          block3D.objects.root.forEach(function(star) {
            expect(star.x >= block3D.x-.5).to.be.ok();
            expect(star.x <= block3D.x+.5).to.be.ok();
            expect(star.y >= block3D.y-.5).to.be.ok();
            expect(star.y <= block3D.y+.5).to.be.ok();
            expect(star.z >= block3D.z-.5).to.be.ok();
            expect(star.z <= block3D.z+.5).to.be.ok();
          
            star.objects.redSphere.forEach(function(redSphere) {
              expect(redSphere.x).to.be.within(
                star.x + testVals.redSphereX - error,
                star.x + testVals.redSphereX + error
              );
              expect(redSphere.y).to.be.within(
                star.y + testVals.redSphereY - error,
                star.y + testVals.redSphereY + error
              );
              expect(redSphere.z).to.be.within(
                star.z + testVals.redSphereZ - error,
                star.z + testVals.redSphereZ + error
              );
            });

          });
        });

        console.warn('please ensure that the generated white spheres are within the blocks');
        console.warn('please also ensure that each white sphere has a smaller red sphere in close orbit');

        done();

      });
    });

    super.run();
    super.done();
  }

}

window.test = new SimplexCubeMeshSolverTest1();
