
import GeneScriptApiFactory from 'es6!./api/GeneScriptApiFactory';
import WorldFactory from 'es6!./objects/WorldFactory';
import Profile from 'es6!./profile/Profile';
import Traveller3D from 'es6!./traveller/Traveller3D';

export default class GeneScript {

  constructor(rawConfig) {
    this._api = GeneScriptApiFactory.getApi(rawConfig);
    this._api.decorate(this);
    this.addConfig(rawConfig);
  }

  createTraveller(range) {
    var profileConfig = this._api.registry.getProfileConfig('universe');
    var profile = new Profile(
      this._api.registry,
      this._api.registry.seed,
      profileConfig
    );
    var world = WorldFactory.getWorld(profile);
    return new Traveller3D(world,range);
  }

}
