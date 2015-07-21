
import Profile from 'es6!./Profile';
import Block3D from 'es6!../block/Block3D';
import ObjectDistributionProfile from 'es6!./ObjectDistributionProfile';

export default class WorldProfile extends Profile {
  
  constructor(api) {
    super(api,api.registry.seed,api.registry.config);
  }

  renderObjectProfiles() {
    if (this._objectProfiles) {
      return this._objectProfiles;
    }
    var profiles = {};
    var configs = this._api.getWorldConfig(this._config.profiles);
    for(var id in configs) {
      profiles[id] = new ObjectDistributionProfile(
        this._api,
        this._seed + '.profiles.' + id,
        configs[id]
      );
    }
    this._objectProfiles = profiles;
    return profiles;
  }

  renderBlock(x, y, z, detail) {
    var block = new Block3D(x,y,z);
    var profile = this.renderObjectProfiles().universe;
    if (profile) {
      block.objects.root = profile.render(
        block.x-.5,
        block.y-.5,
        block.z-.5,
        1,
        1,
        1,
        0,
        0,
        0,
        1
      );
    }
    return block;
  }

}
