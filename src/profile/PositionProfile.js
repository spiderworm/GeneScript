
import Profile from 'es6!./Profile';

export default class PositionProfile extends Profile {

  constructor(config) {
    var vals = {};
    if (config.position) {
      if (typeof config.position !== "function") {
        var position = config.position;
        config = function() {
          return {
            x: position.x || 0,
            y: position.y || 0,
            z: position.z || 0
          };
        }
      }
    } else {
      var position = config;
      config = function() {
        return {
          x: position.x || 0,
          y: position.y || 0,
          z: position.z || 0
        };
      };
    }
    super(null,null,config);
  }

  render() {
    return this._config();
  }

  _getConfigObject() {
    return this._config;
  }

}
