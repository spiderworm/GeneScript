
import Profile from 'es6!./Profile';
import PositionProfile from 'es6!./PositionProfile';
import DistributionProfile from 'es6!./DistributionProfile';
import extend from 'es6!../util/extend';
import WorldObject3D from 'es6!../objects/WorldObject3D';
import primitiveUtil from 'es6!../util/primitiveUtil';
import Rand from 'es6!../util/Rand';

export default class ObjectDistributionProfile extends Profile {

  render(x,y,z,w,h,d,xOffset,yOffset,zOffset,scaleOffset) {
    var results = [];
    var config = this._api.getObjectProfileConfig(this._config, [this._rand]);

    var positionProfile = new PositionProfile(config.position);
    var distributionProfile = new DistributionProfile(
      this._api,
      this._seed + ".distributed",
      config.distribution, 
      positionProfile
    );
    var distribution = distributionProfile.render();
    var nodes = distribution(x,y,z,w,h,d);
    if (nodes.length) {

      var objectProfile = new ObjectProfile(
        this._api,
        this._seed + '.objects',
        this._config
      );

      nodes.forEach(function(node) {
        var obj = objectProfile.render(
          node,
          xOffset,yOffset,zOffset,
          scaleOffset
        );
        results.push(obj);
      }.bind(this));

    }
    return results;
  }

}

class ObjectProfile extends Profile {

  render(node, xOffset, yOffset, zOffset, scaleOffset) {
    var rand = new Rand(this._seed + ',' + node.id + ',' + [xOffset,yOffset,zOffset].join(','));
    var vals = this._api.getObjectProfileConfig(this._config, [rand]);
    var scale = scaleOffset;
    vals.x = (node.x * scale) + xOffset;
    vals.y = (node.y * scale) + yOffset;
    vals.z = (node.z * scale) + zOffset;
    vals.scale = primitiveUtil.getNumber(vals.scale,1) * scaleOffset;
    vals.size = primitiveUtil.getNumber(vals.size,1) * vals.scale;
    vals.range = primitiveUtil.getNumber(vals.range,1);
    var obj = new WorldObject3D(this,node,vals);
    if(vals.objects) {
      var profilesProfile = new ObjectDistributionProfilesProfile(
        this._api,
        this._seed + '.objects',
        vals.objects
      );
      var profiles = profilesProfile.render();
      for(var id in profiles) {
        var subObjects = profiles[id].render(
          -vals.range,
          -vals.range,
          -vals.range,
          vals.range*2,
          vals.range*2,
          vals.range*2,
          vals.x,
          vals.y,
          vals.z,
          vals.scale
        );
        obj.objects[id] = subObjects;
      }
    }
    return obj;
  }

}

class ObjectDistributionProfilesProfile extends Profile {

  render() {
    var config = this._api.getProfilesCollectionConfig(this._config);
    var profiles = {};
    for(var id in config) {
      profiles[id] = new ObjectDistributionProfile(
        this._api,
        this._seed + '.' + id,
        config[id]
      );
    }
    return profiles;
  }
}

