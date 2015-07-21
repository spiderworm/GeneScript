
import Profile from 'es6!./Profile';
import Distribution from 'es6!../solver/Distribution';
import SolverProfile from 'es6!./SolverProfile';

export default class DistributionProfile extends Profile {

  constructor(api, seed, config, positionProfile) {
    config = config || {};
    super(api, seed, config);
    this._positionProfile = positionProfile;
  }

  render() {
    var config = this._api.getDistributionConfig(this._config);
    var solverProfile = new SolverProfile(this._api, this._seed, config.solver, this._positionProfile);
    var solver = solverProfile.render();
    var distribution = new Distribution(solver);
    return distribution;
  }

}
