
import Profile from 'es6!./Profile';
import primitiveUtil from 'es6!../util/primitiveUtil';

export default class PositionProfile extends Profile {

  constructor(config) {
    super(null,null,config);
  }

  render() {
    var result = this._config();
    return {
      x: primitiveUtil.getNumber(result.x,0),
      y: primitiveUtil.getNumber(result.y,0),
      z: primitiveUtil.getNumber(result.z,0)
    };
  }

  _getConfigObject() {
    return this._config;
  }

}
