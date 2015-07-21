
import GeneScriptApiFactory from 'es6!./api/GeneScriptApiFactory';
import WorldFactory from 'es6!./objects/WorldFactory';
import WorldProfile from 'es6!./profile/WorldProfile';
import ObjectDistributionProfile from 'es6!./profile/ObjectDistributionProfile';
import Traveller3D from 'es6!./traveller/Traveller3D';

export default class GeneScript {

  constructor(rawConfig) {
    this._api = GeneScriptApiFactory.getApi(rawConfig);
    this._api.decorate(this);
    this.addConfig(rawConfig);
  }

  createTraveller(range) {
    var worldProfile = new WorldProfile(this._api);
    var world = WorldFactory.getWorld(worldProfile);
    return new Traveller3D(world,range);
  }

}
