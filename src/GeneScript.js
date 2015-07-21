
import GeneScriptApiFactory from 'es6!./api/GeneScriptApiFactory';
import WorldFactory from 'es6!./objects/WorldFactory';
import WorldProfile from 'es6!./profile/WorldProfile';
import ObjectDistributionProfile from 'es6!./profile/ObjectDistributionProfile';

export default class GeneScript {

  constructor(rawConfig) {
    this._api = GeneScriptApiFactory.getApi(rawConfig);
    this._api.decorate(this);
    this.addConfig(rawConfig);
  }

  createWorld() {
    var interpreter = this._api.createInterpreter();
    var worldProfile = new WorldProfile(interpreter);
    var world = WorldFactory.getWorld(worldProfile);
    return world;
  }

}
