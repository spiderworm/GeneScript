
import Profile from 'es6!./Profile';
import Distribution from 'es6!../solver/Distribution';
import SingleObject3DSolver from 'es6!../solver/SingleObject3DSolver';
import SimplexCubeMeshSolver from 'es6!../solver/SimplexCubeMeshSolver';

export default class DistributionProfile extends Profile {

  constructor(api, seed, config, positionProfile) {
    config = config || {};
    super(api, seed, config);
    this._positionProfile = positionProfile;
  }

  render() {
    var config = this._api.getDistributionConfig(this._config);
    var solver;
    if (config.type) {
      switch(config.type) {
        case "SimplexCubeMeshSolver":
          solver = new SimplexCubeMeshSolver(this._seed, config);
        break;
      }
    }
    if (!solver) {
      var position = this._positionProfile.render();
      solver = new SingleObject3DSolver(position.x,position.y,position.z,1);
    }
    var distribution = new Distribution(solver);
    return distribution;
  }

}
