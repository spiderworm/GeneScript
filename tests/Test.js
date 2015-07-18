
import Demo from 'es6!../demos/Demo';

export default class Test extends Demo {

  constructor(canvas, geneView, testVals) {
    super(canvas, geneView);
    this.testVals = testVals || {};
  }

  run() {
    mocha.run();
  }

  done() {
    mocha.done();
  }

}
