
import Profile from 'es6!./Profile';
import SquareMeshSolver3D from 'es6!../solver/SquareMeshSolver3D';
import SimplexSolver3D from 'es6!../solver/SimplexSolver3D';
import SingleObjectSolver3D from 'es6!../solver/SingleObjectSolver3D';
import SolverMask from 'es6!../solver/Mask';
import primitiveUtil from 'es6!../util/primitiveUtil';

export default class SolverProfile extends Profile {

  constructor(api, seed, config, positionProfile) {
    super(api, seed, config);
    this._positionProfile = positionProfile;
  }

  render() {
    var config = this._api.getSolverProfileConfig(this._config);
    if (config.mask) {
      var maskProfile = new SolverMaskProfile(this._api, this._seed, config.mask);
      var mask = maskProfile.render();
    }
    var solver;
    if (config.algorithm) {
      switch(config.algorithm) {
        case "SquareMesh3D":
          solver = new SquareMeshSolver3D(this._seed, mask, config);
        break;
        case "Simplex3D":
          solver = new SimplexSolver3D(this._seed, mask, config);
        break;
      }
    }
    if (!solver && this._positionProfile) {
      var position = this._positionProfile.render();
      solver = new SingleObjectSolver3D(
        mask,
        {x:position.x, y:position.y, z:position.z}
      );
    }
    return solver;
  }
}

class SolverMaskProfile extends SolverProfile {
  render() {
    var solver = super.render();
    var mask = new SolverMask(solver, primitiveUtil.getNumber(this._config.strength,.5));
    return mask;
  }
}
